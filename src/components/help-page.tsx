import { Link } from '@tanstack/react-router';
import { JourneyShell } from '@/components/booking-journey';
import { contactEmail } from '@/components/legal-page';

const h2 = 'mt-10 mb-3 text-xl font-bold';
const p = 'mt-3 leading-relaxed';
const ol = 'mt-3 list-decimal space-y-2.5 pl-5 leading-relaxed';
const link = 'font-semibold underline rounded-sm focus-visible:outline-2 focus-visible:outline-ring';

export function HelpPage() {
 return <JourneyShell narrow>
  <h1 className="text-3xl font-bold">Guide d'utilisation</h1>
  <p className={`${p} text-muted-foreground`}>Louer un kit vélo pour votre famille, de la recherche à la remise du kit.</p>

  <h2 className={h2}>Ce que vous pouvez faire</h2>
  <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">
   <li>Chercher un kit selon votre ville, le nombre d'enfants et leur âge.</li>
   <li>Lire la fiche détaillée d'un kit : équipement, conseils du loueur, compatibilité.</li>
   <li>Vérifier avec votre vélo si le kit convient, grâce à l'aide à la compatibilité.</li>
   <li>Demander une réservation et suivre sa réponse dans « Mes réservations ».</li>
   <li>Télécharger le guide du parent cycliste (PDF) depuis le bas de page.</li>
  </ul>

  <h2 className={h2}>Pas à pas : réserver votre premier kit</h2>
  <ol className={ol}>
   <li><strong>Cherchez.</strong> Sur l'accueil, indiquez votre ville, le nombre d'enfants et leur âge, puis lancez la recherche.</li>
   <li><strong>Ouvrez la fiche</strong> du kit qui vous plaît : photos, contenu du kit, conseils du loueur, total pour vos dates.</li>
   <li><strong>Vérifiez la compatibilité</strong> avec votre vélo (facultatif). Connectez-vous, décrivez votre vélo en quelques mots, sans nom ni coordonnées. La réponse est informative : confirmez-la avec le loueur.</li>
   <li><strong>Créez votre compte</strong> ou connectez-vous, en acceptant les <Link to="/confidentialite" hash="cgu" className={link}>conditions d'utilisation</Link> et la <Link to="/confidentialite" hash="confidentialite" className={link}>politique de confidentialité</Link>.</li>
   <li><strong>Envoyez votre demande</strong> et payez sur la page de paiement de Stripe. Les montants sont affichés avant de valider : location, frais de service, caution, et l'option sérénité si vous la choisissez.</li>
   <li><strong>Attendez la réponse du loueur</strong>, au plus 24 h. Sans réponse, la demande expire et vous pouvez en faire une autre.</li>
   <li><strong>Suivez votre demande</strong> dans « Mes réservations » : le statut se met à jour tout seul, sans recharger la page.</li>
   <li><strong>Récupérez le kit en main propre</strong> au créneau prévu : le loueur vous transmet ses astuces et vous faites l'état des lieux ensemble.</li>
  </ol>

  <h2 className={h2}>Vos données et la suppression de votre compte</h2>
  <p className={p}>Pour savoir quelles données nous utilisons et combien de temps nous les gardons, lisez la <Link to="/confidentialite" hash="confidentialite" className={link}>politique de confidentialité</Link>. Pour corriger ou supprimer vos données, ou supprimer votre compte, écrivez à <a href={`mailto:${contactEmail}`} className={link}>{contactEmail}</a>. Votre demande est traitée sous un mois.</p>

  <h2 className={h2}>Une question ?</h2>
  <p className={p}>Écrivez-nous à <a href={`mailto:${contactEmail}`} className={link}>{contactEmail}</a>.</p>
 </JourneyShell>;
}
