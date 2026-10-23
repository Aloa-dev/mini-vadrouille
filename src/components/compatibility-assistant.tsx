import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FunctionsHttpError } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const MAX_CARACTERES = 500;
const MESSAGE_PAR_DEFAUT = "L'aide n'a pas pu répondre. Vérifiez votre connexion puis réessayez.";

// Lit le message d'erreur renvoyé par la fonction (champ « erreur »), sinon message générique.
async function messageErreur(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    try {
      const corps = (await (error.context as Response).json()) as { erreur?: unknown };
      if (typeof corps.erreur === "string" && corps.erreur) return corps.erreur;
    } catch {
      /* corps illisible */
    }
  }
  return MESSAGE_PAR_DEFAUT;
}

export function CompatibilityAssistant({
  kitId,
  user,
  returnTo,
}: {
  kitId: string;
  user: User | null;
  returnTo: string;
}) {
  const [velo, setVelo] = useState("");
  const [chargement, setChargement] = useState(false);
  const [reponse, setReponse] = useState("");
  const [erreur, setErreur] = useState("");

  const verifier = async () => {
    const texte = velo.trim();
    if (texte.length < 3) {
      setErreur("Décrivez votre vélo en quelques mots (modèle, type d'axe...).");
      setReponse("");
      return;
    }
    setChargement(true);
    setErreur("");
    setReponse("");
    try {
      const { data, error } = await supabase.functions.invoke("compatibilite-velo", {
        body: { kit_id: kitId, velo: texte },
      });
      if (error) throw error;
      const resultat = data as { reponse?: unknown; erreur?: unknown } | null;
      if (resultat && typeof resultat.reponse === "string" && resultat.reponse) {
        setReponse(resultat.reponse);
      } else {
        setErreur(
          resultat && typeof resultat.erreur === "string" && resultat.erreur
            ? resultat.erreur
            : MESSAGE_PAR_DEFAUT,
        );
      }
    } catch (e) {
      setErreur(await messageErreur(e));
    }
    setChargement(false);
  };

  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-5">
      <h3 className="flex items-center gap-2 text-base font-bold">
        <Sparkles aria-hidden="true" className="size-5" />
        Vérifiez avec votre vélo
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Décrivez votre vélo : une aide automatique compare avec la fiche de ce kit. Sa réponse est
        informative et reste à confirmer avec le loueur lors de la remise.
      </p>

      <div className="mt-4">
        <Label htmlFor="velo-compatibilite" className="text-sm font-medium">
          Votre vélo
        </Label>
        <Textarea
          id="velo-compatibilite"
          value={velo}
          onChange={(e) => setVelo(e.target.value.slice(0, MAX_CARACTERES))}
          placeholder="Ex. : VTC 2021, axe arrière à blocage rapide, porte-bagages monté"
          rows={3}
          disabled={!user || chargement}
          aria-describedby="velo-compatibilite-aide"
          className="mt-2"
        />
        <p id="velo-compatibilite-aide" className="mt-2 text-xs text-muted-foreground">
          Ne saisissez ni nom ni coordonnées. Votre texte est envoyé à un service d'intelligence
          artificielle (Groq) uniquement pour répondre à cette question. {velo.length}/
          {MAX_CARACTERES}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {user ? (
          <Button type="button" onClick={() => void verifier()} disabled={chargement}>
            {chargement ? "Vérification en cours…" : "Vérifier la compatibilité"}
          </Button>
        ) : (
          <>
            <Button asChild>
              <Link to="/connexion" search={{ redirect: returnTo }}>
                Se connecter pour vérifier
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Si la compatibilité est confirmée, vous pourrez réserver dans la foulée.
            </p>
          </>
        )}
      </div>

      {erreur && (
        <p role="alert" className="mt-4 rounded-xl border border-destructive/40 p-4 text-sm">
          {erreur}
        </p>
      )}
      {reponse && (
        <div role="status" aria-live="polite" className="mt-4 rounded-xl border border-border p-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">{reponse}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Réponse générée automatiquement à partir de la fiche du kit : elle peut se tromper.
            Confirmez avec le loueur.
          </p>
        </div>
      )}
    </div>
  );
}
