import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '@/components/legal-page';
export const Route = createFileRoute('/confidentialite')({
  head: () => ({ meta: [
    { title: "Conditions d'utilisation et confidentialité — Mini Vadrouille" },
    { name: 'description', content: "Les conditions d'utilisation de Mini Vadrouille et la façon dont vos données personnelles sont utilisées." },
    { property: 'og:title', content: "Conditions d'utilisation et confidentialité — Mini Vadrouille" },
    { property: 'og:description', content: "Les conditions d'utilisation de Mini Vadrouille et la façon dont vos données personnelles sont utilisées." },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: LegalPage,
});
