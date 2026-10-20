import { useState } from "react";
import { Bike, CalendarDays, Check, CheckCheck, Compass, CreditCard, Leaf, MapPin, Search, Sprout, Tent, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const kits = [
  { name: "Petit Cocon", age: "9–18 mois", description: "Les premières balades, bien installé.", icon: Sprout, className: "bg-cocoon border-cocoon-border", accent: "text-cocoon-accent" },
  { name: "Explorateur Curieux", age: "18 mois–3 ans", description: "Regarder les oiseaux, découvrir les chemins.", icon: Compass, className: "bg-explorer border-explorer-border", accent: "text-explorer-accent" },
  { name: "Mini Baroudeur", age: "3–6 ans", description: "Pédaler ensemble, à son rythme.", icon: Tent, className: "bg-adventurer border-adventurer-border", accent: "text-adventurer-accent" },
];

export function Foundations() {
  const [children, setChildren] = useState(1);
  const [age, setAge] = useState("18 mois–3 ans");
  const [selected, setSelected] = useState(true);
  const [popup, setPopup] = useState(false);
  return <main className="mx-auto max-w-[1280px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5">
      <div className="min-w-0"><p className="mb-4 text-sm text-muted-foreground">Mini Vadrouille / Fondations</p><h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Mini Vadrouille</h1><p className="mt-4 max-w-xl text-lg text-muted-foreground">L’aventure à vélo en famille, l’esprit tranquille.</p></div>
      <div aria-hidden="true" className="hidden items-center gap-5 pt-7 text-explorer-accent sm:flex"><Leaf className="size-9 text-cocoon-accent" strokeWidth={1.3} /><Bike className="size-24" strokeWidth={1.15} /><Sprout className="size-10 text-adventurer-accent" strokeWidth={1.3} /></div>
    </div>

    <section aria-labelledby="buttons-title" className="mt-12 grid gap-6 border-t border-border pt-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <div><h2 id="buttons-title" className="text-2xl font-semibold">Boutons & pastilles</h2><p className="mt-2 text-sm text-muted-foreground">Le départ d’une belle balade.</p></div>
      <div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><Button size="lg" onClick={() => setPopup(true)}><Search />Trouver un kit</Button><Button variant="secondary">Se connecter</Button><Button variant="secondary">S’inscrire</Button><Button variant="outline">Devenir loueur</Button></div>
      <div className="mt-6 flex flex-wrap items-center gap-3"><Button variant={selected ? "selected" : "filter"} size="sm" aria-pressed={selected} onClick={() => setSelected(!selected)}><Check className={selected ? "visible" : "invisible"} />Tous les kits</Button><Badge variant="outline">Caution via Stripe</Badge><Badge variant="cocoon">Petit Cocon</Badge><Badge variant="explorer">Explorateur Curieux</Badge><Badge variant="adventurer">Mini Baroudeur</Badge></div></div>
    </section>

    <section aria-labelledby="fields-title" className="mt-12 grid gap-6 border-t border-border pt-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <div><h2 id="fields-title" className="text-2xl font-semibold">Champs & choix</h2><p className="mt-2 text-sm text-muted-foreground">À chacun sa vadrouille.</p></div>
      <div className="grid min-w-0 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2"><label htmlFor="departure" className="mb-2 block text-sm font-medium">Point de départ de la vadrouille</label><div className="relative"><MapPin aria-hidden="true" className="absolute left-4 top-4 size-4 text-muted-foreground" /><Input id="departure" defaultValue="Bordeaux & Gironde" className="pl-11" /></div></div>
        <div><label htmlFor="start" className="mb-2 block text-sm font-medium">Dates du séjour</label><div className="relative"><CalendarDays aria-hidden="true" className="absolute left-4 top-4 size-4 text-muted-foreground" /><Input id="start" placeholder="Début du séjour" className="pl-11" /></div></div>
        <fieldset><legend className="mb-2 text-sm font-medium">Nombre d’enfants</legend><div className="flex min-h-12 items-center gap-2"><Button variant={children === 1 ? "selected" : "filter"} aria-pressed={children === 1} onClick={() => setChildren(1)}>1 enfant</Button><Button variant={children === 2 ? "selected" : "filter"} aria-pressed={children === 2} onClick={() => setChildren(2)}>2 enfants</Button></div></fieldset>
        <fieldset className="min-w-0 sm:col-span-2"><legend className="mb-3 text-sm font-medium">Âge du ou des enfants</legend><div className="flex flex-wrap gap-3">{kits.map(kit => <Button key={kit.age} variant={age === kit.age ? "selected" : "filter"} size="sm" aria-pressed={age === kit.age} onClick={() => setAge(kit.age)}>{kit.age}</Button>)}</div></fieldset>
      </div>
    </section>

    <section aria-labelledby="kits-title" className="mt-12 border-t border-border pt-8"><div className="mb-6 flex flex-wrap items-baseline justify-between gap-3"><h2 id="kits-title" className="text-2xl font-semibold">Un kit pour chaque âge</h2><span className="text-sm text-muted-foreground">Des premières balades aux petites aventures</span></div>
      <div className="grid gap-5 md:grid-cols-3">{kits.map(kit => <Card key={kit.name} className={`flex min-w-0 flex-col p-6 ${kit.className}`}><div className="flex items-center justify-between gap-3"><Badge variant="outline">{kit.age}</Badge><kit.icon className={`size-9 shrink-0 ${kit.accent}`} strokeWidth={1.4} /></div><h3 className="mt-6 text-xl font-semibold">Kit {kit.name}</h3><p className="mt-2 text-base text-muted-foreground">{kit.description}</p></Card>)}</div>
    </section>

    <section aria-label="Les repères de votre location" className="mt-8 grid gap-6 rounded-2xl bg-reassurance px-6 py-7 sm:grid-cols-2"><div className="flex items-start gap-3"><CreditCard className="mt-1 size-5 shrink-0" /><div><h2 className="font-semibold">Caution via Stripe</h2><p className="mt-1 text-sm text-muted-foreground">Débitée à l’envoi de la demande.</p></div></div><div className="flex items-start gap-3"><CheckCheck className="mt-1 size-5 shrink-0" /><div><h2 className="font-semibold">Annulation sans frais</h2><p className="mt-1 text-sm text-muted-foreground">Jusqu’à 48 h avant.</p></div></div></section>

    <Dialog.Root open={popup} onOpenChange={setPopup}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-background/85" /><Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-40px)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-popover p-8 shadow-floating"><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Fermer" className="absolute right-2 top-2"><X /></Button></Dialog.Close><Bike className="mb-4 size-10 text-explorer-accent" /><Dialog.Title className="text-2xl font-semibold">À bientôt sur les chemins</Dialog.Title><Dialog.Description className="mt-3 text-muted-foreground">Bordeaux & Gironde</Dialog.Description><Dialog.Close asChild><Button className="mt-6">Fermer</Button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
  </main>;
}