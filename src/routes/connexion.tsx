import { createFileRoute } from '@tanstack/react-router';
import { AuthDemo } from '@/components/auth-demo';
import { safeRedirect } from '@/lib/stay';
export const Route = createFileRoute('/connexion')({
  validateSearch: (s: Record<string, unknown>): { redirect?: string | undefined } => ({ redirect: safeRedirect(s['redirect']) }),
  head: () => ({ meta: [
    { title: 'Connexion — Mini Vadrouille' },
    { name: 'description', content: 'Bon retour parmi nous. Retrouvez le formulaire de connexion Mini Vadrouille.' },
    { property: 'og:title', content: 'Connexion — Mini Vadrouille' },
    { property: 'og:description', content: 'Bon retour parmi nous. Retrouvez le formulaire de connexion Mini Vadrouille.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: () => <AuthDemo />,
});