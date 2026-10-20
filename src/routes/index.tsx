import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mini Vadrouille — L'aventure à vélo en famille" },
      { name: "description", content: "Louez un kit complet et prêt à rouler auprès de parents expérimentés : prêts à vadrouiller avec vos minis ?" },
      { property: "og:title", content: "Mini Vadrouille — L'aventure à vélo en famille" },
      { property: "og:description", content: "Louez un kit complet et prêt à rouler auprès de parents expérimentés." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
