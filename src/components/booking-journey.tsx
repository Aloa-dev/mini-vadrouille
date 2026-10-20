import type { ReactNode } from 'react';
import { Check, CreditCard, Download, Shield, Bike, Smartphone, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { bookingAmounts, demoBooking, demoKits, euros, journeyCopy, ownerImages, guideDownload } from '@/data/demo';

export function JourneyStepper({ stage, ownerName = 'Thomas' }: { stage: 'payment' | 'sent' | 'confirmed'; ownerName?: string }) {
 const labels = ['Kit choisi', 'Paiement & demande', stage === 'confirmed' ? 'Confirmation' : `Réponse de ${ownerName}`];
 const current = stage === 'payment' ? 1 : stage === 'sent' ? 2 : 3;
 return <nav aria-label="Étapes de la demande" className="mb-8 rounded-2xl border border-border bg-card p-4 sm:p-6"><ol className="grid gap-4 sm:grid-cols-3">{labels.map((label, i) => <li key={label} aria-current={i === current ? 'step' : undefined} className="flex min-w-0 items-center gap-3"><span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${i <= current ? 'bg-forest text-paper' : 'bg-muted text-muted-foreground'}`}>{i < current ? <Check className="size-4" /> : i + 1}</span><div><p className="text-sm text-forest">{i < current ? `Étape ${i + 1}` : i === current ? 'EN COURS' : 'À venir'}</p><p className="font-semibold">{label}</p></div></li>)}</ol></nav>;
}
export function JourneyShell({ children, stage, narrow = false, ownerName }: { children: ReactNode; stage?: 'payment' | 'sent' | 'confirmed'; narrow?: boolean; ownerName?: string }) {
 return <main className={`mx-auto px-5 py-10 sm:px-8 ${narrow ? 'max-w-[760px]' : 'max-w-[1280px]'}`}>{stage && <JourneyStepper stage={stage} {...(ownerName ? { ownerName } : {})} />}{children}</main>;
}
export function SectionTitle({ icon, children, eyebrow }: { icon: ReactNode; children: ReactNode; eyebrow?: string }) {
 return <div className="mb-5 flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-reassurance">{icon}</span><div>{eyebrow && <p className="text-sm text-muted-foreground">{eyebrow}</p>}<h2 className="text-xl font-bold">{children}</h2></div></div>;
}
export function Owner({ payment = false }: { payment?: boolean }) {
 return <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-reassurance p-4"><img src={ownerImages.thomas} alt="Thomas" className="size-12 rounded-full object-cover" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><strong>{payment ? 'Votre loueur : Thomas' : 'Thomas'}</strong><Badge variant="outline">Vadrouilleur expert</Badge></div><p className="text-sm text-muted-foreground">Papa de Léonie et Milo · Bordeaux Centre</p></div></div>;
}
export function Amounts({ serenity = true, title = 'Total payé', reference = false }: { serenity?: boolean; title?: string; reference?: boolean }) {
 const amounts = bookingAmounts(serenity);
 const rows = [[`Location (${demoBooking.days} jours x ${euros(demoKits[0].dailyPrice)})`, amounts.rental], ['Frais de service Mini Vadrouille', amounts.service], ...(serenity ? [['Option sérénité (nettoyage)', demoBooking.serenity]] : []), ['Caution remboursable', demoBooking.deposit]];
 return <div className="space-y-3 text-sm">{reference && <p className="border-b border-border pb-3">Réservation n° {demoBooking.reference}</p>}{rows.map(([label, amount]) => <div key={label} className="flex items-start justify-between gap-3 text-muted-foreground"><span>{label}</span><span className="shrink-0 whitespace-nowrap">{euros(Number(amount))}</span></div>)}<div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xl font-bold"><span>{title}</span><output data-testid="journey-total" aria-live="polite" className="whitespace-nowrap">{euros(amounts.total)}</output></div></div>;
}
export function Deposit() {
 return <div className="flex gap-3 rounded-xl border border-border border-l-4 border-l-forest/40 p-4"><Shield className="mt-1 size-5 shrink-0" /><div><strong>Caution remboursable ({euros(demoBooking.deposit)})</strong><p className="mt-2 text-sm text-muted-foreground">Débitée à l'envoi de la demande, remboursée sous {demoBooking.refundHours} h après l'état des lieux de retour.</p></div></div>;
}
export function Preparation({ vertical = false }: { vertical?: boolean }) {
 const icons = [Bike, Smartphone, Clock];
 return <div className={`grid gap-3 ${vertical ? '' : 'sm:grid-cols-3'}`}>{journeyCopy.preparation.map((item, i) => { const Icon = icons[i] ?? Clock; return <div key={item.title} className={vertical ? 'flex gap-3 py-2' : 'rounded-xl border border-border p-4'}><Icon className="mb-2 size-5 shrink-0" /><div><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div></div>; })}</div>;
}
export function GuideButton() { return <Button variant="secondary" asChild><a href={guideDownload.url} download="Guide-du-parent-cycliste.pdf"><Download />Télécharger le guide <span className="whitespace-nowrap">(PDF)</span></a></Button>; }
export function PaidByCard() { return <p className="flex items-center gap-2 text-sm"><CreditCard className="size-4" />Payé par carte bancaire (Stripe)</p>; }
export { Card };
