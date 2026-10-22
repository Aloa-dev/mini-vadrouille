import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowLeft, Check, CheckCircle2, Clock, Compass, CreditCard, Heart, MapPin, Package, Scale, Share2, Shield, Star, Sun, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { compatibilityImages, demoBooking, equipmentImages, euros, gallery, kitDetail } from "@/data/demo";
import { fetchKit, type KitCard } from "@/data/kits";
import { stayDays, stayLabel, type Stay } from "@/lib/stay";
import { useSessionUser } from "@/hooks/use-session-user";
import { CompatibilityAssistant } from "@/components/compatibility-assistant";

const sectionClass = "border-t border-border pt-8";

export function KitDetail({ kitId, stay }: { kitId: string; stay: Stay }) {
  const { data: kit, isPending, isError, error, refetch } = useQuery({
    queryKey: ["kits", kitId],
    queryFn: () => fetchKit(kitId),
  });

  if (isError) {
    return <main className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
      <div role="alert" className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6">
        <p className="flex items-center gap-2 text-lg font-bold"><AlertTriangle className="size-5 shrink-0" />Impossible de charger ce kit</p>
        <p className="text-sm text-muted-foreground">La lecture de la base de données a échoué{error instanceof Error && error.message ? ` : ${error.message}` : "."} Vérifiez votre connexion puis réessayez.</p>
        <div className="flex gap-3"><Button variant="secondary" onClick={() => void refetch()}>Réessayer</Button><Button variant="outline" asChild><Link to="/recherche">Retour aux kits</Link></Button></div>
      </div>
    </main>;
  }
  if (isPending || !kit) {
    return <main className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8"><p className="text-muted-foreground" aria-live="polite">Chargement du kit…</p></main>;
  }
  return <KitDetailView kit={kit} stay={stay} />;
}

function KitDetailView({ kit, stay }: { kit: KitCard; stay: Stay }) {
  const user = useSessionUser();
  const days = stayDays(stay);
  const [serenity, setSerenity] = useState(false);
  const paymentSearch = { kit: kit.id, debut: stay.debut, fin: stay.fin, serenity };
  const [saved, setSaved] = useState(false);
  const rental = kit.dailyPrice * days;
  const service = Math.round(rental * demoBooking.serviceRate * 100) / 100;
  const serenityAmount = kit.serenity ?? demoBooking.serenity;
  const total = rental + service + kit.caution + (serenity ? serenityAmount : 0);
  return <main className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8">
    <div className="flex flex-wrap items-center justify-between gap-3 py-5 text-sm">
      <Link to="/recherche" className="flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-ring"><ArrowLeft className="size-4" />Kits Vélo Bordeaux Centre</Link>
      <div className="flex gap-2"><Button variant="filter" size="sm" onClick={() => { if (navigator.share) void navigator.share({ title: kit.name, url: window.location.href }).catch(() => {}); else void navigator.clipboard?.writeText(window.location.href); }}><Share2 />Partager</Button><Button variant="filter" size="sm" aria-pressed={saved} onClick={() => setSaved(!saved)}><Heart className={saved ? "fill-current" : ""} />Sauvegarder</Button></div>
    </div>
    <section aria-label="Photos du kit" className="grid gap-2 overflow-hidden rounded-2xl md:h-[480px] md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="relative h-[280px] min-h-0 min-w-0 sm:h-[380px] md:h-full">
        <img src={kit.photo} alt={kit.photoAlt} className="h-full w-full object-cover" />
        <Badge variant="outline" className="absolute left-2 top-3 gap-1.5 px-2 sm:left-3 sm:px-3"><CheckCircle2 className="size-4" />Matériel auto-évalué par le loueur</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 md:h-full md:grid-rows-2">
        {equipmentImages.map(image => <div key={image.alt} className="relative h-28 min-h-0 min-w-0 md:h-full"><img src={image.url} alt={image.alt} className="h-full w-full object-cover" /></div>)}
      </div>
    </section>
    <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] lg:gap-10">
      <div className="min-w-0 space-y-8">
        <section>
          <div className="flex flex-wrap gap-2"><Badge variant={kit.variant}>{kit.age}</Badge><Badge variant="outline" className="gap-1"><Star className="size-3.5 fill-current" />{kit.rating} ({kit.reviewCount} avis)</Badge><span className="flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-sm"><MapPin className="size-4 shrink-0" />{kit.location}</span></div>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{kit.name} : {kit.equipment}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2"><Badge variant="outline" className="gap-1 bg-muted"><Clock className="size-4" />{kit.duration}</Badge><span className="text-sm text-muted-foreground">{kit.estimate}</span></div>
          <div className="mt-4 flex flex-wrap gap-2">{kitDetail.badges.map((text, i) => <Badge key={text} variant="outline" className="gap-1.5">{i === 0 ? <Users className="size-4" /> : i === 1 ? <Compass className="size-4" /> : <Package className="size-4" />}{text}</Badge>)}</div>
        </section>
        <section className={sectionClass}><h2 className="flex items-center gap-2 text-xl font-bold"><Package className="size-5" />Équipements et accessoires inclus dans le kit</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{kitDetail.equipment.map((group, i) => <Card key={group.title} className="overflow-hidden"><div className="p-5"><h3 className="flex items-center gap-2 font-bold">{i === 2 ? <Wrench className="size-4" /> : i === 3 ? <Shield className="size-4" /> : i === 1 ? <Sun className="size-4" /> : <Package className="size-4" />}{group.title}</h3><div className="mt-3 flex flex-wrap gap-2">{group.items.map(item => <Badge key={item} variant="outline" className="bg-muted">{item}</Badge>)}</div></div></Card>)}</div>
        </section>
        <section className={sectionClass}><div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row"><img src={kit.avatar} alt={`Portrait de ${kit.ownerFirstName}`} className="size-12 shrink-0 rounded-full object-cover" /><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-bold">Proposé par {kit.ownerFirstName}</h2><Badge variant="outline" className="bg-muted">Vadrouilleur expert</Badge></div><p className="mt-1 text-sm text-muted-foreground">{kit.ownerDescription}</p><p className="mt-2 text-sm italic leading-relaxed">{kit.quote}</p></div></div></section>
        <section className={sectionClass}><h2 className="flex items-center gap-2 text-xl font-bold"><Compass className="size-5" />Son retour d'expérience terrain</h2><p className="mt-4 border-l-2 border-forest pl-3 text-sm italic leading-relaxed">{kit.recit}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">{kitDetail.tips.map((tip, i) => <Card key={tip.title} className="bg-reassurance p-4"><div className="flex items-start gap-2">{i === 0 ? <Sun className="mt-0.5 size-4 shrink-0" /> : i === 1 ? <Compass className="mt-0.5 size-4 shrink-0" /> : <Users className="mt-0.5 size-4 shrink-0" />}<div><h3 className="text-sm font-bold">{tip.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.text}</p></div></div></Card>)}</div>
          {kit.conseil && <p className="mt-6 text-sm leading-relaxed"><strong>Conseil pratique :</strong> {kit.conseil}</p>}
          <h3 className="mt-6 text-sm font-bold">Les {kitDetail.details.length} détails qui font la différence :</h3><ul className="mt-3 space-y-2">{kitDetail.details.map(text => <li key={text} className="flex items-start gap-2 text-sm leading-relaxed"><Check className="mt-1 size-4 shrink-0" /><span><strong>{text.split(" :")[0]} :</strong>{text.split(" :")[1]}</span></li>)}</ul>
        </section>
        <section className={sectionClass}><h2 className="flex items-center gap-2 text-xl font-bold"><Wrench className="size-5" />Est-ce compatible avec votre vélo ?</h2><p className="mt-4 text-sm text-muted-foreground">{kitDetail.compatibilityIntro}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">{kitDetail.compatibility.map((step, i) => <Card key={step.title} className="overflow-hidden"><img src={compatibilityImages[i]} alt={step.title} className="aspect-[1.7] w-full object-cover" /><div className="p-4"><h3 className="font-bold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p></div></Card>)}</div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"><div className="flex items-center gap-3"><Scale className="size-6 shrink-0" /><div><h3 className="text-sm font-bold">Poids et charge maximale</h3><p className="text-sm text-muted-foreground">{kitDetail.weightDescription}</p></div></div><Badge variant="outline">{kit.maxWeight} kg max</Badge></div>
          <CompatibilityAssistant kitId={kit.id} user={user} returnTo={`/kits/${kit.id}?debut=${stay.debut}&fin=${stay.fin}`} />
        </section>
        <section className={sectionClass}><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="flex items-start gap-2 text-xl font-bold"><Shield className="mt-1 size-5 shrink-0" />Checklist déclarative du loueur (à vérifier lors de la remise)</h2><span className="text-sm text-muted-foreground">Dernier contrôle : {kitDetail.lastCheck}</span></div><p className="mt-4 text-sm text-muted-foreground">{kitDetail.checklistIntro}</p>
          <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">{kitDetail.checklist.map(item => <li key={item.title} className="flex flex-wrap items-center justify-between gap-3 p-4"><div className="flex min-w-0 flex-1 items-start gap-3"><CheckCircle2 className="mt-1 size-4 shrink-0" /><div><p className="text-sm font-semibold">{item.title}</p><p className="text-sm text-muted-foreground">{item.text}</p></div></div><Badge variant="outline" className="bg-muted">DÉCLARÉ PAR LE LOUEUR</Badge></li>)}</ul>
        </section>
      </div>
      <aside className="min-w-0 lg:sticky lg:top-6"><Card className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-4"><div><p><strong className="text-3xl">{euros(kit.dailyPrice, false)}</strong><span className="ml-1 text-sm text-muted-foreground">/ jour</span></p><p className="mt-1 text-sm text-muted-foreground">{stayLabel(stay)}</p></div><p className="flex items-center gap-1 whitespace-nowrap text-sm"><Star className="size-3 fill-current" />{kit.rating} ({kit.reviewCount})</p></div>
        <div className="flex items-start gap-2.5 rounded-xl border border-border bg-reassurance p-3.5 text-sm"><CreditCard className="mt-1 size-4 shrink-0" /><div><strong>Caution remboursable, débitée en plus ({euros(kit.caution, false)})</strong><p className="mt-1 text-muted-foreground">Débitée à l'envoi de la demande, remboursée sous {demoBooking.refundHours} h après l'état des lieux de retour.</p></div></div>
        <div className="flex items-start gap-2.5 rounded-xl border border-border bg-reassurance p-3.5 text-sm"><MapPin className="mt-1 size-4 shrink-0" /><div><strong>Remise en main propre</strong><p className="text-muted-foreground">{kit.location}</p><p className="mt-1 italic text-muted-foreground">Adresse précise dévoilée après confirmation</p></div></div>
        <div className="space-y-3 text-sm"><PriceRow label={`${euros(kit.dailyPrice, false)} × ${days} jours`} amount={rental} /><PriceRow label="Frais de service Mini Vadrouille" amount={service} />
          <div className="rounded-xl border border-border bg-reassurance p-3"><div className="flex items-start gap-2"><Checkbox id="serenity" checked={serenity} onCheckedChange={checked => setSerenity(checked === true)} className="mt-1" /><label htmlFor="serenity" className="flex min-w-0 flex-1 cursor-pointer items-start justify-between gap-2 font-semibold"><span>Option sérénité : le loueur nettoie le kit au retour</span><span className="whitespace-nowrap">+ {euros(serenityAmount, false)}</span></label></div><p className="mt-2 pl-6 text-muted-foreground">Sans cette option, vous rendez le kit propre.</p></div>
          <PriceRow label="Caution remboursable" amount={kit.caution} />
          <div className="flex items-baseline justify-between border-t border-border pt-3 text-base font-bold"><span>Total</span><output aria-live="polite" data-testid="booking-total" className="text-xl">{euros(total)}</output></div><p className="text-muted-foreground">Dont {euros(kit.caution, false)} de caution, remboursée sous {demoBooking.refundHours} h après l'état des lieux de retour.</p>
        </div>
        <Button className="w-full px-3" asChild>{user ? <Link to="/paiement" search={paymentSearch}>Continuer vers la demande</Link> : <Link to="/connexion" search={{ redirect: `/paiement?kit=${encodeURIComponent(kit.id)}&debut=${stay.debut}&fin=${stay.fin}&serenity=${serenity}` }}>Continuer vers la demande</Link>}</Button>
        <p className="flex items-start gap-1.5 text-center text-sm text-muted-foreground"><Clock className="mt-1 size-4 shrink-0" /><span>Le total est débité à l'envoi de la demande. {kit.ownerFirstName} répond sous {demoBooking.responseHours} h. Si {kit.ownerFirstName} refuse la demande, vous êtes remboursé intégralement.</span></p>
      </Card></aside>
    </div>
  </main>;
}
function PriceRow({ label, amount }: { label: string; amount: number }) {
  return <div className="flex items-start justify-between gap-3 text-muted-foreground"><span>{label}</span><span className="whitespace-nowrap font-medium text-foreground">{euros(amount)}</span></div>;
}
