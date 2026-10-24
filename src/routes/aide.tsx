import { createFileRoute } from '@tanstack/react-router';
import { HelpPage } from '@/components/help-page';
export const Route = createFileRoute('/aide')({
  head: () => ({ meta: [
    { title: "Guide d'utilisation — Mini Vadrouille" },
    { name: 'description', content: "Comment chercher, réserver et récupérer un kit vélo sur Mini Vadrouille, pas à pas." },
    { property: 'og:title', content: "Guide d'utilisation — Mini Vadrouille" },
    { property: 'og:description', content: "Comment chercher, réserver et récupérer un kit vélo sur Mini Vadrouille, pas à pas." },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: HelpPage,
});
