import { JourneyShell } from '@/components/booking-journey';

const h2 = 'mt-10 mb-3 text-xl font-bold';
const p = 'mt-3 leading-relaxed';
const ul = 'mt-3 list-disc space-y-1.5 pl-5 leading-relaxed';

export const contactEmail = 'contact@mini-vadrouille.fr';

export function LegalPage() {
 return <JourneyShell narrow>
  <h1 className="text-3xl font-bold">Conditions d'utilisation et confidentialité</h1>
  <p className={`${p} text-muted-foreground`}>Dernière mise à jour : octobre 2026.</p>

  <section id="cgu" aria-labelledby="cgu-titre" className="scroll-mt-6">
   <h2 id="cgu-titre" className={h2}>Conditions d'utilisation</h2>
   <h3 className="mt-6 font-semibold">Le service</h3>
   <p className={p}>Mini Vadrouille met en relation des familles : l'une loue un kit vélo qu'elle a déjà utilisé, l'autre le loue quelques jours pour partir avec son enfant. Mini Vadrouille n'est pas propriétaire des kits.</p>
   <h3 className="mt-6 font-semibold">Votre compte</h3>
   <p className={p}>Vous vous engagez à donner des informations exactes et à garder votre mot de passe pour vous. Un compte est nécessaire pour demander une réservation et utiliser l'aide à la compatibilité.</p>
   <h3 className="mt-6 font-semibold">Réserver un kit</h3>
   <ul className={ul}>
    <li>Une réservation est d'abord une <strong>demande</strong> : le loueur l'accepte ou la refuse. Sans réponse sous 24 h, la demande expire.</li>
    <li>Le prix affiché au moment de la demande est celui qui s'applique.</li>
    <li>Le paiement passe par la page de paiement de notre prestataire Stripe. Une caution est demandée et remboursée après l'état des lieux de retour.</li>
    <li>Le kit est remis en main propre, avec les conseils du loueur.</li>
   </ul>
   <h3 className="mt-6 font-semibold">Ce que le site ne remplace pas</h3>
   <p className={p}>Les listes de contrôle et les états des lieux reposent sur les déclarations des loueurs. Ils ne remplacent pas votre propre vérification du matériel avant le départ. Vous restez responsable de l'usage du kit et de la sécurité de votre enfant.</p>
   <h3 className="mt-6 font-semibold">L'aide à la compatibilité</h3>
   <p className={p}>La réponse est donnée par une intelligence artificielle, à titre informatif. Elle peut se tromper : confirmez toujours avec le loueur, dans le mot qui lui est destiné ou lors de la remise du kit. Ne saisissez ni nom ni coordonnées dans le champ de description.</p>
   <h3 className="mt-6 font-semibold">Droit applicable</h3>
   <p className={p}>Ces conditions sont soumises au droit français.</p>
  </section>

  <section id="confidentialite" aria-labelledby="confidentialite-titre" className="scroll-mt-6">
   <h2 id="confidentialite-titre" className={h2}>Politique de confidentialité</h2>
   <p className={p}>Mini Vadrouille SAS est responsable de vos données. Pour toute question ou demande, écrivez à <a href={`mailto:${contactEmail}`} className="font-semibold underline">{contactEmail}</a>.</p>
   <h3 className="mt-6 font-semibold">Les données que nous utilisons</h3>
   <ul className={ul}>
    <li><strong>Votre compte</strong> : e-mail, mot de passe (stocké chiffré, personne ne peut le lire), prénom et, si vous le souhaitez, ville.</li>
    <li><strong>Vos réservations</strong> : dates, montants, statut, message au loueur.</li>
    <li><strong>Votre paiement</strong> : traité par Stripe. Vos numéros de carte ne passent jamais par Mini Vadrouille.</li>
    <li><strong>Le texte décrivant votre vélo</strong>, si vous utilisez l'aide à la compatibilité : il est envoyé à notre prestataire d'intelligence artificielle pour obtenir la réponse, et nous ne le conservons pas.</li>
   </ul>
   <p className={p}>Nous ne collectons aucune donnée sur vos enfants. Seule la tranche d'âge du kit compte.</p>
   <h3 className="mt-6 font-semibold">À quoi elles servent</h3>
   <p className={p}>Uniquement à faire fonctionner le service : créer votre compte, gérer vos réservations, encaisser le paiement et répondre à vos questions. Nous ne vendons pas vos données et ne vous envoyons pas de publicité.</p>
   <h3 className="mt-6 font-semibold">Qui les reçoit</h3>
   <p className={p}>Nos prestataires techniques : Supabase (base de données et connexion), Stripe (paiement), Vercel (hébergement du site) et Groq (aide à la compatibilité, aux États-Unis, sans conservation de votre texte).</p>
   <h3 className="mt-6 font-semibold">Combien de temps</h3>
   <ul className={ul}>
    <li><strong>Compte et coordonnées</strong> : supprimés ou rendus anonymes dans le mois qui suit votre demande. Si une réservation est en cours ou si une caution n'est pas encore remboursée, la suppression attend la fin.</li>
    <li><strong>Avis</strong> : conservés sous la mention « Un parent vadrouilleur », sans ville ni détail qui permette de vous reconnaître.</li>
    <li><strong>Paiements</strong> (montants et références) : conservés 10 ans, comme la loi l'exige, avec un accès restreint et séparés de votre compte.</li>
    <li><strong>Photos d'état des lieux</strong> : gardées jusqu'à la fin d'un éventuel litige de caution, puis supprimées. Sans litige : 6 mois après le remboursement de la caution.</li>
    <li><strong>Compte inutilisé</strong> : supprimé après 3 ans sans connexion, après un e-mail pour vous prévenir.</li>
   </ul>
   <h3 className="mt-6 font-semibold">Vos droits</h3>
   <p className={p}>Vous pouvez demander à voir vos données, les corriger, les supprimer, en recevoir une copie ou vous opposer à leur usage. Pour supprimer votre compte, écrivez-nous : nous confirmons votre demande par e-mail, puis nous vous indiquons ce qui a été supprimé, ce qui est conservé, pourquoi et jusqu'à quand. Si vous n'êtes pas satisfait de notre réponse, vous pouvez saisir la CNIL (cnil.fr).</p>
   <h3 className="mt-6 font-semibold">Cookies</h3>
   <p className={p}>Mini Vadrouille n'utilise aucun traceur publicitaire ni outil de statistiques. Seule une donnée technique, nécessaire pour vous garder connecté, est enregistrée dans votre navigateur.</p>
  </section>
 </JourneyShell>;
}
