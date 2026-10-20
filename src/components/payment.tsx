import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { AlertTriangle, Bike, MapPin, Sparkles, MessageSquare, Shield, Lock, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { demoBooking, euros } from '@/data/demo';
import { fetchKit, type KitCard } from '@/data/kits';
import { supabase } from '@/integrations/supabase/client';
import { PICKUP_TIME, RETURN_TIME, parisIso, shortDay, stayDays, type Stay } from '@/lib/stay';
import { Route as PaymentRoute } from '@/routes/paiement';
import { Card, JourneyShell, SectionTitle } from './booking-journey';

function TimeField({ label, value, options }: { label: string; value: string; options: string[] }) { return <Select defaultValue={value}><SelectTrigger aria-label={label} className="h-11 rounded-full bg-field text-base focus:ring-2"><SelectValue /></SelectTrigger><SelectContent>{options.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}</SelectContent></Select>; }

function amountsFor(kit: KitCard, days: number, serenity: boolean) {
 const rental = kit.dailyPrice * days;
 const service = Math.round(rental * demoBooking.serviceRate * 100) / 100;
 const serenityAmount = kit.serenity ?? demoBooking.serenity;
 return { rental, service, serenityAmount, total: rental + service + kit.caution + (serenity ? serenityAmount : 0) };
}

async function errorMessage(error: unknown): Promise<string> {
 if (error instanceof FunctionsHttpError) {
  try { const body = await (error.context as Response).json() as { erreur?: unknown }; if (typeof body.erreur === 'string' && body.erreur) return body.erreur; } catch { /* corps illisible */ }
 }
 return "La demande n'a pas pu être envoyée. Vérifiez votre connexion puis réessayez.";
}

export function Payment() {
 const search = PaymentRoute.useSearch();
 const { data: kit, isPending, isError, error, refetch } = useQuery({ queryKey: ['kits', search.kit], queryFn: () => fetchKit(search.kit), enabled: !!search.kit });
 if (!search.kit || isError) return <JourneyShell><div role="alert" className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6"><p className="flex items-center gap-2 text-lg font-bold"><AlertTriangle className="size-5 shrink-0" />Impossible de charger ce kit</p><p className="text-sm text-muted-foreground">{error instanceof Error && error.message ? error.message : 'Aucun kit sélectionné.'}</p><div className="flex gap-3">{search.kit && <Button variant="secondary" onClick={() => void refetch()}>Réessayer</Button>}<Button variant="outline" asChild><Link to="/recherche">Retour aux kits</Link></Button></div></div></JourneyShell>;
 if (isPending || !kit) return <JourneyShell><p className="text-muted-foreground" aria-live="polite">Chargement du kit…</p></JourneyShell>;
 return <PaymentForm kit={kit} stay={{ debut: search.debut, fin: search.fin }} initialSerenity={search.serenity} />;
}

function PaymentForm({ kit, stay, initialSerenity }: { kit: KitCard; stay: Stay; initialSerenity: boolean }) {
 const [serenity, setSerenity] = useState(initialSerenity);
 const [terms, setTerms] = useState(false);
 const [message, setMessage] = useState('');
 const [sending, setSending] = useState(false);
 const [failure, setFailure] = useState('');
 const owner = kit.ownerFirstName;
 const days = stayDays(stay);
 const amounts = amountsFor(kit, days, serenity);

 async function submit() {
  if (!terms || sending) return;
  setSending(true); setFailure('');
  try {
   const { data, error } = await supabase.functions.invoke('creer-reservation-paiement', { body: { kit_id: kit.id, debut_le: parisIso(stay.debut, PICKUP_TIME), fin_le: parisIso(stay.fin, RETURN_TIME), option_serenite: serenity, message: message.trim() } });
   if (error) throw error;
   const result = data as { url?: unknown; erreur?: unknown } | null;
   if (result && typeof result.url === 'string' && result.url) { window.location.href = result.url; return; }
   setFailure(result && typeof result.erreur === 'string' && result.erreur ? result.erreur : "La demande n'a pas pu être envoyée. Réessayez.");
  } catch (e) { setFailure(await errorMessage(e)); }
  setSending(false);
 }

 const rows: [string, number][] = [[`Location (${days} jours x ${euros(kit.dailyPrice)})`, amounts.rental], ['Frais de service Mini Vadrouille', amounts.service], ...(serenity ? [['Option sérénité (nettoyage)', amounts.serenityAmount] as [string, number]] : []), ['Caution remboursable', kit.caution]];

 return <JourneyShell stage="payment" ownerName={owner}><div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"><form className="min-w-0 space-y-6" onSubmit={e => { e.preventDefault(); void submit(); }}>
 <Card className="p-5 sm:p-8"><SectionTitle icon={<MapPin className="size-5" />} eyebrow="Passation entre parents">Créneaux de remise & restitution</SectionTitle><div className="flex gap-3 rounded-xl border border-border bg-reassurance p-4"><MapPin className="size-5 shrink-0" /><div><strong>{kit.location}</strong><p className="mt-1 text-sm text-muted-foreground">Chez {owner} · Adresse précise transmise après confirmation de {owner}.</p></div></div><div className="my-5 grid gap-4 sm:grid-cols-2"><div className="space-y-2 rounded-xl border border-border bg-reassurance p-4"><p className="text-sm">Retrait du matériel</p><strong className="block">{shortDay(stay.debut)}</strong><TimeField label="Heure de retrait" value={PICKUP_TIME} options={demoBooking.pickupTimes} /></div><div className="space-y-2 rounded-xl border border-border bg-reassurance p-4"><p className="text-sm">Restitution</p><strong className="block">{shortDay(stay.fin)}</strong><TimeField label="Heure de restitution" value={RETURN_TIME} options={demoBooking.returnTimes} /></div></div><p className="text-sm text-muted-foreground">Horaire de retrait recommandé par {owner}.</p><div className="mt-5 flex gap-3 rounded-xl border border-border border-l-4 border-l-forest/40 p-4"><Bike className="size-5 shrink-0" /><div><strong>{demoBooking.demonstrationMinutes} min de démonstration et réglage offerts</strong><p className="mt-1 text-sm text-muted-foreground">{owner} installe l'attache avec vous et ajuste les sangles 5 points pour votre tout-petit.</p></div></div></Card>
 <Card className="p-5 sm:p-8"><SectionTitle icon={<Sparkles className="size-5" />} eyebrow="Aventure sans stress">Options de confort</SectionTitle><div className="rounded-xl border border-border bg-reassurance p-4"><div className="flex items-start gap-3"><Checkbox id="payment-serenity" checked={serenity} onCheckedChange={v => setSerenity(v === true)} className="mt-1" /><label htmlFor="payment-serenity" className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-3 font-semibold"><span className="min-w-0 flex-1">Option sérénité : le loueur nettoie le kit au retour</span><Badge variant="outline" className="shrink-0">+ {euros(amounts.serenityAmount)}</Badge></label></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Rendez la remorque sans avoir à passer un coup d'aspirateur après les miettes de goûter. {owner} s'occupe du nettoyage complet à l'éco-vapeur.</p><p className="mt-2 text-sm text-muted-foreground">Sans cette option, vous rendez le kit propre.</p></div></Card>
 <Card className="space-y-4 p-5 sm:p-8"><SectionTitle icon={<MessageSquare className="size-5" />} eyebrow="Message au loueur">Coordination avec {owner}</SectionTitle><label htmlFor="owner-message" className="block text-sm font-semibold">Votre mot pour le loueur (détails sur l'enfant, précisions d'arrivée)</label><Textarea id="owner-message" value={message} onChange={e => setMessage(e.target.value)} className="min-h-32 rounded-xl bg-field text-base focus-visible:ring-2" /><p className="text-sm text-muted-foreground">Les loueurs adorent savoir quel parcours leurs équipements vont explorer.</p></Card>
 <Card className="space-y-5 p-5 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-2"><SectionTitle icon={<Shield className="size-5" />}>Paiement & Caution</SectionTitle><span className="text-sm">Paiement par Stripe</span></div><p className="rounded-xl border border-border bg-reassurance p-4 text-sm">Vous serez redirigé(e) vers la page de paiement de notre partenaire Stripe pour régler.</p><div className="flex gap-3 rounded-xl border border-border border-l-4 border-l-forest/40 p-4"><Shield className="mt-1 size-5 shrink-0" /><div><strong>Caution remboursable ({euros(kit.caution)})</strong><p className="mt-2 text-sm text-muted-foreground">Débitée à l'envoi de la demande, remboursée sous {demoBooking.refundHours} h après l'état des lieux de retour.</p></div></div><p className="flex items-center gap-2 text-sm"><Check className="size-4" />État des lieux photo fait ensemble, avant et après</p><div className="flex items-start gap-3"><Checkbox id="terms" checked={terms} onCheckedChange={v => setTerms(v === true)} className="mt-1" /><label htmlFor="terms" className="text-sm">J'accepte les CGU et les conditions de location</label></div><Button type="submit" disabled={!terms || sending} className="h-auto min-h-12 w-full whitespace-normal px-3 py-3"><Lock />{sending ? 'Envoi en cours…' : `Payer ${euros(amounts.total)} et envoyer la demande`}</Button>
 {failure && <div role="alert" className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-4"><p className="flex items-start gap-2 text-sm font-semibold"><AlertTriangle className="mt-0.5 size-4 shrink-0" />{failure}</p><Button type="button" variant="secondary" size="sm" disabled={!terms || sending} onClick={() => void submit()}>Réessayer</Button></div>}</Card>
 </form><aside className="min-w-0 space-y-5 lg:sticky lg:top-6"><Card className="space-y-5 p-5 sm:p-6"><div className="flex flex-wrap items-start gap-4 border-b border-border pb-5"><img src={kit.photo} alt={kit.photoAlt} className="h-28 w-24 rounded-xl object-cover" /><div className="min-w-0 flex-1"><Badge variant="outline">{kit.age}</Badge><p className="mt-2 whitespace-nowrap text-sm">★ {kit.rating} ({kit.reviewCount} avis)</p><h2 className="mt-2 text-xl font-bold">{kit.name}</h2><p className="text-sm text-muted-foreground">Chez {owner} • {kit.location}</p></div><div className="basis-full"><Badge variant="outline">Matériel auto-évalué par le loueur</Badge></div></div><h3 className="font-bold">Détail du prix</h3>
 <div className="space-y-3 text-sm">{rows.map(([label, amount]) => <div key={label} className="flex items-start justify-between gap-3 text-muted-foreground"><span>{label}</span><span className="shrink-0 whitespace-nowrap">{euros(amount)}</span></div>)}<div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xl font-bold"><span>Total réglé aujourd'hui</span><output data-testid="journey-total" aria-live="polite" className="whitespace-nowrap">{euros(amounts.total)}</output></div></div>
 <p className="text-sm text-muted-foreground">Dont {euros(kit.caution, false)} de caution, remboursée sous {demoBooking.refundHours} h après l'état des lieux de retour.</p><div className="space-y-3 rounded-xl border border-border border-l-4 border-l-forest/40 p-4 text-sm"><h3 className="flex items-center gap-2 font-semibold"><Calendar className="size-4" />Conditions de réservation</h3><p>✓ Annulation sans frais jusqu'à {demoBooking.refundHours} h avant la remise</p><p>✓ Le total est débité à l'envoi de la demande. {owner} répond sous {demoBooking.responseHours} h.</p><p>✓ Si {owner} refuse la demande, vous êtes remboursé intégralement.</p></div></Card>
 <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-reassurance p-4"><img src={kit.avatar} alt={`Portrait de ${owner}`} className="size-12 rounded-full object-cover" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><strong>Votre loueur : {owner}</strong><Badge variant="outline">Vadrouilleur expert</Badge></div><p className="text-sm text-muted-foreground">{kit.ownerDescription}</p></div></div></aside></div></JourneyShell>;
}
