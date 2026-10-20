import { createFileRoute, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { MyReservations } from '@/components/my-reservations';
export const Route = createFileRoute('/mes-reservations')({
 ssr: false,
 beforeLoad: async ({ location }) => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw redirect({ to: '/connexion', search: { redirect: location.href } });
 },
 head: () => ({ meta: [
 { title: 'Mes réservations — Mini Vadrouille' },
 { name: 'description', content: 'Retrouvez votre réservation de kit vélo, ses horaires et les préparatifs de remise.' },
 { property: 'og:title', content: 'Mes réservations — Mini Vadrouille' },
 { property: 'og:description', content: 'Retrouvez votre réservation de kit vélo, ses horaires et les préparatifs de remise.' },
 { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
 ] }), component: MyReservations,
});
