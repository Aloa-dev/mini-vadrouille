import { createFileRoute } from '@tanstack/react-router';
import { RequestSent } from '@/components/request-sent';
export const Route = createFileRoute('/demande-envoyee')({
 head: () => ({ meta: [
 { title: 'Demande envoyée — Mini Vadrouille' },
 { name: 'description', content: 'Votre demande de location auprès de Thomas a été envoyée dans le parcours de démonstration.' },
 { property: 'og:title', content: 'Demande envoyée — Mini Vadrouille' },
 { property: 'og:description', content: 'Votre demande de location auprès de Thomas a été envoyée dans le parcours de démonstration.' },
 { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
 ] }), component: RequestSent,
});
