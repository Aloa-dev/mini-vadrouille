import { createFileRoute, redirect } from '@tanstack/react-router';
import { Payment } from '@/components/payment';
import { supabase } from '@/integrations/supabase/client';
import { parseStay } from '@/lib/stay';
export const Route = createFileRoute('/paiement')({
 ssr: false,
 validateSearch: (search: Record<string, unknown>) => ({
  kit: typeof search['kit'] === 'string' ? search['kit'] : '',
  ...parseStay(search),
  serenity: search['serenity'] === true || search['serenity'] === 'true',
 }),
 beforeLoad: async ({ location }) => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw redirect({ to: '/connexion', search: { redirect: location.href } });
 },
 head: () => ({ meta: [
 { title: 'Paiement & demande — Mini Vadrouille' },
 { name: 'description', content: 'Préparez la remise du kit et envoyez votre demande de location.' },
 { property: 'og:title', content: 'Paiement & demande — Mini Vadrouille' },
 { property: 'og:description', content: 'Préparez la remise du kit et envoyez votre demande de location.' },
 { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
 ] }), component: Payment,
});
