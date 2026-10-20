import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-transparent.png.asset.json";
import { Button } from "@/components/ui/button";
import { guideDownload } from "@/data/demo";
import { supabase } from "@/integrations/supabase/client";
import { useSessionUser } from "@/hooks/use-session-user";

const navigation = [
  { label: "Trouver un kit vélo", hash: "criteres" },
  { label: "Comment ça marche", hash: "comment-ca-marche" },
  { label: "Pourquoi Mini Vadrouille ?", hash: "pourquoi" },
];
const navLink = "rounded-sm text-sm font-medium text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4";

function BecomeRenter() {
  return <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border-[1.5px] border-forest px-4 py-1.5 text-sm font-medium text-forest opacity-60">Devenir loueur<span className="whitespace-nowrap rounded-full bg-reassurance px-2 text-sm">Bientôt</span></span>;
}

export function Brand() {
  return <Link to="/" className="inline-flex shrink-0 items-center gap-2.5 rounded-md font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4" aria-label="Mini Vadrouille, accueil">
    <img src={logo.url} alt="" className="h-8 w-auto object-contain" />
    <span className="whitespace-nowrap text-lg">Mini Vadrouille</span>
  </Link>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSessionUser();
  const prenom = (user?.user_metadata?.['prenom'] as string | undefined)?.trim() || user?.email;
  const signOut = async () => { setOpen(false); await supabase.auth.signOut(); void navigate({ to: "/", replace: true }); };
  const account = user
    ? <span className="inline-flex shrink-0 items-center gap-2"><span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-primary-foreground">{(prenom ?? "?").charAt(0).toUpperCase()}</span><span className="max-w-40 truncate font-medium">{prenom}</span><Button variant="ghost" size="sm" onClick={() => void signOut()}>Se déconnecter</Button></span>
    : <Button variant="secondary" size="sm" asChild><Link to="/connexion" onClick={() => setOpen(false)}>Se connecter</Link></Button>;
  return <header className="border-b border-border bg-card">
    <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:px-8 xl:flex xl:gap-6 xl:px-10">
      <Brand />
      <nav aria-label="Navigation principale" className="hidden min-w-0 flex-1 items-center justify-center gap-6 xl:flex">
        {navigation.map(n => <Link key={n.hash} to="/" hash={n.hash} className={navLink}>{n.label}</Link>)}
        {user && <Link to="/mes-reservations" className={navLink}>Mes réservations</Link>}
      </nav>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden xl:inline-flex"><BecomeRenter /></span>
        <span className="hidden md:inline-flex">{account}</span>
        <Button variant="ghost" size="icon" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="mobile-navigation" className="xl:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Navigation mobile" className="flex flex-col items-start gap-4 border-t border-border px-5 py-4 xl:hidden">
      {navigation.map(n => <Link key={n.hash} to="/" hash={n.hash} onClick={() => setOpen(false)} className={navLink}>{n.label}</Link>)}
      {user && <Link to="/mes-reservations" onClick={() => setOpen(false)} className={navLink}>Mes réservations</Link>}
      <div className="flex flex-wrap items-center gap-3 py-2"><BecomeRenter />{account}</div>
    </nav>}
  </header>;
}

const footerLink = "rounded-sm text-sm leading-relaxed text-muted-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";
const kitLinks = ["Kit Petit Cocon (9–18 mois)", "Kit Explorateur Curieux (18 mois–3 ans)", "Kit Mini Baroudeur (3–6 ans)"];

function KitFooterLink({ label }: { label: string }) {
  return <Link
    to="/"
    hash="kits"
    onClick={e => {
      if (window.location.pathname === "/") {
        e.preventDefault();
        document.getElementById("kits")?.scrollIntoView({ behavior: "smooth" });
      }
    }}
    className={footerLink}
  >{label}</Link>;
}

export function SiteFooter() {
  return <footer className="border-t border-border">
    <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.15fr_1.3fr_1fr] lg:gap-8">
      <div><Brand /><p className="mt-4 max-w-64 text-sm leading-relaxed text-muted-foreground">La plateforme de location d’équipements vélo et outdoor entre familles citadines pour barouder l’esprit tranquille.</p></div>
      <div className="min-w-0"><h2 className="text-sm font-semibold">Guides vélo par âge</h2><ul className="mt-4 space-y-2.5">{kitLinks.map(label => <li key={label}><KitFooterLink label={label} /></li>)}<li><a href={guideDownload.url} download="Guide-du-parent-cycliste.pdf" className={footerLink}>Guide du parent cycliste <span className="whitespace-nowrap">(PDF)</span></a></li></ul></div>
      <div className="min-w-0"><h2 className="text-sm font-semibold">Confiance</h2><ul className="mt-4 space-y-2.5"><li><Link to="/" hash="pourquoi" className={footerLink}>Pourquoi Mini Vadrouille ?</Link></li></ul></div>
    </div>
    <div className="mx-auto flex max-w-[1280px] flex-col gap-3 border-t border-border px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-8"><p>© 2026 Mini Vadrouille SAS. Tous droits réservés.</p><p>Conçu avec soin pour les Mini Vadrouilleurs.</p></div>
  </footer>;
}