import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Calendar, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { kitOwners } from '@/data/kits';
import { euros } from '@/data/demo';
import { Card, GuideButton, JourneyShell } from './booking-journey';

const paris = (iso: string, time = false) => new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', ...(time ? { hour: '2-digit', minute: '2-digit' } : {}) }).format(new Date(iso));

const statusLabel: Record<string, string> = {
 en_attente: 'En attente de la réponse du loueur', acceptee: 'Acceptée', refusee: 'Refusée',
 expiree: 'Expirée, sans réponse sous 24 h', annulee_par_locataire: 'Annulée', annulee_par_loueur: 'Annulée',
};

async function fetchReservations() {
 const { data, error } = await supabase.from('reservations')
  .select('id, kit_id, statut, debut_le, fin_le, reponse_limite_le, creneau_remise_le, total_debite, demande_le, kits(nom)')
  .order('demande_le', { ascending: false });
 if (error) throw new Error(error.message);
 return data ?? [];
}

export function MyReservations() {
 const q = useQuery({ queryKey: ['mes-reservations'], queryFn: fetchReservations });
 return <JourneyShell><h1 className="mb-8 text-3xl font-bold">Mes réservations</h1>
  {q.isPending && <p role="status" className="text-muted-foreground">Chargement de vos réservations…</p>}
  {q.isError && <div role="alert" className="space-y-3 rounded-xl border border-border p-5"><p>Impossible de charger vos réservations : {q.error.message}</p><Button variant="secondary" onClick={() => void q.refetch()}>Réessayer</Button></div>}
  {q.data && q.data.length === 0 && <div className="py-10 text-center"><Package aria-hidden className="mx-auto mb-3 size-7" /><p className="mb-5">Vous n'avez pas encore de réservation.</p><Button asChild><Link to="/" hash="criteres">Trouver un kit</Link></Button></div>}
  {q.data && q.data.length > 0 && <div className="max-w-[900px] space-y-6">{q.data.map(r => {
   const info = kitOwners[r.kit_id];
   const name = (r.kits as { nom: string } | null)?.nom ?? 'Kit';
   const day = (iso: string) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date(iso));
   const stay = { debut: day(r.debut_le), fin: day(r.fin_le) };
   return <Card key={r.id} className="space-y-5 p-5 sm:p-7">
    <div className="flex flex-wrap gap-2"><Badge variant="outline" className="whitespace-nowrap">{statusLabel[r.statut] ?? r.statut}</Badge></div>
    <div className="grid gap-5 sm:grid-cols-[200px_minmax(0,1fr)]">
     {info && <Link to="/kits/$kitId" params={{ kitId: r.kit_id }} search={stay} aria-label={`Ouvrir la fiche ${name}`} className="rounded-xl focus-visible:outline-2 focus-visible:outline-ring"><img src={info.photo} alt={info.photoAlt} className="aspect-[1.2] w-full rounded-xl object-cover" /></Link>}
     <div className="min-w-0">
      <h2 className="text-xl font-bold"><Link to="/kits/$kitId" params={{ kitId: r.kit_id }} search={stay} className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-ring">{name}</Link></h2>
      <p className="mt-3 flex gap-2 text-sm"><Calendar aria-hidden className="size-4 shrink-0" /><span>Du {paris(r.debut_le)} au {paris(r.fin_le)}</span></p>
      <strong className="mt-3 block">{euros(Number(r.total_debite))} payés</strong>
      {r.statut === 'en_attente' && <p className="mt-3 text-sm">Réponse attendue avant le {paris(r.reponse_limite_le, true)}</p>}
      {r.statut === 'acceptee' && <><p className="mt-3 text-sm"><strong>Remise :</strong> {paris(r.creneau_remise_le, true)}</p><Button asChild variant="secondary" className="mt-4"><Link to="/reservation-confirmee">Voir les détails de la remise</Link></Button></>}
     </div>
    </div>
    <div className="border-t border-border pt-4"><GuideButton /></div>
   </Card>;
  })}</div>}
 </JourneyShell>;
}
