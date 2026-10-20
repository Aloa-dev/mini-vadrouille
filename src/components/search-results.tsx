import { Link, useNavigate } from "@tanstack/react-router";
import { DEFAULT_STAY } from "@/lib/stay";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { KitSearch } from "@/components/kit-search";
import { demoBooking, euros } from "@/data/demo";
import { fetchKits, filterKits, type KitCriteria } from "@/data/kits";

export function SearchResults({ criteria }: { criteria: KitCriteria }) {
  const navigate = useNavigate();
  const { data: allKits, isPending, isError, error, refetch } = useQuery({
    queryKey: ["kits"],
    queryFn: fetchKits,
  });
  const kits = allKits ? filterKits(allKits, criteria) : [];

  return <main className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
    <div id="criteres" className="scroll-mt-4"><KitSearch key={JSON.stringify(criteria)} compact initial={criteria} onSearch={c => void navigate({ to: "/recherche", search: c })} /></div>
    {isError ? (
      <div role="alert" className="my-8 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6">
        <p className="flex items-center gap-2 text-lg font-bold"><AlertTriangle className="size-5 shrink-0" />Impossible de charger les kits</p>
        <p className="text-sm text-muted-foreground">La lecture de la base de données a échoué{error instanceof Error && error.message ? ` : ${error.message}` : "."} Vérifiez votre connexion puis réessayez.</p>
        <Button variant="secondary" onClick={() => void refetch()}>Réessayer</Button>
      </div>
    ) : isPending ? (
      <p className="my-8 text-muted-foreground" aria-live="polite">Chargement des kits…</p>
    ) : (
      kits.length === 0 ? (
      <div className="my-8 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6">
        <h1 className="text-xl font-bold">Aucun kit ne correspond à votre recherche. Modifiez vos critères.</h1>
      </div>
      ) : <>
        <h1 className="my-8 text-xl font-bold">{kits.length} kit{kits.length > 1 ? "s" : ""} disponible{kits.length > 1 ? "s" : ""} autour de {criteria.ville || demoBooking.departure}</h1>
        <div className="space-y-6">{kits.map(kit => <Card key={kit.id} className="flex min-w-0 flex-col gap-6 rounded-3xl bg-reassurance p-5 sm:p-6 md:flex-row">
          <img src={kit.photo} alt={kit.photoAlt} className="aspect-[4/3] w-full shrink-0 rounded-2xl object-cover md:w-[38%]" />
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-3"><Badge variant={kit.variant}>{kit.age}</Badge><h2 className="text-2xl font-bold">{kit.name}</h2></div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm"><span className="flex items-center gap-1.5"><MapPin className="size-4 shrink-0" />{kit.location}</span><span className="flex items-center gap-1.5 whitespace-nowrap font-semibold"><Star className="size-4 fill-current" />{kit.rating} ({kit.reviewCount} avis)</span></div>
            <p className="mt-3 font-medium">{kit.equipment}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3"><Badge variant="outline" className="bg-muted">{kit.duration}</Badge><span className="text-sm text-muted-foreground">{kit.estimate}</span></div>
            <blockquote className={`my-4 rounded-xl border-l-4 bg-card p-4 ${kit.variant === "cocoon" ? "border-cocoon-border" : kit.variant === "adventurer" ? "border-adventurer-border" : "border-explorer-border"}`}>
              <div className="mb-2 flex items-center gap-3"><img src={kit.avatar} alt={`Portrait de ${kit.ownerFirstName}`} className="size-10 shrink-0 rounded-full object-cover" /><p className="font-semibold">{kit.owner}</p></div><p>{kit.quote}</p>
            </blockquote>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4"><p><strong className="text-3xl">{euros(kit.dailyPrice, false)}</strong><span className="ml-1.5 text-sm">/ jour</span></p><Button asChild variant="secondary"><Link to="/kits/$kitId" params={{ kitId: kit.id }} search={{ debut: criteria.debut ?? DEFAULT_STAY.debut, fin: criteria.fin ?? DEFAULT_STAY.fin }}>Découvrir ce kit</Link></Button></div>
          </div>
        </Card>)}</div>
      </>
    )}
  </main>;
}
