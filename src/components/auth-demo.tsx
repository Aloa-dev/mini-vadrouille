import { useState } from 'react';
import { Link, useNavigate, useRouter, useSearch } from '@tanstack/react-router';
import { safeRedirect } from '@/lib/stay';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { demoBooking, demoRenter } from '@/data/demo';
import { supabase } from '@/integrations/supabase/client';

function frenchError(message: string, register: boolean) {
  const m = message.toLowerCase();
  if (m.includes('already registered') || m.includes('already exists')) return 'Un compte existe déjà avec cette adresse e-mail. Connectez-vous.';
  if (m.includes('invalid login credentials')) return 'Adresse e-mail ou mot de passe incorrect.';
  if (m.includes('email not confirmed')) return 'Votre adresse e-mail n’est pas encore confirmée. Vérifiez votre boîte mail.';
  if (m.includes('password should be') || m.includes('weak')) return 'Le mot de passe doit contenir au moins 8 caractères.';
  if (m.includes('invalid') && m.includes('email')) return 'Adresse e-mail invalide.';
  if (m.includes('rate limit')) return 'Trop de tentatives. Réessayez dans quelques minutes.';
  return register ? `L’inscription a échoué : ${message}` : `La connexion a échoué : ${message}`;
}

export function AuthDemo({ register = false }: { register?: boolean }) {
  const navigate = useNavigate();
  const router = useRouter();
  const redirectTo = safeRedirect((useSearch({ strict: false }) as { redirect?: unknown }).redirect);
  const [visible, setVisible] = useState(false);
  const [age, setAge] = useState<string | null>(demoRenter.age);
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cgu, setCgu] = useState(false);
  const [cguError, setCguError] = useState('');
  const [checkMail, setCheckMail] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError('');
    setCguError('');
    if (register && !prenom.trim()) return setError('Veuillez renseigner votre prénom.');
    if (!email.trim()) return setError('Veuillez renseigner votre adresse e-mail.');
    if (!password) return setError('Veuillez renseigner votre mot de passe.');
    if (register && password.length < 8) return setError('Le mot de passe doit contenir au moins 8 caractères.');
    if (register && !cgu) return setCguError('Vous devez accepter les CGU pour créer votre compte.');
    setLoading(true);
    try {
      if (register) {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: window.location.origin + (redirectTo ?? ''), data: { prenom: prenom.trim() } } });
        if (error) return setError(frenchError(error.message, true));
        if (data.user && data.user.identities?.length === 0) return setError('Un compte existe déjà avec cette adresse e-mail. Connectez-vous.');
        if (!data.session) return setCheckMail(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) return setError(frenchError(error.message, false));
      }
      if (redirectTo) router.history.push(redirectTo); else void navigate({ to: '/' });
    } catch {
      setError('Le service est momentanément indisponible. Réessayez plus tard.');
    } finally { setLoading(false); }
  }

  return <main className="flex min-h-screen items-center justify-center px-4 py-12"><Card className="w-full max-w-[480px] p-5 sm:p-6">
    <nav aria-label="Connexion et inscription" className="mb-7 grid grid-cols-2 gap-1 rounded-xl bg-reassurance p-1.5">
      <Button variant={!register ? 'secondary' : 'ghost'} asChild className="min-w-0 rounded-lg px-2"><Link to="/connexion" search={{ redirect: redirectTo }} aria-current={!register ? 'page' : undefined}>Connexion</Link></Button>
      <Button variant={register ? 'secondary' : 'ghost'} asChild className="min-w-0 rounded-lg px-2"><Link to="/inscription" search={{ redirect: redirectTo }} aria-current={register ? 'page' : undefined}>Créer mon compte</Link></Button>
    </nav>
    <h1 className="text-center text-2xl font-bold">{register ? 'Bienvenue chez les Vadrouilleurs' : 'Bon retour parmi nous'}</h1>
    <p className="mt-2 text-center text-sm text-muted-foreground">{register ? 'Une minute suffit pour réserver votre premier kit.' : 'Connectez-vous pour retrouver vos réservations.'}</p>
    {checkMail ? <div role="status" className="mt-8 rounded-xl bg-reassurance p-5 text-center"><p className="text-lg font-semibold">Vérifiez votre boîte mail</p><p className="mt-2 text-sm text-muted-foreground">Nous vous avons envoyé un lien de confirmation à {email.trim()}. Cliquez dessus pour activer votre compte, puis connectez-vous.</p></div> :
    <form noValidate className="mt-8 space-y-4 sm:px-2" onSubmit={e => { e.preventDefault(); void submit(); }}>
      {register && <><div><label htmlFor="first-name" className="mb-1.5 block text-sm font-medium">Prénom</label><Input id="first-name" value={prenom} onChange={e => setPrenom(e.target.value)} autoComplete="given-name" /></div></>}
      <div><label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium">Adresse e-mail</label><Input id="auth-email" type="email" placeholder="vous@exemple.fr" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" /></div>
      <div><label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium">Mot de passe</label><div className="relative"><Input id="auth-password" type={visible ? 'text' : 'password'} placeholder={register ? 'Créer un mot de passe' : 'Votre mot de passe'} value={password} onChange={e => setPassword(e.target.value)} autoComplete={register ? 'new-password' : 'current-password'} className="pr-12" /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-0.5" aria-label="Afficher ou masquer le mot de passe" aria-pressed={visible} title="Afficher ou masquer le mot de passe" onClick={() => setVisible(!visible)}>{visible ? <EyeOff /> : <Eye />}</Button></div>{register && <p className="mt-1 text-sm text-muted-foreground">8 caractères minimum</p>}</div>
      {register ? <><div><label htmlFor="auth-city" className="mb-1.5 block text-sm font-medium">Ville (facultatif)</label><Input id="auth-city" defaultValue={demoRenter.city} /></div><fieldset><legend className="mb-2 text-sm font-medium">Âge de votre ou vos enfants (facultatif)</legend><div className="flex flex-wrap gap-2">{demoBooking.ages.map(value => <Button key={value} type="button" size="sm" variant={age === value ? 'selected' : 'ghost'} className={age === value ? 'px-3' : 'bg-reassurance px-3'} aria-pressed={age === value} onClick={() => setAge(age === value ? null : value)}>{value}</Button>)}</div></fieldset><div className="flex items-start gap-2.5 pt-2"><Checkbox id="auth-terms" checked={cgu} onCheckedChange={next => { const accepted = next === true; setCgu(accepted); if (accepted) setCguError(''); }} className="mt-0.5 rounded-sm border-forest data-[state=checked]:bg-forest" /><label htmlFor="auth-terms" className="text-sm text-muted-foreground">J'accepte les <a href="/confidentialite#cgu" target="_blank" rel="noopener noreferrer" className="rounded-sm underline focus-visible:outline-2 focus-visible:outline-ring">CGU</a> et la <a href="/confidentialite#confidentialite" target="_blank" rel="noopener noreferrer" className="rounded-sm underline focus-visible:outline-2 focus-visible:outline-ring">politique de confidentialité</a></label></div>{cguError && <p role="alert" className="text-sm font-medium text-destructive">{cguError}</p>}</> : <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2"><Checkbox id="remember" className="rounded-sm border-forest data-[state=checked]:bg-forest" /><label htmlFor="remember" className="text-sm">Se souvenir de moi sur cet appareil</label></div><Button type="button" variant="ghost" disabled className="h-auto px-0 text-sm disabled:opacity-100">Mot de passe oublié ?</Button></div>}
      {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
      <Button type="submit" variant="secondary" className="w-full" disabled={loading}>{register ? 'Créer mon compte' : 'Se connecter'}</Button>
      <p className="pt-3 text-center text-sm text-muted-foreground">{register ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}<Link to={register ? '/connexion' : '/inscription'} search={{ redirect: redirectTo }} className="rounded-sm font-semibold text-foreground underline focus-visible:outline-2 focus-visible:outline-ring">{register ? 'Se connecter' : 'Créer mon compte'}</Link></p>
    </form>}
  </Card></main>;
}
