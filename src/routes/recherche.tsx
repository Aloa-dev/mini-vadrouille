import { createFileRoute } from "@tanstack/react-router";
import { SearchResults } from "@/components/search-results";
import type { KitCriteria } from "@/data/kits";
import { parseStay } from "@/lib/stay";

function RechercheRoute() { return <SearchResults criteria={Route.useSearch()} />; }
export const Route = createFileRoute("/recherche")({
  validateSearch: (s: Record<string, unknown>): KitCriteria => ({
    ville: typeof s['ville'] === "string" && s['ville'] ? s['ville'] : undefined,
    enfants: Number(s['enfants']) > 0 ? Number(s['enfants']) : undefined,
    age: typeof s['age'] === "string" && s['age'] ? s['age'] : undefined,
    ...parseStay(s),
  }),
  head: () => ({ meta: [
    { title: "Kits vélo autour de Bordeaux — Mini Vadrouille" },
    { name: "description", content: "Kits vélo disponibles selon votre ville, le nombre et l'âge de vos enfants." },
    { property: "og:title", content: "Kits vélo autour de Bordeaux — Mini Vadrouille" },
    { property: "og:description", content: "Découvrez les kits vélo proposés par Thomas, Sophie, Camille et Claire." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: RechercheRoute,
});