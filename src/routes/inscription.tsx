import { createFileRoute } from '@tanstack/react-router';
import { AuthDemo } from '@/components/auth-demo';
import { safeRedirect } from '@/lib/stay';
export const Route = createFileRoute('/inscription')({
  validateSearch: (s: Record<string, unknown>): { redirect?: string | undefined } => ({ redirect: safeRedirect(s['redirect']) }),
  head: () => ({ meta: [
    { title: 'Créer mon compte — Mini Vadrouille' },
    { name: 'description', content: 'Bienvenue chez les Vadrouilleurs. Retrouvez le formulaire de création de compte Mini Vadrouille.' },
    { property: 'og:title', content: 'Créer mon compte — Mini Vadrouille' },
    { property: 'og:description', content: 'Bienvenue chez les Vadrouilleurs. Retrouvez le formulaire de création de compte Mini Vadrouille.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: () => <AuthDemo register />,
});