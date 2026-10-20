import { createFileRoute, notFound } from "@tanstack/react-router";
import { KitDetail } from "@/components/kit-detail";
import { kitOwners } from "@/data/kits";
import { parseStay } from "@/lib/stay";
export const Route = createFileRoute("/kits/$kitId")({
  validateSearch: (s: Record<string, unknown>) => parseStay(s),
  beforeLoad: ({ params }) => { if (!kitOwners[params.kitId]) throw notFound(); },
  head: () => ({ meta: [
    { title: "Fiche kit — Mini Vadrouille" },
    { name: "description", content: "Découvrez ce kit vélo pour enfants proposé par un parent expérimenté." },
    { property: "og:title", content: "Fiche kit — Mini Vadrouille" },
    { property: "og:description", content: "Découvrez ce kit vélo pour enfants proposé par un parent expérimenté." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: KitDetailRoute,
});
function KitDetailRoute() {
  const { kitId } = Route.useParams();
  return <KitDetail kitId={kitId} stay={Route.useSearch()} />;
}
