// =============================================================================
// Edge Function : creer-reservation-paiement
// Projet : Mini Vadrouille (projet de formation, Stripe en mode TEST uniquement)
//
// Ce que fait cette fonction, dans l'ordre :
//   1. Elle vérifie QUI appelle (la locataire connectée), grâce à sa connexion.
//   2. Elle relit le kit dans la base et RECALCULE tous les montants elle-même.
//      Ce que la page envoie (prix, total...) n'est JAMAIS utilisé.
//   3. Elle crée la réservation (statut "en_attente") dans la table reservations.
//   4. Elle demande à Stripe une page de paiement hébergée et renvoie son adresse.
//
// Secrets à créer dans Supabase (Edge Functions > Secrets) :
//   STRIPE_SECRET_KEY         = clé sk_test_...  (JAMAIS sk_live_)
//   THOMAS_STRIPE_ACCOUNT_ID  = acct_...         (compte connecté de test)
//   SITE_URL (facultatif)     = https://mini-vadrouille.lovable.app
// SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY existent déjà tout seuls.
// =============================================================================

import { createClient } from "npm:@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// RÉGLAGES (règles du PRD)
// ---------------------------------------------------------------------------
const TAUX_FRAIS_SERVICE = 10; // 10 % de la location seulement (pas de l'option)
const DELAI_MIN_AVANT_DEPART_JOURS = 3; // départ au moins 3 jours après la demande
const DELAI_REPONSE_LOUEUR_HEURES = 24; // le loueur a 24 h pour répondre
const ANNULATION_GRATUITE_HEURES = 48; // annulation sans frais jusqu'à 48 h avant

// Pages du site où Stripe renvoie la locataire. A VÉRIFIER avec les vraies
// adresses de ton site Lovable (c'est le seul endroit à ajuster).
const CHEMIN_APRES_PAIEMENT = "/demande-envoyee";
const CHEMIN_SI_ANNULATION = "/recherche";

// ---------------------------------------------------------------------------
// CALCUL DES MONTANTS (en centimes pour éviter les erreurs d'arrondi)
// ---------------------------------------------------------------------------
// --- DEBUT CALCUL ---
export function calculerMontants(
  prixJour: number,
  sereniteKit: number,
  cautionKit: number,
  nombreJours: number,
  avecSerenite: boolean,
) {
  const prixJourC = Math.round(prixJour * 100);
  const locationC = nombreJours * prixJourC;
  const fraisC = Math.round((locationC * TAUX_FRAIS_SERVICE) / 100);
  const sereniteC = avecSerenite ? Math.round(sereniteKit * 100) : 0;
  const cautionC = Math.round(cautionKit * 100);
  const totalC = locationC + fraisC + sereniteC + cautionC;
  return { prixJourC, locationC, fraisC, sereniteC, cautionC, totalC };
}

// Date du jour (AAAA-MM-JJ) à Paris, pour compter les jours calendaires.
export function jourParis(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(d);
}

// Nombre de jours de location, premier et dernier jour compris.
// Démo : du mercredi 19 au vendredi 21 mai = 3 jours.
export function compterJours(debut: Date, fin: Date): number {
  const a = Date.parse(jourParis(debut) + "T00:00:00Z");
  const b = Date.parse(jourParis(fin) + "T00:00:00Z");
  return Math.round((b - a) / 86_400_000) + 1;
}
// --- FIN CALCUL ---

// ---------------------------------------------------------------------------
// OUTILS
// ---------------------------------------------------------------------------
// Autorise le site (navigateur) à appeler cette fonction.
const ENTETES_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function repondre(corps: unknown, statut = 200): Response {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { ...ENTETES_CORS, "Content-Type": "application/json" },
  });
}

function erreur(message: string, statut = 400): Response {
  return repondre({ erreur: message }, statut);
}

// Lit un secret et donne un message clair s'il manque.
function secret(nom: string): string {
  const valeur = Deno.env.get(nom);
  if (!valeur) throw new Error(`Secret manquant dans Supabase : ${nom}`);
  return valeur;
}

const euros = (centimes: number) =>
  (centimes / 100).toFixed(2).replace(".", ",") + " €";

// ---------------------------------------------------------------------------
// FONCTION PRINCIPALE
// ---------------------------------------------------------------------------
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: ENTETES_CORS });
  if (req.method !== "POST") return erreur("Méthode non autorisée.", 405);

  try {
    const cleStripe = secret("STRIPE_SECRET_KEY");
    const compteThomas = secret("THOMAS_STRIPE_ACCOUNT_ID");
    const urlSite = (Deno.env.get("SITE_URL") ?? "https://mini-vadrouille.lovable.app")
      .replace(/\/$/, "");

    // Garde-fou : on ne travaille qu'avec une clé de TEST.
    if (!cleStripe.startsWith("sk_test_")) {
      return erreur("La clé Stripe n'est pas une clé de test (sk_test_...).", 500);
    }

    // Client "admin" : peut lire et écrire malgré les règles de sécurité (RLS).
    const admin = createClient(secret("SUPABASE_URL"), secret("SUPABASE_SERVICE_ROLE_KEY"));

    // -----------------------------------------------------------------------
    // 1. QUI APPELLE ? On identifie la personne grâce à son jeton de connexion.
    // -----------------------------------------------------------------------
    const jeton = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const { data: dataUser, error: errUser } = await admin.auth.getUser(jeton);
    if (errUser || !dataUser?.user) {
      return erreur("Connectez-vous pour réserver un kit.", 401);
    }
    const utilisateur = dataUser.user;

    // -----------------------------------------------------------------------
    // 2. CE QUE LA PAGE ENVOIE (on ne garde que des choix, jamais des prix)
    //    { kit_id, debut_le, fin_le, option_serenite, message }
    //    debut_le = créneau de remise du premier jour (date + heure, format ISO)
    //    fin_le   = date + heure de fin le dernier jour (format ISO)
    // -----------------------------------------------------------------------
    const corps = await req.json().catch(() => null);
    if (!corps) return erreur("Demande illisible.");

    const kitId = String(corps.kit_id ?? "");
    const debut = new Date(corps.debut_le);
    const fin = new Date(corps.fin_le);
    const avecSerenite = corps.option_serenite === true;
    const message = typeof corps.message === "string"
      ? corps.message.trim().slice(0, 500) || null
      : null;

    if (!kitId) return erreur("Kit manquant.");
    if (isNaN(debut.getTime()) || isNaN(fin.getTime())) {
      return erreur("Dates invalides.");
    }
    if (fin <= debut) return erreur("La date de fin doit suivre la date de début.");

    // "maintenant" est figé une fois : on s'en sert aussi pour la base,
    // afin que la règle des 3 jours soit calculée sur le même instant.
    const maintenant = new Date();
    const plusTot = new Date(
      maintenant.getTime() + DELAI_MIN_AVANT_DEPART_JOURS * 86_400_000,
    );
    if (debut < plusTot) {
      return erreur(
        `Le départ doit avoir lieu au moins ${DELAI_MIN_AVANT_DEPART_JOURS} jours après la demande.`,
      );
    }

    // -----------------------------------------------------------------------
    // 3. LE KIT : on relit le vrai prix dans la base
    // -----------------------------------------------------------------------
    const { data: kit, error: errKit } = await admin
      .from("kits")
      .select(
        "id, nom, proprietaire_id, prix_jour, option_serenite_montant, caution_montant, statut_relecture, disponibilite, duree_max_jours",
      )
      .eq("id", kitId)
      .maybeSingle();

    if (errKit) return erreur("Lecture du kit impossible.", 500);
    if (!kit) return erreur("Ce kit n'existe pas.", 404);
    // Si ces deux messages apparaissent alors que le kit est bien en ligne,
    // c'est que le mot attendu ("publie" / "disponible") est écrit autrement
    // dans ta base : le message indique la vraie valeur trouvée.
    if (kit.statut_relecture !== "publie") {
      return erreur(`Ce kit n'est pas publié (statut_relecture = "${kit.statut_relecture}").`, 404);
    }
    if (kit.disponibilite !== "disponible") {
      return erreur(`Ce kit n'est pas disponible (disponibilite = "${kit.disponibilite}").`);
    }
    if (kit.proprietaire_id === utilisateur.id) {
      return erreur("Vous ne pouvez pas louer votre propre kit.");
    }

    const nombreJours = compterJours(debut, fin);
    if (nombreJours < 1) return erreur("Durée invalide.");
    if (kit.duree_max_jours && nombreJours > kit.duree_max_jours) {
      return erreur(`Ce kit se loue ${kit.duree_max_jours} jours au maximum.`);
    }

    // -----------------------------------------------------------------------
    // 4. LES MONTANTS (calculés ici, avec les prix de la base)
    // -----------------------------------------------------------------------
    const m = calculerMontants(
      Number(kit.prix_jour),
      Number(kit.option_serenite_montant),
      Number(kit.caution_montant),
      nombreJours,
      avecSerenite,
    );

    // -----------------------------------------------------------------------
    // 5. LA RÉSERVATION : on remplit les 13 cases obligatoires + quelques autres
    //    Les montants sont enregistrés en euros ; la base vérifie elle-même
    //    que les additions tombent juste (règles CHECK).
    // -----------------------------------------------------------------------
    const reponseLimite = new Date(
      maintenant.getTime() + DELAI_REPONSE_LOUEUR_HEURES * 3_600_000,
    );
    const annulationGratuite = new Date(
      debut.getTime() - ANNULATION_GRATUITE_HEURES * 3_600_000,
    );

    const { data: resa, error: errResa } = await admin
      .from("reservations")
      .insert({
        kit_id: kit.id,
        locataire_id: utilisateur.id,
        demande_le: maintenant.toISOString(),
        reponse_limite_le: reponseLimite.toISOString(),
        debut_le: debut.toISOString(),
        fin_le: fin.toISOString(),
        creneau_remise_le: debut.toISOString(),
        annulation_gratuite_jusqu_au: annulationGratuite.toISOString(),
        nombre_jours: nombreJours,
        prix_jour_applique: m.prixJourC / 100,
        montant_location: m.locationC / 100,
        frais_service_taux: TAUX_FRAIS_SERVICE,
        frais_service_montant: m.fraisC / 100,
        option_serenite: avecSerenite,
        option_serenite_montant: m.sereniteC / 100,
        caution_montant: m.cautionC / 100,
        total_debite: m.totalC / 100,
        statut_caution: "encaissee",
        message,
      })
      .select("id")
      .single();

    if (errResa || !resa) {
      console.error("Insertion réservation :", errResa);
      // 23P01 = ces dates chevauchent déjà une réservation active sur ce kit
      if (errResa?.code === "23P01") {
        return erreur("Ces dates ne sont plus disponibles pour ce kit.", 409);
      }
      return erreur(
        `La réservation n'a pas pu être créée (${errResa?.message ?? "erreur inconnue"}).`,
        400,
      );
    }

    // -----------------------------------------------------------------------
    // 6. STRIPE : page de paiement hébergée, "paiement indirect" (destination charge)
    //    La locataire paie la plateforme. Stripe garde "application_fee_amount"
    //    pour la plateforme (frais de service + caution) et transfère le reste
    //    au loueur (location + option sérénité). La caution est rendue à la main.
    //    On appelle l'API Stripe directement : pas de bibliothèque à installer.
    // -----------------------------------------------------------------------
    const partPlateformeC = m.fraisC + m.cautionC;

    const p = new URLSearchParams();
    p.set("mode", "payment");
    p.set("client_reference_id", resa.id);
    if (utilisateur.email) p.set("customer_email", utilisateur.email);
    p.set("success_url", `${urlSite}${CHEMIN_APRES_PAIEMENT}?paiement=ok&reservation=${resa.id}`);
    p.set("cancel_url", `${urlSite}${CHEMIN_SI_ANNULATION}?paiement=annule`);
    p.set("metadata[reservation_id]", resa.id);
    p.set("payment_intent_data[application_fee_amount]", String(partPlateformeC));
    p.set("payment_intent_data[transfer_data][destination]", compteThomas);
    p.set("payment_intent_data[metadata][reservation_id]", resa.id);

    // Une ligne par poste, pour que la page Stripe soit lisible.
    const lignes: Array<[string, number]> = [
      [`Location « ${kit.nom} » : ${nombreJours} jour(s) × ${euros(m.prixJourC)}`, m.locationC],
      ["Frais de service (10 %)", m.fraisC],
    ];
    if (avecSerenite) lignes.push(["Option sérénité (nettoyage du kit)", m.sereniteC]);
    lignes.push(["Caution (remboursée après l'état des lieux de retour)", m.cautionC]);

    lignes.forEach(([nom, montantC], i) => {
      p.set(`line_items[${i}][quantity]`, "1");
      p.set(`line_items[${i}][price_data][currency]`, "eur");
      p.set(`line_items[${i}][price_data][unit_amount]`, String(montantC));
      p.set(`line_items[${i}][price_data][product_data][name]`, nom);
    });

    const repStripe = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cleStripe}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: p,
    });
    const session = await repStripe.json();

    if (!repStripe.ok || !session.url) {
      console.error("Erreur Stripe :", JSON.stringify(session));
      // On supprime la réservation qu'on vient de créer pour ne pas laisser
      // de fiche orpheline (uniquement celle-ci, repérée par son id).
      await admin.from("reservations").delete().eq("id", resa.id);
      return erreur(
        `Stripe a refusé la création du paiement : ${session?.error?.message ?? "erreur inconnue"}`,
        502,
      );
    }

    // -----------------------------------------------------------------------
    // 7. C'est bon : on renvoie l'adresse de la page de paiement Stripe
    // -----------------------------------------------------------------------
    return repondre({
      url: session.url,
      reservation_id: resa.id,
      total: m.totalC / 100,
    });
  } catch (e) {
    console.error("Erreur inattendue :", e);
    return erreur(e instanceof Error ? e.message : "Erreur inattendue.", 500);
  }
});