import { Link, useNavigate } from "@tanstack/react-router";
import { guideDownload } from "@/data/demo";
import { KitSearch } from "@/components/kit-search";
import { BadgeEuro, CalendarCheck, CalendarDays, Check, ClipboardCheck, CreditCard, Download, Navigation, Package, Search, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import hero from "@/assets/hero.jpg.asset.json";
import thomas from "@/assets/thomas.jpg.asset.json";
import step1 from "@/assets/step1.jpg.asset.json";
import step2 from "@/assets/step2.jpg.asset.json";
import step3 from "@/assets/step3.jpg.asset.json";



const left = [
  { icon: Package, title: "Rien à stocker", text: "Pas de cave, pas de garage, pas d'appartement de 200 m² ? Le kit repart chez son propriétaire après le voyage." },
  { icon: Users, title: "Fini les heures de comparatif", text: "Un kit complet choisi selon l'âge de votre enfant, avec le retour d'expérience d'un parent qui l'a déjà utilisé." },
  { icon: BadgeEuro, title: "Pas de gros budget avant d'avoir testé", text: "Vous payez les jours utilisés, sans acheter ni revendre à perte." },
];
const right = [
  { icon: ClipboardCheck, title: "Checklist sécurité et conseils du loueur", text: "Le loueur déclare l'état du matériel, vous montre comment l'atteler et partage ses astuces." },
  { icon: CreditCard, title: "Caution simple", text: "Débitée à l'envoi de la demande, remboursée sous 48 h après l'état des lieux de retour." },
  { icon: CalendarCheck, title: "Annulation sans frais jusqu'à 48 h avant", text: "Météo capricieuse, imprévu : vous n'êtes pas coincé." },
];

const kits = [
  { age: "De 9 à 18 mois", name: "Kit Petit Cocon", cls: "bg-cocoon border-cocoon-border", accent: "text-cocoon-accent", text: "Votre bébé tient bien assis. L'enjeu clé est le maintien de la nuque pendant la sieste et la protection contre le vent froid.", items: [["Remorque inclinable", "reine des siestes longues sur voie verte."], ["Siège arrière suspendu", "amortit les trottoirs sans équiper tout le vélo."], ["Protection pluie", "pour que bébé reste au sec même si le temps change en cours de route."]] },
  { age: "De 18 mois à 3 ans", name: "Kit Explorateur Curieux", cls: "bg-explorer border-explorer-border", accent: "text-explorer-accent", text: "Le bambin veut voir le paysage, découvrir les oiseaux et emmener son livre préféré. Le confort d'assise prime.", items: [["Siège avant", "idéal pour les trajets < 45 min et les échanges complices."], ["Remorque 2 places", "emmenez le copain ou la draisienne dans le coffre."], ["Pare-soleil", "évite les coups de chaud sur les sorties qui s'éternisent."]] },
  { age: "De 3 à 6 ans", name: "Kit Mini Baroudeur", cls: "bg-adventurer border-adventurer-border", accent: "text-adventurer-accent", text: "Il pédale sur son vélo mais fatigue après 8 kilomètres. La barre de traction ou le tandem est le sauveur de vacances.", items: [["Système Follow-Me", "pédale solo en forêt, tracté sur la route tranquille."], ["Vélo cargo longtail", "charge 2 grands enfants pour une sortie à la journée entre copains."], ["Gilet réfléchissant", "il roule par lui-même, on le repère de loin."]] },
];

const steps = [
  { title: "1. Avant le départ", img: step1, alt: "Parents préparant leur départ à vélo avec une remorque dans une cour pavée", bold: "Vous choisissez vos dates et un créneau de remise, puis vous envoyez votre demande et réglez en ligne. Le loueur répond sous 24 h. La caution est débitée en plus.", rest: ["Le loueur vous remet le kit en main propre, vous montre l'installation, et vous faites l'état des lieux photo ensemble.", "Téléchargez le guide du parent cycliste et vérifiez le matériel avec le loueur à la remise."] },
  { title: "2. Pendant le voyage", img: step2, alt: "Famille à vélo en pleine balade sur une piste côtière avec siège enfant et remorque", bold: "Suivez la checklist d'installation avant chaque sortie.", rest: ["Retrouvez le retour d'expérience du loueur sur chaque fiche et téléchargez le guide du parent cycliste."] },
  { title: "3. Au retour", img: step3, alt: "Nettoyage et vérification de la remorque vélo au retour dans une ruelle ancienne", bold: "Vous rendez le kit et refaites l'état des lieux photo ensemble.", rest: ["Nettoyage au choix : l'option sérénité (le loueur s'en occupe, frais fixés par lui) ou vous le rendez vous-même aussi propre que vous l'avez reçu.", "La caution est remboursée sous 48 h après l'état des lieux de retour."] },
];

const reviews = [
  { quote: "« Premier week-end sur la Véloscénie en vallée de Chevreuse. Le siège avant était parfait pour commenter le paysage avec notre petit, et le loueur Marc nous a montré comment l'installer en 5 minutes. »", name: "Julien & Léa", who: "Parents de Raphaël (14 mois)" },
  { quote: "« Boucle de 3 jours le long de la piste Roger Lapébie avec la remorque 2 places. Matériel très soigné, les petits ont fait leurs deux siestes dedans sans problème. »", name: "Mathilde", who: "Maman de Chloé (4 ans) et Tom (2 ans)" },
  { quote: "« Aller-retour Bordeaux-Lacanau avec le système Follow-Me. Dès que le vent de face devenait trop rude, on l'attachait en un clic. »", name: "Romain", who: "Papa d'Arthur (5 ans)" },
];



export function Home() {
  const navigate = useNavigate();
  return <main>
    <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-16">
      <div className="min-w-0">
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">L'aventure à vélo en famille, l'esprit tranquille.</h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">Louez un kit complet et prêt à rouler auprès de parents expérimentés : prêts à vadrouiller avec vos minis ?</p>
        <div id="criteres" className="scroll-mt-4"><KitSearch onSearch={c => navigate({ to: "/recherche", search: c })} /></div>
      </div>
      <figure className="min-w-0 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <img src={hero.url} alt="Famille à vélo avec une remorque enfant sur un chemin de dune" className="aspect-[4/3.6] w-full object-cover" />
        <figcaption className="flex items-center gap-3 px-4 py-3">
          <img src={thomas.url} alt="Portrait de Thomas, loueur, avec son casque de vélo" className="size-10 shrink-0 rounded-full object-cover" />
          <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="font-semibold">Thomas</span><Badge variant="outline" className="whitespace-nowrap">Vadrouilleur expert</Badge></div><p className="text-sm text-muted-foreground">Testé sur 3 voyages avec Léonie et Milo</p></div>
        </figcaption>
      </figure>
    </section>

    <section id="pourquoi" className="scroll-mt-4 border-t border-border px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1240px] rounded-3xl border border-border bg-reassurance/60 px-6 py-10 sm:px-12">
        <h2 className="text-3xl font-bold">La nouvelle façon de partir à vélo en famille</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          {[["Louer plutôt qu'acheter", left], ["Ce qui est prévu pour vous", right]].map(([title, list]) => <div key={title as string}>
            <h3 className="text-xl font-semibold">{title as string}</h3>
            <ul className="mt-6 space-y-6">{(list as typeof left).map(f => <li key={f.title} className="flex gap-3"><f.icon aria-hidden className="mt-0.5 size-5 shrink-0" /><div><p className="font-semibold">{f.title}</p><p className="mt-1 text-muted-foreground">{f.text}</p></div></li>)}</ul>
          </div>)}
        </div>
      </div>
    </section>

    <section id="comment-ca-marche" className="mx-auto max-w-[1280px] scroll-mt-4 px-5 pb-16 sm:px-8">
      <h2 className="text-center text-4xl font-bold">Comment ça marche</h2>
      <p className="mt-2 text-center text-2xl font-semibold">Un kit pour chaque âge</p>
      <div id="kits" className="mt-10 grid scroll-mt-4 gap-6 md:grid-cols-3">{kits.map(k => <article key={k.name} className={`flex flex-col rounded-3xl border p-6 ${k.cls}`}>
        <Badge variant="outline" className="self-start whitespace-nowrap">{k.age}</Badge>
        <h3 className="mt-5 text-xl font-bold">{k.name}</h3>
        <p className="mt-3 text-muted-foreground">{k.text}</p>
        <ul className="mt-5 flex-1 space-y-3">{k.items.map(([b, t]) => <li key={b} className="flex gap-2"><Check aria-hidden className={`mt-1 size-4 shrink-0 ${k.accent}`} /><span><strong className="font-semibold">{b} :</strong> {t}</span></li>)}</ul>
        <Button variant="outline" asChild className="mt-8 w-full justify-between"><a href={guideDownload.url} target="_blank" rel="noopener noreferrer"><span>Télécharger le guide (PDF)</span><Download /></a></Button>
      </article>)}</div>
    </section>

    <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
      <h2 className="text-center text-3xl font-bold">De la réservation au retour du kit, en 3 étapes</h2>
      <div className="mt-12 space-y-14">{steps.map((s, i) => <div key={s.title} className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div className={i % 2 ? "md:order-2" : ""}><h3 className="text-2xl font-bold">{s.title}</h3><p className="mt-4 font-semibold">{s.bold}</p>{s.rest.map(r => <p key={r} className="mt-3 text-muted-foreground">{r}</p>)}</div>
        <img src={s.img.url} alt={s.alt} loading="lazy" className={`aspect-[4/3] w-full rounded-3xl object-cover ${i % 2 ? "md:order-1" : ""}`} />
      </div>)}</div>
      <div className="mt-12 flex justify-center"><Button size="lg" asChild><Link to="/" hash="criteres"><Search />Trouver un kit</Link></Button></div>
    </section>

    <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8">
      <h2 className="text-center text-4xl font-bold">Avis de familles</h2>
      <p className="mt-3 text-center text-muted-foreground">Découvrez comment d'autres parents ont vécu leur première escapade à vélo.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{reviews.map(r => <figure key={r.name} className="flex flex-col rounded-3xl border border-border bg-reassurance/60 p-7">
        <div role="img" className="flex gap-1 text-adventurer-accent" aria-label="5 étoiles sur 5">{[0, 1, 2, 3, 4].map(n => <Star key={n} aria-hidden className="size-4 fill-current" />)}</div>
        <blockquote className="mt-5 flex-1 text-lg">{r.quote}</blockquote>
        <figcaption className="mt-6"><p className="font-semibold">{r.name}</p><p className="text-sm text-muted-foreground">{r.who}</p></figcaption>
      </figure>)}</div>
    </section>
  </main>;
}
