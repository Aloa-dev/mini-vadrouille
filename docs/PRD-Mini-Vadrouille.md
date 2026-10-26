# PRD — Mini Vadrouille

Oct 26, 2026 · @Aloa

## 1. Contexte et problème

**Formation.** Vibe coding, 6 semaines, stack imposée Lovable + Supabase + Stripe / Stripe Connect. Sujet imposé : e-commerce / marketplace avec paiement (stock, interfaces client/vendeur/admin, Stripe Connect, confirmations automatisées). Soutenance devant jury le 27 octobre 2026 à 14 h — l'essentiel jugé est la démarche produit, pas les démarches admin réelles (INPI, interviews exhaustives...).

**Le contexte.** Partir à vélo avec un jeune enfant (0 à \~6 ans) demande un équipement spécifique : remorque, attelage compatible, sacoches, parfois tente. Ce matériel est cher, encombrant, et ne sert que quelques années — l'enfant devient trop grand pour la remorque vers 4-5 ans. Beaucoup de parents équipés le laissent ensuite dormir au garage.

**Le problème.** Les parents qui préparent un premier voyage à vélo ne savent pas quel matériel choisir, n'ont souvent pas la place de le stocker en ville, et hésitent à acheter puis revendre à perte pour une expérience jamais testée. Certains renoncent. Côté offre, les parents équipés n'ont pas de moyen simple de rentabiliser un matériel qu'ils n'utilisent plus.

**Statut du document.** Version vivante. Les personas sont simulés, signaux surtout issus de blogs et de forums. Les interviews parents doivent confirmer ou corriger ce PRD.

## 2. Proposition de valeur et différenciation

**Version courte.** Pour les parents urbains qui préparent leur premier voyage à vélo avec un enfant de moins de 6 ans, qui ne savent pas quel matériel choisir et n'ont pas la place de le stocker, Mini Vadrouille est une marketplace de location entre particuliers qui permet de louer près de chez eux, pour quelques jours, un kit complet adapté à l'âge de leur enfant.

**Version longue.** Contrairement à l'achat d'occasion, où il faut choisir seul puis revendre, et à Bikup, pensé pour les cyclistes adultes, chaque kit arrive avec le retour d'expérience du parent qui l'a utilisé et une checklist sécurité conçue par une ancienne technicienne cycles.

**Concurrence**

- Vrai concurrent : l'achat-revente d'occasion (Leboncoin). Coût réel estimé à \~100-150 € de décote, pas 500 €.
- Bikup : location de matériel de voyage à vélo entre particuliers, généraliste cyclistes adultes. Son argument « tester avant d'acheter » ne nous différencie pas.
- Loueurs pros sur place (ex. Beach Bikes) : remorques en location, tarifs dégressifs. Ils gagnent quand la famille part en train.
- Location de puériculture (Kidlou, Baby On A Trip…) : pour des séjours, pas pour l'itinérance à vélo.

**Différenciation retenue**

1. Kits complets pensés par âge.
2. Retour d'expérience structuré du parent loueur, visible dès le catalogue.
3. Checklist sécurité et état des lieux photo, toujours présentés comme un « contrôle déclaratif », jamais « garanti sûr ».
4. Remise en main propre, où le loueur transmet ses conseils.

**Contre-signal à garder en tête** : les remorques ne passent pas dans les trains — cible réaliste = familles qui partent de chez elles à vélo ou en voiture.

## 3. Personas (simulés, à confirmer en interview)

**Chloé, 33 ans — locataire ⭐ principal.** Infirmière, appartement en ville sans cave, une fille de 2 ans.

- Citation : « Je ne vais pas acheter 500 € de matos pour découvrir que ma fille déteste ça. »
- Objectifs : réussir un premier week-end à vélo en famille, partir sans y passer ses soirées, ne rien stocker chez elle.
- Frustrations : ne sait pas quoi choisir, aucune place pour ranger, peur que le matériel ne soit pas sûr.
- Attentes : un kit complet adapté à l'âge de sa fille, près de chez elle, avec des conseils de parent.
- Critère de réussite : revenir du week-end avec l'envie de repartir, sans galère de matériel.
- Signaux gênants : « Si on part en train, je louerai sur place. » / « Je ne veux pas traverser Bordeaux pour récupérer le kit. »

**Thomas, 41 ans — loueur.** Technicien, maison en périphérie, deux enfants, Léonie (2 ans) et Milo (4 ans).

- Citation : « Je préfère qu'elle roule plutôt qu'elle prenne la poussière, mais pas à n'importe quel prix. »
- Objectifs : rentabiliser son matériel, aider d'autres familles à partir, ne pas perdre son temps.
- Frustrations : revente à perte sur Leboncoin, peur de la casse, administratif et coordination.
- Attentes : paiement et caution gérés, état des lieux qui le protège, calendrier simple.
- Critère de réussite : louer plusieurs fois par saison sans litige.
- Signal gênant : « Si c'est pour 20 € et deux heures de mon samedi, non. »

**Inès, 29 ans — admin.** Responsable des opérations de la plateforme.

- Citation : « Sans photos datées, je ne peux pas trancher un litige. »
- Objectifs : garder des annonces fiables, arbitrer vite les cautions, suivre les commissions.
- Frustrations : annonces incomplètes, litiges sans preuve, pas de vue d'ensemble des locations en cours.
- Attentes : file de validation, historique des états des lieux, tableau de bord.
- Critère de réussite : chaque litige tranché en moins de 48 h, preuves à l'appui.

**Conflit entre personas.** Thomas veut un bon prix, Chloé compare avec l'achat d'occasion. Chloé est la persona principale → arbitrage par un tarif dégressif sur les locations longues.

**Remise du kit.** En main propre (pas de boîte à clés façon Airbnb) : créneau choisi à la réservation, transmission de vive voix des conseils et du montage, état des lieux photo fait ensemble au départ et au retour. Option sérénité (nettoyage du kit par le loueur, 12 € en démo). Limite assumée : caler un horaire à deux crée de la friction ; une option sans rencontre pourra venir plus tard.

## 4. Objectifs SMART (brouillon)

**Objectif 1.** Permettre à un parent de trouver et réserver un kit adapté à l'âge de son enfant en moins de 15 minutes, sans poser de question sur le matériel — démontré en live à la soutenance (27 octobre 2026).

**Objectif 2.** Permettre à un loueur de publier un kit complet, checklist sécurité comprise, en moins de 20 minutes — démontré en live à la soutenance.

**Objectif 3.** Permettre à l'admin de trancher un litige de caution en moins de 48 h grâce aux états des lieux photo datés, avant et après location.

## 5. Périmètre MVP

**MUST (V1)**

- Recherche de kits avec filtres (localisation, dates, âge, nombre d'enfants)
- Calendrier de disponibilité et statut d'objet (disponible / en réparation ; « réservé » et « en location » se déduisent des réservations)
- Réservation, paiement avec commission (Stripe Connect), caution (encaissement + remboursement manuel)
- Checklist sécurité (dont conformité EN 15918 déclarative) à la publication + état des lieux photo
- Fiche retour d'expérience du loueur (teaser + récit complet) — 🔴 passée en critique le 24/09
- Créneau de remise en main propre
- E-mails automatiques (réservation, rappel la veille, demande d'avis) — prévus mais non codés en V1 : les pages « demande envoyée » et « demande acceptée » en tiennent lieu (voir section 13)
- Avis dans les deux sens
- Tableau de bord admin (validation, réservations, cautions, commissions) — hors démo, non codé ; la vue dynamique exigée par la grille du jury (C5) est « Mes réservations » en temps réel (Supabase Realtime, testé en production le 23/10)
- Option sérénité (nettoyage du kit par le loueur, 12 € en démo)
- Connexion / inscription (email + mot de passe) — nécessaire pour réserver, payer et laisser un avis, ajoutée le 25/09

**SHOULD (si le temps)**

- File de validation admin (renforcée)
- Tarif dégressif sur les locations longues

**WON'T (hors V1) — et pourquoi**

- Questionnaire multi-écrans (camping, destination, vélos possédés…) — réutilise les mêmes critères que les filtres V1, pas urgent
- Messagerie entre utilisateurs — coûteuse à construire, les pages de l'appli (demande envoyée, demande acceptée) + créneau de remise suffisent
- Assurance — complexe juridiquement, hors du temps de la formation
- Litiges automatisés — l'admin arbitre à la main en V1
- Fiche enrichie (itinéraire structuré, difficulté, photos du trajet) — le teaser + récit simple suffit pour démontrer la différenciation
- Option de remise sans rencontre — contraire au positionnement, à envisager si des loueurs la demandent
- Compatibilité vélo-remorque automatique et affirmative — remplacée en V1 par une réponse informative de l'IA, à confirmer avec le loueur
- Badge « Vérifié par un pro » — nécessite un process de vérification réel
- Carte interactive — le filtre par localisation suffit pour la démo
- Autorisation Stripe prolongée (jusqu'à 30 jours) — piste V2

**Champs requis par kit en base de données** (pour que les filtres fonctionnent) : âge min/max, nombre de places, localisation, calendrier de disponibilité.

**Découpage en pages pour la démo locataire** (mis à jour le 12/10 : 9 écrans Stitch, parcours de Chloé uniquement)

1. Accueil — filtres (localisation, dates, âge, nombre d'enfants)
2. Résultats — kits avec photo, prix et teaser du retour d'expérience sous la photo
3. Fiche kit — photos, calendrier, prix, récit complet du retour d'expérience, conseil pratique, checklist sécurité (lecture seule)
4. Paiement — dates, créneau de remise, option sérénité, paiement et caution (débités à l'envoi de la demande)
5. Demande envoyée — en attente de la réponse du loueur (24 h)
6. Thomas a accepté — confirmation, créneau de remise, coordonnées révélées
7. Mes réservations
8. Connexion
9. Inscription

Les e-mails automatiques (confirmation, rappel, demande d'avis) ne sont pas une page — ce sont des notifications backend.

## 6. Spécifications fonctionnelles des features critiques

**Recherche de kits.** Filtres : localisation, dates, âge de l'enfant, nombre d'enfants + bouton « Rechercher » (pas de questionnaire multi-écrans en V1). Résultats affichés avec photo, prix, et teaser du retour d'expérience directement sous la photo — la différenciation doit être visible dès le catalogue, pas seulement en fiche détaillée.

**Réservation & paiement.** Calendrier de disponibilité, statut d'objet (disponible / en réparation ; « réservé » et « en location » se déduisent des réservations), paiement via Stripe Connect (commission plateforme + reversement au loueur), caution en encaissement puis remboursement manuel après l'état des lieux de retour (voir section 8).

**Fiche retour d'expérience du loueur** — fonctionnalité critique (passée de « important » à « critique » le 24/09), c'est la vraie différenciation face à Bikup. Champs remplis à la publication :

- Teaser (obligatoire, \~150 caractères), affiché sous la photo dans les résultats de recherche. Ex. « On a utilisé ce kit pour un trip de 3 jours avec notre fille de 3 ans. C'était extra ! »
- Récit complet (obligatoire) : destination, durée, âge(s) de l'enfant, ce qui a bien marché, ce qu'ils referaient différemment. Affiché sur la fiche kit détaillée.
- Conseil pratique (optionnel, une ligne).
- Champ « Parcours conseillé » écarté : risque de laisser croire que le kit est lié à un itinéraire précis. Le lieu peut être mentionné dans le récit libre, sans champ dédié.
- V1 : teaser + fiche complète simple. V2 (hors scope) : itinéraire structuré, difficulté, photos du trajet.

**Checklist sécurité.** À la publication de l'annonce, checklist déclarative incluant la conformité EN 15918 (norme européenne « Cycles — Remorques pour cycles — Exigences de sécurité et méthodes d'essai » : stabilité, structure, attelage, visibilité). Toujours présentée comme un contrôle déclaratif, jamais comme une garantie.

**État des lieux photo.** Fait ensemble par loueur et locataire, au départ et au retour, sur le créneau de remise en main propre. Sert de preuve en cas de litige de caution.

**E-mails automatiques.** Prévus : confirmation de réservation, rappel la veille, demande d'avis après la location. Non codés en V1 (voir section 13).

**Avis.** Dans les deux sens (locataire → loueur, loueur → locataire).

**Tableau de bord admin.** Validation des annonces et des loueurs, suivi des réservations, arbitrage des cautions (via état des lieux photo), vue sur les commissions.

## 7. Modèle de données et architecture

**Règle d'architecture.** La base de données vit dans Supabase, séparée de l'outil de build (Lovable). Stack imposée par la formation : Lovable + Supabase + Stripe / Stripe Connect.

**Champs requis par kit** (pour que les filtres de recherche fonctionnent) : âge min/max, nombre de places, localisation, calendrier de disponibilité.

**Statuts d'objet à modéliser** : disponible / en réparation (stocké sur le kit). « Réservé » et « en location » se déduisent des réservations.

**Rôles à modéliser** :

- Client / locataire : parent débutant qui loue un kit
- Vendeur / loueur : parent expérimenté qui loue son matériel et partage ses conseils
- Admin : valide les annonces et les loueurs, suit les réservations, arbitre les cautions, voit les commissions

**Stock** : géré par un calendrier de disponibilité.

**Stack retenue** : Stitch (maquettage), Lovable (build), Supabase (base de données), VS Code (éditeur de code) ; paiement via Stripe / Stripe Connect. Grille de stack faite.

## 8. Paiement, Stripe Connect et caution

**Principe.** Le locataire paie, la plateforme garde sa commission, le reste est reversé au loueur via Stripe Connect. Caution en plus.

**Décision caution (vérifiée le 24/09).** Une pré-autorisation Stripe ne tient que 7 jours maximum, libérée automatiquement au-delà si non encaissée — risque réel pour une location d'une semaine avec état des lieux au retour. Décision retenue : **encaissement puis remboursement manuel** après l'état des lieux de retour.

- Frein assumé côté locataire : l'argent sort réellement de son compte pendant la location, à expliquer clairement dans le parcours.
- Piste V2 (hors scope) : autorisation prolongée, jusqu'à 30 jours selon réseau de carte — plus complexe techniquement, non retenue pour la démo.

## 9. Risques et mitigations

| Risque | Probabilité | Impact | Mitigation |
| --- | --- | --- | --- |
| Caution bloquée seulement 7 jours par Stripe, trop court pour une location d'une semaine avec état des lieux au retour | Confirmée | Fort | Encaissement + remboursement manuel en V1 (décidé le 24/09) ; autorisation prolongée en piste V2 |
| Saisonnalité : les loueurs actifs veulent leur matériel l'été, au pic de demande | Forte | Fort | Recruter des parents dont l'enfant a grandi ; élargir aux autres activités après la formation |
| Densité locale de loueurs trop faible au lancement | Forte | Fort | Démarrer sur une seule ville (Bordeaux) ; recruter des loueurs l'hiver |
| Familles qui partent en train louent sur place chez un pro | Moyenne | Moyen | Cibler les départs depuis chez soi à vélo ou en voiture ; vérifier en interview |
| Tension de prix entre loueur et locataire | Forte | Moyen | Tarif dégressif ; option sérénité (nettoyage) facturée séparément du prix journalier |
| Sécurité enfant et responsabilité en cas de matériel abîmé | Faible | Fort | Checklist et état des lieux photo en « contrôle déclaratif », jamais « garanti sûr » ; conformité EN 15918 déclarative |

**Autres points à trancher / vérifier**

- Norme EN 15918 — confirmée : « Cycles — Remorques pour cycles — Exigences de sécurité et méthodes d'essai », couvre stabilité, structure, attelage, visibilité. Intégrée à la checklist sécurité en case à cocher déclarative.

**Rappel de cadrage.** Projet de formation, pas un vrai lancement — le jury évalue la démarche produit, pas la pousse à fond des démarches admin réelles (INPI, interviews exhaustives...).

## 10. Métriques de succès et plan de démo

**Avant de coder.** Non réalisé : projet de formation, les interviews parents ne sont pas faites. Les hypothèses H1 à H3 restent des hypothèses.

**Démo (soutenance du 27 octobre 2026, 14 h).** Parcours de la locataire (Chloé) en live : recherche par âge → fiche kit → paiement avec caution → demande envoyée → demande acceptée par Thomas (réponse simulée) → mes réservations. L'état des lieux et l'avis ne sont pas montrés. C'est l'objectif 1 qui est montré au jury.

**Vraie vie (au-delà de la formation).** Des loueurs publient sans qu'on les supplie, des locataires reviennent ou recommandent, peu de litiges de caution. Seuils chiffrés encore à fixer.

**Ce que montre la démo par rapport à la proposition de valeur** : la version courte de la proposition de valeur (section 2), l'objectif 1 (un parent trouve et réserve en moins de 15 minutes), et l'outil retenu (Lovable, imposé par la formation).

**Hypothèses à valider** :

- H1 (problème, la plus risquée) : les parents urbains hésitent à acheter faute de place et de certitude, et préféreraient louer. Validation : sur 5 parents interrogés, au moins 3 racontent avoir renoncé, emprunté ou regretté un achat, et disent qu'ils auraient loué.
- H2 (solution) : ces parents ont besoin de kits filtrés par âge, avec retour d'expérience du loueur, pour choisir sans comparer pendant des heures. Validation : un parent choisit et réserve un kit en moins de 15 minutes sans poser de question sur le matériel.
- H3 (offre) : les parents équipés mettraient leur kit en location si la plateforme gère paiement, caution et état des lieux. Validation : sur 5 parents équipés contactés, au moins 2 acceptent de publier une annonce.

**Priorisation impact/effort** : H1 impact fort / effort faible (interviews, pas de code) → à tester en premier. H2 impact fort / effort faible à moyen → dans le MVP. H3 impact fort / effort élevé (Stripe Connect, caution) → dans le MVP car le paiement est imposé par le sujet.

**Reste à faire avant de rédiger la suite du PRD** :

- Interviews parents : non prévues (projet de formation)
- Grille de stack : faite (Stitch, Lovable, Supabase, VS Code)

## 11. Décisions du 9 octobre 2026 (refinement et design)

Ces décisions complètent les sections précédentes et remplacent tout passage contradictoire.

**Parcours de réservation**

- Réservation soumise à validation du loueur : le total et la caution sont débités à l'envoi de la demande. Sans réponse sous 24 h : refus automatique et remboursement intégral (en pratique, la demande passe automatiquement en « expirée » ; le remboursement n'est pas codé, voir section 13).
- Statuts de réservation : en attente, acceptée, refusée/expirée, annulée (par le locataire ou par le loueur). Une demande en attente grise les dates dans le calendrier (non codé en V1 : la recherche ne filtre pas par dates, voir section 13).
- Minimum 3 jours entre la demande et le départ : les dates trop proches sont grisées, avec une phrase d'explication.
- Prix figé au moment de la demande. Le loueur ne peut pas retirer un kit tant qu'une réservation est en cours ou acceptée.
- Annonces relues par l'admin avant publication (statut « en attente de relecture »). Relecture manuelle en V1, assistée par IA plus tard.
- Adresse exacte et coordonnées révélées seulement après paiement et acceptation du loueur. Avant, seule la ville ou le quartier est visible.
- Seul le parcours « acceptée » est soigné pour la démo.

**Prix, caution et annulation**

- Prix démo : 3 jours × 22 € = 66 €, frais de service 10 % (6,60 €), option sérénité 12 € (nettoyage par le loueur), caution 150 €. Total : 222,60 € sans option, 234,60 € avec.
- Caution remboursée sous 48 h après l'état des lieux de retour (encaissement puis remboursement manuel).
- Démo : du mer. 19 au ven. 21 mai 2027, annulation sans frais jusqu'au lun. 17 mai 18 h 30. Sur les pages générales : « 48 h avant ».
- Annulation par le loueur : remboursement automatique, trace visible sur l'historique du kit, kit remis en relecture après 2 annulations dans l'année, exception pour motif légitime levée par l'admin. Pas de frais financiers en V1 (piste V2).
- Stripe Connect en mode test. Les clés secrètes restent côté Supabase (Edge Functions), jamais dans le front.

**Kits et âge**

- 3 kits : Petit Cocon (9-18 mois), Explorateur Curieux (18 mois-3 ans), Mini Baroudeur (3-6 ans). Un kit = une tranche d'âge. En base, l'âge est stocké en mois : 9 à 17, 18 à 35, 36 à 72 (bornes incluses, sans chevauchement : un enfant de 17 mois relève du Petit Cocon, à 18 mois de l'Explorateur Curieux).
- Deux enfants d'âges différents : un kit par enfant en V1, kits combinés en V2. « 1 ou 2 enfants » = nombre de places de la remorque (filtre).
- Charge max 45 kg (2 × 20 kg + 5 kg de bagages). Stock géré par calendrier.
- Page résultats sans âge présélectionné. Aucun kit pour un enfant de moins de 9 mois.
- Aucune donnée sur l'enfant (ni prénom ni date de naissance), seulement la tranche d'âge.
- Statuts d'objet : 2 statuts stockés sur le kit (disponible, en réparation). « Réservé » et « en location » se déduisent des réservations.

**Design, vocabulaire et build**

- Démo = uniquement le parcours de la locataire (Chloé). Pas d'écrans loueur ni admin.
- Design de référence : « Warm Family Outdoors » (Outfit, vert forêt #12403C, crème #FAF8F5, bordures #E6E1D8). Bouton principal en orange brûlé #C4501B (survol #AD4516), plus en corail. Thème clair uniquement. Desktop-first, 14 px minimum.
- Vocabulaire : « avis » pour le locataire, « retour d'expérience » pour le loueur. Tout est déclaratif. Mots bannis dans l'interface : garanti, garanties, assurance, certifié, protégé, sécurisé. Casque obligatoire pour les moins de 12 ans (décret 2016-1828).
- Stack de build : TanStack Start (sur Vite), React 19, TypeScript, Tailwind 4, Supabase, déployé sur Vercel. Corrigé le 21/10 : le projet n'utilise pas React Router.

## 12. RGPD

- Suppression de compte : compte et coordonnées supprimés ou anonymisés dans le mois qui suit la demande. Mise en attente tant qu'une réservation est en cours ou qu'une caution n'est pas remboursée.
- Avis conservé, affiché sous le libellé « Un parent vadrouilleur », sans ville ni détail identifiant.
- Paiements : montants et références archivés 10 ans (Code de commerce), à accès restreint, séparés du compte.
- Photos d'état des lieux : gardées jusqu'à la fin d'un éventuel litige de caution, puis supprimées. Sans litige : 6 mois après le remboursement de la caution.
- Compte dormant : supprimé après 3 ans sans connexion, avec e-mail d'avertissement avant.
- Deux e-mails à la personne : confirmation de sa demande de suppression, puis bilan (ce qui est supprimé, ce qui est gardé, pourquoi, jusqu'à quand, contact en cas d'erreur).
- Les durées de 6 mois et de 3 ans sont des choix du projet, à justifier. Seule la durée de 10 ans vient d'une obligation légale.

## 13. Base de données Supabase (état au 26 octobre 2026)

Cette section décrit la base telle qu'elle est construite. Elle complète la section 7.

**Structure.** 8 tables : profils, kits, adresses\_kits, photos\_kits, dates\_bloquees, reservations, avis, demandes\_suppression. Prix en euros (NUMERIC), dates en TIMESTAMPTZ, listes fermées en ENUM. Aucune donnée sur l'enfant, seulement la tranche d'âge du kit.

**Règles portées par la base**

- Un kit = une tranche d'âge. L'âge min et max en mois est verrouillé avec la tranche (9-17, 18-35, 36-72).
- Deux réservations actives (en attente ou acceptée) ne peuvent pas se chevaucher sur un même kit.
- Réservation au minimum 3 jours avant le départ.
- Les prix sont copiés dans la réservation au moment de la demande et ne changent plus : location, frais de service 10 %, option sérénité, caution, total.
- L'adresse exacte est dans une table à part, jamais publique.
- Le rôle « vendeur » en base correspond au « loueur » affiché à l'écran.
- Statut d'objet : 2 états stockés sur le kit (disponible, en réparation). « Réservé » et « en location » se déduisent des réservations.

**Sécurité (RLS).** Activée sur les 8 tables. Policies existantes : lecture publique des kits publiés, un loueur lit ses propres kits, lecture publique des photos des kits publiés, chacun lit son propre profil, un locataire lit ses propres réservations. Les autres tables sont fermées depuis le site. Aucune règle d'écriture côté navigateur, voulu. Policies à écrire : adresse après acceptation, admin, avis. Les réservations et les paiements passeront par des Edge Functions, jamais directement par le navigateur.

**Qui voit quoi (RLS).** Récap par table : visiteur (non connecté), connecté, serveur (Edge Functions, service\_role).

| Table | Visiteur | Connecté | Serveur | Règle |
| --- | --- | --- | --- | --- |
| kits | lit | lit | tout | Lecture des kits **publiés** par tous. Un loueur connecté lit aussi les siens |
| photos\_kits | lit | lit | tout | Photos lisibles seulement si le kit est publié (vide pour la démo) |
| profils | rien | lit **sa** ligne | tout | `id = auth.uid()` |
| reservations | rien | lit **les siennes** | tout | `locataire_id = auth.uid()` |
| adresses\_kits | rien | rien | tout | Fermée : l'adresse exacte sort seulement après paiement et acceptation, via le serveur |
| dates\_bloquees | rien | rien | tout | Fermée |
| avis | rien | rien | tout | Fermée (non montrés au jury) |
| demandes\_suppression | rien | rien | tout | Fermée (preuve RGPD, gérée côté serveur) |

**Limites connues (RLS).** Aucune écriture depuis le navigateur : tout passe par les Edge Functions. Deux locations actives ne peuvent pas se chevaucher sur le même kit (contrainte d'exclusion). Les réservations des autres ne sont pas lisibles, donc les dates ne filtrent pas la recherche. Pas encore écrit : règles admin, lecture par le loueur des réservations de ses kits, adresse après acceptation, avis. Les prénoms des loueurs sont écrits en dur dans Lovable. Vérifié le 25/10 sur le vrai projet : la RLS est activée sur les 8 tables et les cinq politiques correspondent à ce tableau ; un visiteur non connecté ne lit ni les réservations ni les profils (listes vides) et les tables fermées refusent l'accès ; un second compte connecté voit une liste de réservations vide alors que Chloé voit la sienne.

**Données de démonstration.** 4 annonces publiées, avec 4 loueurs fictifs : Thomas (Explorateur Curieux, Place Pey-Berland), Sophie (Petit Cocon, Chartrons), Camille (Mini Baroudeur, Bastide) et Claire (Explorateur Curieux, Mérignac). Depuis le 19/10, la recherche filtre par ville, âge et nombre d'enfants (pas par dates) : sur « Bordeaux », 3 annonces s'affichent, celle de Claire étant à Mérignac. Les 4 fiches ont les mêmes sections détaillées, volontairement ; en démo, seule la fiche de Thomas est ouverte. Les photos sont des images du dépôt (public/images), la table photos\_kits reste vide ; les avis affichés sont fictifs. Les réservations de test ont été supprimées de la base le 25/10, avant les répétitions.

**Règles de suppression en base**

- Règles de suppression : kits, réservations et profils liés = RESTRICT (suppression refusée) ; adresses, photos et dates bloquées suivent le kit (CASCADE) ; l'auteur d'un avis est vidé à la suppression de son compte (SET NULL).

**Paiement (état au 17 octobre 2026).** Une Edge Function Supabase, « creer-reservation-paiement », identifie la locataire, relit le prix du kit dans la base, recalcule tous les montants (jamais ceux envoyés par la page), crée la réservation en attente puis renvoie l'adresse d'une page de paiement hébergée par Stripe. Paiement indirect : la locataire paie la plateforme, qui garde les frais de service et la caution (frais + 150 €) et transfère la location et l'option sérénité au loueur. Stripe en mode test uniquement. Pas de webhook : la réservation existe dès la demande, même si le paiement n'est pas terminé. Choix assumé (23/10) : la grille C3 accepte « API tierce, base Supabase ou webhook ». Remboursement de la caution, annulation et refus automatique à 24 h : décrits dans ce document, pas codés.

**Limites connues.** Frais Stripe pris en charge par la plateforme (7,43 € de frais pour 6 € de frais de service sur un paiement test de 228 €). Tous les paiements de test vont au même compte connecté de test (Thomas). La demande acceptée est simulée à la main dans Supabase.

**Suppression de compte (choix du 14/10).** On anonymise le profil puis on désactive la connexion, on n'efface jamais : le compte ne peut pas être supprimé tant qu'un profil y est relié (RESTRICT).

**Fonctionnalité IA (compatibilité du vélo).** Sur la fiche kit, la locataire écrit le modèle ou la description de son vélo (axe, freins, porte-bagages, potence). L'IA compare avec les exigences du kit (champ compatibilite) et répond de façon informative, sans jamais affirmer : « d'après la fiche, cela semble convenir, à confirmer avec le loueur à la remise ». Si une information manque, elle pose la question au lieu de deviner. Pas de photo en V1. Connexion exigée avant l'appel, clé API dans les Secrets Supabase, appel via Edge Function, états de chargement et d'erreur visibles. Seules les données utiles sont envoyées (texte du vélo, nom et compatibilité du kit). Fournisseur retenu le 22/10 : Groq (plan gratuit sans carte, modèle ouvert openai/gpt-oss-120b). Fonction construite, déployée et testée en production le 22/10 : connexion obligatoire (protège l'API contre les abus), texte limité à 500 caractères, délai de 20 s, CORS restreint au site, fiche de compatibilité écrite pour le kit de Thomas seulement (pour les autres kits, l'IA n'est pas appelée et la réponse est « information non disponible, à voir avec le loueur »). La réponse renvoie vers le « mot pour le loueur » de la demande ou vers la remise du kit, jamais vers une messagerie (hors V1). Limites : société américaine ; la console de Groq indiquait une conservation possible des entrées et sorties jusqu'à 30 jours, option désactivée par Aloa le 22/10 (« ZDR » activé, capture conservée), mais les données transitent toujours par des serveurs américains et des métadonnées d'usage subsistent. La fonction n'envoie que le nom du kit, la fiche et le texte du vélo, ne journalise jamais le texte saisi, et il n'y a pas de quota par utilisateur sur l'IA.

**Automatisation (en place et prouvée).** Une tâche planifiée dans Supabase (pg\_cron, « expirer-demandes-sans-reponse », chaque heure pile) passe en « expirée » les demandes en attente dont le délai de réponse de 24 h est dépassé. Mise en place le 21/10 ; exécution prouvée le 22/10 (statut « succeeded » toutes les heures de 04 h à 08 h UTC, aucune demande à expirer à ce moment-là) ; script versionné dans supabase/cron-expiration-demandes.sql. Le remboursement Stripe n'est pas codé. Décision du 23/10 : pas de Claude Cowork, ce n'est pas nécessaire : la grille ne l'impose pas, et cette tâche planifiée est une automatisation métier qui s'exécute sans geste manuel et se montre en direct.

**Écarts avec le périmètre de la V1 (état au 19 octobre 2026).** Les e-mails automatiques (confirmation, acceptation, rappel la veille) ne sont pas codés : la confirmation d'envoi et l'acceptation sont des pages de l'appli, et aucune page ne promet un e-mail. L'annulation par la locataire est décrite dans ce document mais n'est pas codée : le bouton est retiré de « Mes réservations » pour la démo. Les dates de recherche ne filtrent pas les kits (les réservations des autres locataires ne sont pas lisibles, à cause des règles RLS) ; la recherche filtre par ville, âge et nombre d'enfants. Pour la démo, le site est présenté comme un lancement réel : l'interface ne porte pas la mention « projet de formation ».

## 14. Mise en ligne et état au 26 octobre 2026

**Code et dépôt.** Le code est sorti de Lovable le 20/10 ; le dossier local est la seule version. Dépôt GitHub public depuis le 26/10 (Aloa-dev/mini-vadrouille), historique par modules (« Mx - description »). Framework réel : TanStack Start, ce qui corrige les mentions de React Router.

**Mise en ligne.** Vercel (plan Hobby), déploiement automatique à chaque push sur main. Domaine mini-vadrouille.fr (OVH), HTTPS automatique ; www en production, le domaine nu redirige vers www. Les valeurs publiques Supabase sont dans les variables Vercel ; les clés secrètes (Stripe) sont dans les Secrets Supabase, jamais dans le dépôt (recherche de « sk\_ » et « service\_role » : aucun résultat). Les images vivent dans le dépôt (public/images). Après paiement, Stripe renvoie vers www.mini-vadrouille.fr grâce au secret SITE\_URL des Edge Functions (testé le 21/10 au soir).

**Documentation du dépôt.** README (enrichi le 21/10 : contexte, parcours de démo, paiement, limites), .env.example, docs/ERA.md (diagramme des 8 tables), docs/RLS.md (règles RLS ; vérifiées le 25/10 : RLS activée sur les 8 tables, politiques conformes, test visiteur et second compte), copie de la note de cadrage (docs/Note-de-cadrage-mini-vadrouille.md) et Edge Function de paiement versionnée (supabase/functions/creer-reservation-paiement/index.ts). Depuis le 22/10 : docs/AUDIT-SECURITE.md (15 constats, plan de remédiation après la soutenance), docs/TESTS-EXPLORATION.md, docs/RGPD.md, docs/ERA.dbml et son export docs/ERA-dbdiagram.png, pages publiques /confidentialite et /aide, docs/TEST-CLAVIER.md, docs/DESIGN-SYSTEM.md, dossiers docs/maquettes et docs/audit-accessibilite, en-têtes de sécurité (vercel.json), supabase/cron-expiration-demandes.sql, Edge Function IA (supabase/functions/compatibilite-velo/index.ts) et l'assistant de compatibilité sur la fiche kit. Le PRD est versionné dans le dépôt depuis le 26/10 (docs/PRD-Mini-Vadrouille.md), avec la note de cadrage.

**Qualité.** Lighthouse sur l'accueil (mobile) : accessibilité à 100 après corrections (rôle img sur les étoiles, nom accessible du bouton de dates). Paiement de test vérifié sur le site en ligne (222,60 € sans option). Fonctionnalité IA (Groq) testée en production le 22/10 ; type check, 18 tests sur 18 et build de production réussis. Audit de sécurité fait le 22/10 (15 constats, rapport dans le dépôt) : aucun secret dans les fichiers ni dans l'historique, en-têtes de sécurité ajoutés et vérifiés en ligne (la politique CSP est reportée), 5 vulnérabilités de dépendances (4 modérées, 1 haute) toutes dans les outils de développement et non dans le site servi. Limites assumées : CORS ouvert sur la fonction de paiement, réservations sans paiement terminé, messages d'erreur verbeux, pas de quota par utilisateur sur l'IA, clé publique Supabase en dur dans client.ts, énumération de comptes à l'inscription, confirmation d'e-mail désactivée (démo). Non vérifié par l'audit : réglages d'authentification Supabase, variables Vercel et secrets, réglages Stripe. Vérifiés depuis (25/10) : politiques RLS réelles et URL d'authentification de Supabase ; aucun test d'intrusion. Un test exploratoire en production, déconnecté, n'a trouvé ni lien ni image cassés. Supabase Realtime sur « Mes réservations » (23/10) : le statut d'une réservation change sans recharger la page, testé en local puis en production avec le compte de Chloé ; c'est la vue dynamique visée par la grille du jury (C5). Deux maquettes Stitch avec leurs audits WCAG et deux rapports Lighthouse (accueil, fiche kit) sont dans le dépôt. Limite connue : la fiche kit est lourde (LCP d'environ 14 s, environ 4,5 Mo de PNG), non corrigée avant le jury et expliquée à l'oral.

**Pas encore fait.** Parcours loueur et administrateur, e-mails automatiques, annulation par la locataire, remboursement automatique, webhook Stripe ; dashboard admin (hors démo, non codé).

**RGPD et IA.** Le texte du vélo saisi par la locataire est envoyé à Groq (société américaine) pour produire la réponse ; ni e-mail, ni nom, ni profil ne sont transmis, et un avertissement demande de ne saisir ni nom ni coordonnées. La page publique /confidentialite (conditions d'utilisation courtes et confidentialité), en ligne depuis le 24/10, traite de ces points ; elle est liée depuis le pied de page et la case d'inscription, comme la page d'aide /aide. Contact RGPD annoncé : contact@mini-vadrouille.fr (boîte non créée à ce jour). Document interne : docs/RGPD.md. Le préremplissage de démo du formulaire d'inscription a été retiré le 22/10. Toute newsletter future exigerait une case de consentement distincte (les e-mails de compte ne suffisent pas).

**Mise à jour du 25 octobre.** Test de navigation au clavier fait par Aloa sur le site en ligne : parcours complet (recherche, fiche kit, connexion, demande, paiement, « Mes réservations ») sans souris, calendrier fermé avec Échap ; rapport dans docs/TEST-CLAVIER.md, vidéo conservée hors dépôt. Pages publiques /aide et /confidentialite en ligne. Diagramme de la base exporté depuis dbdiagram.io (docs/ERA.dbml et docs/ERA-dbdiagram.png). Supabase Authentication : Site URL passé à https://www.mini-vadrouille.fr et trois adresses de redirection ajoutées (domaine avec et sans www, localhost:8080) ; les anciennes adresses Lovable restent dans la liste, à nettoyer après la soutenance. Double authentification OVH activée, renouvellement du domaine en manuel. Base de démo vidée des réservations de test ; une demande de Chloé sur le kit de Thomas est gardée pour répéter l'expiration automatique (pg\_cron), puis supprimée avant la démo. Dépôt : 25 commits.

**Mise à jour du 26 octobre.** Le dépôt GitHub est public. La RLS est vérifiée sur le vrai projet (section 13) : 8 tables protégées, cinq politiques de lecture, aucune écriture depuis le navigateur, test en visiteur non connecté et avec un second compte. L'expiration automatique des demandes sans réponse (pg\_cron) a été constatée par Aloa sur une demande de test de Chloé, passée en « expirée » sans intervention. La console du navigateur n'affiche aucune erreur sur les pages testées. Format de la soutenance : pitch de 5 minutes, démonstration de 15 minutes, questions de 10 minutes ; la démonstration montre le parcours de Chloé, l'aide IA, l'expiration automatique, « Mes réservations » en temps réel et la séparation des données entre deux comptes. Remis aux formateurs la veille : lien du site, page Notion publique, pitch deck en PDF.
