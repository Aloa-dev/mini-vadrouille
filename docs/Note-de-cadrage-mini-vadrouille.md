# Cadrage · Mini Vadrouille (projet fil rouge)

*Template du live du mercredi, adapté au projet fil rouge. Rempli le 23 septembre 2026, mis à jour le 24 septembre 2026 à partir du carnet produit. Mis à jour le 14 octobre 2026 et aligné sur le PRD : prénoms des personas (Chloé, Thomas), stack, stock, interviews, option sérénité, décisions du 9 octobre. Mis à jour le 21 octobre 2026 : code sorti de Lovable, stack réelle (TanStack Start), déploiement Vercel et domaine, décisions du 16 au 21 octobre. Mis à jour le 23 octobre 2026 : IA (Groq) et automatisation (pg_cron) en production, audit de sécurité. Mis à jour le 25 octobre 2026 : Supabase Realtime, documentation utilisateur et RGPD, test clavier, maquettes et audits, réglages d'authentification.*

> ⚠️ **Statut** : version vivante. Les personas sont **simulés** et les signaux viennent surtout de blogs et de sites. Les interviews de parents ne sont **pas prévues** (projet de formation) : les personas et les hypothèses H1 à H3 restent des hypothèses. **Rappel : projet de formation, pas un vrai lancement** — pas besoin de pousser à fond les démarches admin/business réelles (INPI, interviews exhaustives...), l'essentiel jugé par le jury est la démarche produit. **Soutenance : 27 octobre 2026 à 14 h.** **Produit en ligne au 21/10** : mini-vadrouille.fr (Vercel), code sur GitHub.

## Ton identité

**Prénom et nom :** Aloa

**Groupe (prénoms des autres membres) :** *à compléter*

**Nom du projet :** **Mini Vadrouille** (retenu le 24/09, tranché face à Mini-Échappées). Ex-Pédalou, abandonné à cause du double sens « pédale » et de la confusion avec le pédalo.

---

## ⏱️ Comprendre l'utilisateur

### 1 · Contexte et problème

**Le contexte :** Partir à vélo avec un jeune enfant (0 à ~6 ans) demande un équipement spécifique : remorque, attelage compatible, sacoches, parfois tente. Ce matériel est cher, encombrant, et ne sert que quelques années, puisque l'enfant devient trop grand pour la remorque vers 4-5 ans. Beaucoup de parents équipés le laissent ensuite dormir au garage.

**Le problème :** Les parents qui préparent un premier voyage à vélo ne savent pas quel matériel choisir, n'ont souvent pas la place de le stocker en ville, et hésitent à acheter puis revendre à perte pour une expérience qu'ils n'ont jamais testée. Certains renoncent. De leur côté, les parents équipés n'ont pas de moyen simple de rentabiliser un matériel qu'ils n'utilisent plus.

### 2 · Proposition de valeur

**Version courte (format du template) :**
Pour **les parents urbains qui préparent leur premier voyage à vélo avec un enfant de moins de 6 ans**, qui **ne savent pas quel matériel choisir et n'ont pas la place de le stocker**, Mini Vadrouille est **une marketplace de location entre particuliers** qui permet de **louer près de chez eux, pour quelques jours, un kit complet adapté à l'âge de leur enfant**.

**Version longue :**
Pour les parents urbains qui préparent leur premier voyage à vélo avec un enfant de moins de 6 ans, et qui n'ont ni l'expertise pour choisir le matériel, ni la place pour le stocker, Mini Vadrouille est une marketplace de location entre particuliers qui leur permet de louer près de chez eux, pour quelques jours, un kit complet adapté à l'âge de leur enfant. Contrairement à l'achat d'occasion, où il faut choisir seul puis revendre, et à Bikup, pensé pour les cyclistes adultes, chaque kit arrive avec le retour d'expérience du parent qui l'a utilisé et une checklist sécurité conçue par une ancienne technicienne cycles.

**Concurrence :**
- **Vrai concurrent : l'achat-revente d'occasion (Leboncoin).** Coût réel estimé à ~100-150 € de décote, pas 500 €.
- **Bikup** : location de matériel de voyage à vélo entre particuliers, généraliste cyclistes adultes. Son argument « tester avant d'acheter » ne nous différencie pas.
- **Loueurs pros sur place** (ex. Beach Bikes) : remorques en location, tarifs dégressifs, explications en magasin. Ils gagnent quand la famille part en train.
- **Location de puériculture** (Kidlou, Baby On A Trip…) : pour des séjours, pas pour l'itinérance à vélo.

**Différenciation :** kits complets pensés par âge · retour d'expérience structuré du parent loueur, visible dès le catalogue · checklist sécurité et état des lieux photo, toujours présentés comme un « contrôle déclaratif », jamais « garanti sûr » · remise en main propre, où le loueur transmet ses conseils.

### Value Proposition Canvas — le locataire

Le parent qui loue un kit pour partir quelques jours à vélo avec son enfant de moins de 6 ans.

| Profil utilisateur | Carte de valeur |
| --- | --- |
| **Tâches** : partir quelques jours à vélo avec son enfant ; s'équiper correctement pour son âge ; tester l'expérience avant d'investir. | **Fonctionnalités** : annonces de kits complets filtrées par âge ; calendrier de disponibilité et réservation ; paiement en ligne avec caution ; fiche kit avec le retour d'expérience du loueur ; checklist sécurité et état des lieux photo ; e-mails automatiques (confirmation, rappel la veille, demande d'avis : prévus, non codés en V1, les pages de l'appli en tiennent lieu) ; avis. |
| **Douleurs** : pas de place pour stocker le matériel ; ne sait pas quoi choisir et perd des heures à comparer ; refuse d'acheter puis revendre à perte pour un simple essai ; peur que le matériel ne soit pas sûr pour son enfant. | **Soulageurs** : rien à stocker, le kit est rendu après le voyage ; kit complet déjà pensé par âge ; on paie seulement les jours utilisés ; checklist sécurité et état des lieux photo (contrôle déclaratif). |
| **Gains** : un premier voyage réussi et serein ; des astuces et des itinéraires testés ; savoir si l'activité plait à toute la famille avant d'acheter. | **Créateurs de gains** : retour d'expérience structuré du loueur (matériel emporté, parcours testé, ce qui a marché) ; avis des autres familles. |

### Value Proposition Canvas — le loueur

Le parent équipé et expérimenté qui met son kit à disposition quand il ne s'en sert pas.

| Profil utilisateur | Carte de valeur |
| --- | --- |
| **Tâches** : rentabiliser un matériel qui dort au garage ; transmettre ses astuces et ses itinéraires ; louer sans gérer l'administratif. | **Fonctionnalités** : publication d'annonce avec checklist sécurité ; calendrier de disponibilité pour bloquer ses propres dates ; paiement via Stripe Connect avec reversement automatique ; caution ; état des lieux photo guidé ; avis sur le locataire ; e-mails automatiques (prévus, non codés en V1). |
| **Douleurs** : environ 500 € de matériel utilisé quelques fois par an ; peur de la casse sur un objet de sécurité enfant ; contrat, paiement et état des lieux à gérer ; temps passé à remettre, nettoyer et vérifier le kit. | **Soulageurs** : caution et état des lieux photo avant et après ; paiement et reversement gérés par la plateforme ; calendrier qui protège ses dates de vacances ; avis pour choisir ses locataires. |
| **Gains** : rembourser son matériel en une quinzaine de jours de location ; un revenu complémentaire ; le plaisir de transmettre et d'aider d'autres familles à partir. | **Créateurs de gains** : commission prélevée automatiquement, le reste reversé ; fiche retour d'expérience qui met son savoir en valeur ; réputation construite par les avis. |

### Remise du kit et option sérénité

La remise se fait en main propre, contrairement aux Airbnb à boîte à clés : la rencontre fait partie de la valeur du produit.

- **Option sérénité** (nettoyage du kit par le loueur), 12 € en démo, facturée à part du prix journalier. Elle paie le temps du loueur sans gonfler le prix par jour.
- **Créneau de remise** choisi au moment de la réservation.
- **Moment de transmission** : le loueur partage ses astuces de vive voix et montre comment atteler la remorque et régler les sangles.
- **État des lieux photo fait ensemble** sur place, au départ et au retour.

Limite : se voir demande de caler un horaire à deux, donc plus de friction. Une option sans rencontre pourra venir plus tard si des loueurs la demandent.

### 3 · Personas (simulés, interviews non prévues)

|  | Persona 1 · La locataire ⭐ principal | Persona 2 · Le loueur | Persona 3 · L'admin |
| --- | --- | --- | --- |
| Prénom et profil | **Chloé**, 33 ans, infirmière, appartement en ville sans cave, une fille de 2 ans | **Thomas**, 41 ans, technicien, maison en périphérie, deux enfants : Léonie (2 ans) et Milo (4 ans) | **Inès**, 29 ans, responsable des opérations de la plateforme |
| Citation | « Je ne vais pas acheter 500 € de matos pour découvrir que ma fille déteste ça. » | « Je préfère qu'elle roule plutôt qu'elle prenne la poussière, mais pas à n'importe quel prix. » | « Sans photos datées, je ne peux pas trancher un litige. » |
| Objectifs | Réussir un premier week-end à vélo en famille ; partir sans y passer ses soirées ; ne rien stocker chez elle | Rentabiliser son matériel ; aider d'autres familles à partir ; ne pas perdre son temps | Garder des annonces fiables ; arbitrer vite les cautions ; suivre les commissions |
| Frustrations | Ne sait pas quoi choisir ; aucune place pour ranger ; peur que le matériel ne soit pas sûr | Revente à perte sur Leboncoin ; peur de la casse ; administratif et coordination | Annonces incomplètes ; litiges sans preuve ; pas de vue d'ensemble des locations en cours |
| Attentes | Un kit complet adapté à l'âge de sa fille, près de chez elle, avec des conseils de parent | Paiement et caution gérés, état des lieux qui le protège, calendrier simple | File de validation, historique des états des lieux, tableau de bord |
| Critère de réussite | Revenir du week-end avec l'envie de repartir, sans galère de matériel | Louer plusieurs fois par saison sans litige | Chaque litige tranché en moins de 48 h, preuves à l'appui |

**Ce que les personas simulés disent de gênant :**
- Chloé : « Si on part en train, je louerai sur place. » et « Je ne veux pas traverser Bordeaux pour récupérer le kit. »
- Thomas : « Si c'est pour 20 € et deux heures de mon samedi, non. »

**Conflit entre personas :** Thomas veut un bon prix, Chloé compare avec l'achat d'occasion. Chloé est la persona principale, donc l'arbitrage passe par un **tarif dégressif** pour les locations longues.

### Retour d'expérience du loueur — format retenu

Idée clé : un teaser du retour d'expérience s'affiche directement sous la photo de chaque kit dans les résultats de recherche (pas seulement dans la fiche détaillée), pour que la différenciation soit visible dès le catalogue.

Champs remplis par le loueur à la publication :
- **Teaser** (obligatoire, ~150 caractères) : affiché sous la photo dans les résultats. Ex. « On a utilisé ce kit pour un trip de 3 jours avec notre fille de 3 ans. C'était extra ! »
- **Récit complet** (obligatoire) : destination, durée, âge(s) de l'enfant, ce qui a bien marché, ce qu'ils referaient différemment. Affiché sur la fiche kit détaillée.
- **Conseil pratique** (optionnel, une ligne) : un tips concret.

*Champ « Parcours conseillé » écarté* : risque de laisser croire que le kit est lié à un itinéraire précis (ex. « Vélodyssée » affiché alors que la locataire vise le Canal du Midi). Le lieu peut toujours être mentionné dans le récit libre, sans champ dédié.

V1 : teaser + fiche complète simple. V2 : enrichir la fiche (itinéraire structuré, difficulté, photos du trajet).

---

## ⏱️ Objectifs et périmètre

### 4 · Objectifs SMART (brouillon)

**Objectif 1 :** Permettre à un parent de trouver et réserver un kit adapté à l'âge de son enfant en moins de 15 minutes, sans poser de question sur le matériel, démontré en live à la soutenance (27 octobre 2026).

**Objectif 2 :** Permettre à un loueur de publier un kit complet, checklist sécurité comprise, en moins de 20 minutes, démontré en live à la soutenance.

**Objectif 3 :** Permettre à l'admin de trancher un litige de caution en moins de 48 h grâce aux états des lieux photo datés, avant et après location.

*Note du 21/10 : seul l'objectif 1 est démontré en live (parcours de la locataire). Les objectifs 2 et 3 concernent des écrans loueur et admin hors démo.*

### 5 · Périmètre MVP

| Dans le MVP (V1) | Plus tard | Pourquoi repoussée |
| --- | --- | --- |
| Annonces de kits avec photos, teaser retour d'expérience et filtres (localisation, dates, âge, nombre d'enfants) — au 21/10 : les filtres réels portent sur la ville, l'âge et le nombre d'enfants ; les dates ne filtrent pas (règles RLS) | Questionnaire multi-écrans (camping, destination, vélos possédés…) | Réutilise les mêmes critères que les filtres V1, juste une autre interface — pas urgent |
| Calendrier de disponibilité et statut d'objet (2 statuts stockés sur le kit : disponible / en réparation ; « réservé » et « en location » se déduisent des réservations) | Messagerie entre utilisateurs | Coûteuse à construire ; les pages de l'appli (demande envoyée, demande acceptée) et le créneau de remise couvrent la coordination |
| Réservation, paiement avec commission (Stripe Connect), caution (encaissement + remboursement manuel) | Assurance | Complexe juridiquement, hors du temps de la formation |
| Checklist sécurité (dont conformité EN 15918 déclarative) à la publication et état des lieux photo | Litiges automatisés | L'admin arbitre à la main en V1 |
| **Fiche retour d'expérience du loueur** (teaser + récit complet) — 🔴 passée en critique le 24/09 | Fiche enrichie (itinéraire structuré, difficulté, photos du trajet) | Le teaser + récit simple suffit en V1 ; l'enrichissement n'est pas nécessaire pour démontrer la différenciation |
| Créneau de remise en main propre | Option de remise sans rencontre | Contraire au positionnement ; à envisager si des loueurs la demandent |
| E-mails automatiques (réservation, rappel la veille, demande d'avis) — **prévus mais non codés en V1** : les pages « demande envoyée » et « demande acceptée » en tiennent lieu | Compatibilité vélo-remorque automatique et affirmative | Remplacée en V1 par une réponse informative de l'IA, à confirmer avec le loueur (voir décisions du 17/10) |
| Avis dans les deux sens | Badge « Vérifié par un pro » | Nécessite un process de vérification réel |
| Tableau de bord admin (validation, réservations, cautions, commissions) — **hors démo, non codé à ce jour** ; la vue dynamique de la grille du jury (C5) est « Mes réservations » en temps réel, via Supabase Realtime (tranché le 23/10) | Autres activités (porte-bébé de rando, camping…) | Vision après la formation, pour lisser la saisonnalité |
| Option sérénité (nettoyage du kit par le loueur, 12 € en démo) | Carte interactive | Le filtre par localisation suffit pour la démo |

**Champs requis par kit en base de données** (pour que les filtres fonctionnent) : âge min/max, nombre de places, localisation, calendrier de disponibilité.

**Stock :** géré par un calendrier de disponibilité (validé).

**Ajout du 25/09 :** connexion / inscription (email + mot de passe), nécessaire pour réserver, payer et laisser un avis.

**Démo du 27/10 :** uniquement le parcours de la locataire (Chloé), 9 écrans Stitch. Pas d'écrans loueur ni admin.

**Écarts entre la V1 prévue et la V1 construite (21/10) :** e-mails automatiques non codés ; annulation par la locataire décrite mais bouton retiré ; expiration automatique à 24 h faite (tâche `pg_cron`, les demandes sans réponse passent en « expirée », remboursement associé non automatisé) ; pas de webhook Stripe (la réservation existe dès la demande, même si le paiement n'est pas terminé) ; remboursement de la caution manuel et non codé ; dates de recherche non filtrantes ; fonctionnalité IA (compatibilité du vélo) en production, mais une seule fiche de compatibilité (kit de Thomas) et pas de quota par utilisateur ; Supabase Realtime en place sur « Mes réservations » depuis le 23/10. Le détail est dans le PRD (sections 13 et 14).

---

## ⏱️ La grille de stack

*Grille faite. Stack imposée par la formation : Lovable + Supabase + Stripe / Stripe Connect. Règle d'architecture : la base de données vit dans Supabase, séparée de l'outil de build. Prix vérifiés le 14 octobre 2026 sur les pages officielles de Lovable, Figma et Google (API Gemini / AI Studio). Stitch : pas de page tarifs officielle consultée, chiffres d'un blog tiers du 20 avril 2026, à reconfirmer dans l'appli. Mise à jour du 21/10 : le code généré par Lovable a été repris dans un dépôt local (VS Code + Claude Code) et déployé sur Vercel.*

### 6 · Grille de stack

**Maquettage · Stitch (retenu) vs Figma (écarté)**

| Critère | Stitch | Figma |
| --- | --- | --- |
| Fonctionnalités | Génère des écrans à partir de prompts, retouche ciblée. 9 écrans produits pour le parcours de Chloé. | Outil de design complet et collaboratif (composants, design system). Figma Make génère aussi à partir de prompts, mais il est rattaché aux sièges payants. |
| Apprentissage | Très rapide, déjà pris en main. | Plus long à maîtriser, surtout seule. |
| Coût | Gratuit, sans abonnement payant annoncé, mais limité par des crédits quotidiens (source tierce, à reconfirmer). | Plan Starter gratuit (150 crédits IA par jour, plafond 500 par mois). Professional : 16 $/mois, siège complet, 3 000 crédits IA par mois ([figma.com/pricing](https://www.figma.com/pricing/)). |
| Interopérabilité | Export en captures d'écran et fichier design.md, collés dans les prompts Lovable. | Très répandu, export d'images. |
| Scalabilité | Limitée : rendu approximatif, corrections à faire une demande à la fois. | Très bon pour un design system durable. |
| RGPD | Maquettes sans donnée réelle, risque faible. Aucune donnée sur l'enfant, seulement la tranche d'âge du kit. | Idem. |
| **Choix retenu et pourquoi** | **Stitch seul** : gratuit, plus rapide pour passer d'une idée à des écrans, suffisant pour la démo. Figma écarté pour ce projet (essai par curiosité possible, sans effet sur ce choix). | |

**App builder · Lovable (retenu) vs Google AI Studio (écarté)**

| Critère | Lovable | Google AI Studio |
| --- | --- | --- |
| Fonctionnalités | Génère l'app complète (TanStack Start sur Vite, React 19, TypeScript, Tailwind 4 : stack constatée dans le code le 21/10), connexion directe à Supabase. | Prototypage d'apps avec les modèles Gemini. Non testé en pratique. |
| Apprentissage | Prompts en français, méthode CROP, guidé par la formation. | Non testé, non guidé par la formation. |
| Coût | Plan gratuit : 5 crédits de build par jour, plafond 30 par mois ([docs Lovable](https://docs.lovable.dev/introduction/plans-and-credits)). Plans Pro et Business : prix de l'abonnement à vérifier ; recharge Pro à 15 $ les 50 crédits. | Gratuit avec un niveau gratuit de l'API Gemini ; payant pour des limites plus hautes et les modèles avancés ([ai.google.dev](https://ai.google.dev/gemini-api/docs/pricing)). |
| Interopérabilité | Supabase, GitHub (utilisé au prepwork puis pour ce projet), Stripe via Edge Functions Supabase. | Non vérifiée. |
| Scalabilité | Code récupérable : preuve par les faits au 20/10, le code est sorti de Lovable, versionné sur GitHub et déployé sur Vercel sans Lovable (pas d'enfermement). Base de données dans Supabase, séparée de l'outil de build. Limite : crédits à ménager, et les images étaient hébergées sur le CDN de Lovable (à rapatrier dans le dépôt avant de partir). | Non vérifiée. |
| RGPD | Les données vivent dans Supabase (région du projet à confirmer), pas dans l'outil de build. Aucune donnée sur l'enfant. | Sur l'offre gratuite, le contenu peut servir à améliorer les produits Google : à éviter avec des données personnelles. |
| **Choix retenu et pourquoi** | **Lovable** : imposé par la formation, intégré à Supabase et Stripe. Google AI Studio écarté : hors de la stack de la formation, non testé, et réutilisation du contenu sur l'offre gratuite. | |

**Limites de Lovable et comment j'en ai tenu compte :** les crédits sont comptés (plus de crédits le 13 octobre). Connecter Supabase ne consomme pas de crédits, générer du code oui. Donc : un seul sujet par prompt, prompts relus avant l'envoi, retouches simples dans VS Code. Depuis le 20/10, plus aucun prompt Lovable : le code est repris dans un dépôt local. Leçon : demander à Lovable de rapatrier les assets dans le dépôt avant de partir (les 23 fiches d'images pointaient vers le CDN de Lovable et étaient cassées sur Vercel), et tester un déploiement Vercel dès le premier jour.

**Autres briques :**

| Brique | Rôle | Choix |
| --- | --- | --- |
| Supabase | Base de données, authentification, RLS | Imposé par la formation |
| Stripe / Stripe Connect | Paiement, commission, reversement | Imposé par la formation, mode test pour la démo ; page de paiement hébergée par Stripe, pas de webhook (décision du 16/10) |
| VS Code + Claude Code | Éditeur de code et assistant de code | Gratuit pour l'éditeur, retenu à la place de Cursor (décision du 8 octobre) ; Claude Code utilisé depuis le 20/10 |
| GitHub + Vercel | Versionnement et déploiement | Stack du template de la formation ; plan Hobby, déploiement automatique à chaque push sur main |
| Nom de domaine (OVHcloud) | Adresse mini-vadrouille.fr | Payant et justifié : 5,99 € TTC pour 1 an (renouvellement 7,79 €/an), exigé par le point 7 de la checklist ; Hostinger écarté (panier opaque) |
| Groq (fournisseur d'IA) | Fonctionnalité IA de compatibilité du vélo | Plan gratuit sans carte, modèle ouvert `openai/gpt-oss-120b` (limites : 30 requêtes par minute, 1 000 par jour), clé dans les Secrets Supabase. Mistral écarté (15 € de crédit exigés), Gemini écarté. Données minimales (pas de nom ni de coordonnées), option de non-conservation (ZDR) activée ; hébergement aux États-Unis, métadonnées d'usage conservées |
| pg_cron | Expiration automatique des demandes sans réponse | Extension PostgreSQL de Supabase, gratuite ; tâche horaire prouvée par `cron.job_run_details` (22/10) |

---

## ⏱️ Préparer la démo

**Date :** soutenance le 27 octobre 2026 à 14 h.

**Proposition de valeur que tu présentes :** la version courte de la section 2.

**Objectif SMART que tu montres :** l'objectif 1, un parent trouve et réserve un kit adapté à l'âge de son enfant en moins de 15 minutes.

**Parcours montré en live :** celui de Chloé. Recherche par âge → fiche kit → paiement avec caution → demande envoyée → demande acceptée par Thomas (réponse simulée) → mes réservations. L'état des lieux et l'avis ne sont pas montrés.

**Outil retenu que tu défends :** Lovable (imposé par la formation, intégré à Supabase et Stripe) pour générer la base de l'app, puis reprise du code dans VS Code et Claude Code, grille faite en section 6.

**Outils écartés et pourquoi :** Google AI Studio (hors stack de la formation, non testé, contenu réutilisé par Google sur l'offre gratuite) ; Figma (plus long à maîtriser, Stitch suffit pour la démo et reste gratuit).

---

## ⭐ Bonus

### Vérifications faites (24/09)

- **Norme EN 15918** : confirmée — norme européenne « Cycles — Remorques pour cycles — Exigences de sécurité et méthodes d'essai ». Couvre stabilité, structure, attelage, visibilité. Intégrée à la checklist sécurité comme case à cocher déclarative par le loueur.
- **Caution Stripe** : confirmé, une pré-autorisation Stripe ne tient que **7 jours maximum**, libérée automatiquement au-delà si non encaissée. Risque réel pour une location d'une semaine avec état des lieux au retour. **Décision retenue : encaissement puis remboursement manuel** après l'état des lieux de retour. Frein potentiel assumé pour le locataire (l'argent sort réellement de son compte pendant la location), à expliquer dans le PRD. Autorisation prolongée (jusqu'à 30 jours selon réseau de carte) notée comme piste V2, plus complexe techniquement.

### Matrice des risques (brouillon, estimations à challenger)

| Risque | Probabilité | Impact | Mitigation |
| --- | --- | --- | --- |
| Caution bloquée seulement 7 jours par Stripe, trop court pour une location d'une semaine avec état des lieux au retour | Confirmée | Fort | Encaissement + remboursement manuel en V1 (décidé le 24/09) ; autorisation prolongée en piste V2 |
| Saisonnalité : les loueurs actifs veulent leur matériel l'été, au pic de demande | Forte | Fort | Recruter des parents dont l'enfant a grandi ; élargir aux autres activités après la formation |
| Densité locale de loueurs trop faible au lancement | Forte | Fort | Démarrer sur une seule ville (Bordeaux) ; recruter des loueurs l'hiver |
| Familles qui partent en train louent sur place chez un pro | Moyenne | Moyen | Cibler les départs depuis chez soi à vélo ou en voiture ; hypothèse non vérifiée (interviews non prévues) |
| Tension de prix entre loueur et locataire | Forte | Moyen | Tarif dégressif ; option sérénité (nettoyage) facturée séparément du prix journalier |
| Sécurité enfant et responsabilité en cas de matériel abîmé | Faible | Fort | Checklist et état des lieux photo en « contrôle déclaratif », jamais « garanti sûr » ; conformité EN 15918 déclarative |
| Projet Supabase gratuit mis en pause après environ 7 jours de faible activité (à vérifier chez Supabase) — risque technique ajouté le 21/10 | Moyenne | Fort pour la démo | Vérifier le projet la veille et le matin du 27 octobre ; réveiller le projet si besoin |
| Paiement : réservation créée avant la fin du paiement (pas de webhook) — risque technique ajouté le 21/10 | Forte | Moyen | Limite assumée et dite à l'oral ; en démo, parcours de test propre (base nettoyée) ; webhook en piste V2 |

### Squelette PRD (aligné sur le PRD, section 5, le 21/10)

**Fonctionnalités MUST (dans la V1) :** recherche de kits avec filtres (localisation, dates, âge, nombre d'enfants) · calendrier de disponibilité et statut d'objet (2 statuts stockés) · réservation · paiement avec commission et caution (Stripe Connect, encaissement + remboursement manuel) · checklist sécurité (dont EN 15918 déclaratif) à la publication et état des lieux photo · **fiche retour d'expérience du loueur (teaser + récit)** · créneau de remise en main propre · e-mails automatiques (prévus, non codés en V1) · avis dans les deux sens · tableau de bord admin (hors démo, non codé à ce jour) · option sérénité (nettoyage, 12 € en démo) · connexion / inscription.

**Fonctionnalités SHOULD (si le temps) :** file de validation admin (renforcée) · tarif dégressif sur les locations longues.

**Fonctionnalités WON'T, hors V1 avec une raison :** questionnaire multi-écrans (les filtres V1 suffisent) · messagerie (coordination couverte par les pages de l'appli et le créneau de remise) · carte interactive (filtre suffisant) · assurance (trop complexe) · litiges automatisés (arbitrage manuel en V1) · fiche enrichie (le teaser + récit suffit) · option de remise sans rencontre (contraire au positionnement) · compatibilité vélo-remorque automatique et affirmative (remplacée en V1 par une réponse informative de l'IA) · badge vérifié par un pro (process réel nécessaire) · autorisation Stripe prolongée (V2).

---

## 📎 Annexe · Matière de la journée

### Hypothèses produit

*Statut au 14/10 : interviews parents non prévues (projet de formation). H1 à H3 restent des hypothèses non vérifiées.*

| Hypothèse | Besoin adressé | Comment je la validerais (non réalisé) |
| --- | --- | --- |
| **H1 (problème, la plus risquée)** : les parents urbains qui préparent un premier voyage à vélo avec un enfant de moins de 6 ans hésitent à acheter faute de place et de certitude, et préféreraient louer un kit complet quelques jours. | Partir sans stocker ni acheter-revendre pour un essai | Sur 5 parents interrogés, au moins 3 racontent avoir renoncé, emprunté ou regretté un achat, et disent qu'ils auraient loué |
| **H2 (solution)** : ces parents ont besoin de kits filtrés par âge, avec le retour d'expérience du loueur, pour choisir sans passer des heures à comparer. | Savoir quoi prendre sans expertise | En test, un parent choisit et réserve un kit en moins de 15 minutes sans poser de question sur le matériel |
| **H3 (offre)** : les parents équipés mettraient leur kit en location si la plateforme gère le paiement, la caution et l'état des lieux. | Rentabiliser un matériel qui dort, sans gérer l'administratif | Sur 5 parents équipés contactés, au moins 2 acceptent de publier une annonce |

**Priorisation impact/effort :** H1 impact fort, effort faible (des interviews, pas de code), à tester en premier · H2 impact fort, effort faible à moyen, dans le MVP · H3 impact fort, effort élevé (Stripe Connect et caution), mais dans le MVP car le paiement est imposé par le sujet.

### Signaux utilisateurs (recherche du 23/09/2026)

| # | Signal | Douleur | Source |
| --- | --- | --- | --- |
| 1 | Pour un premier voyage avec un bébé de 11 mois, une famille voulait tester une remorque sans se ruiner et a acheté un modèle premier prix lourd et encombrant | Peur de mal choisir | [La bougeotte en famille](https://www.labougeotteenfamille.com/2020/06/09/acheter-remorque-velo-enfant/) |
| 2 | Vers 4-5 ans, l'enfant devient trop grand pour la remorque | Usage court | [La bougeotte en famille](https://www.labougeotteenfamille.com/2020/06/09/acheter-remorque-velo-enfant/) |
| 3 | Demandes réelles de location entre particuliers : une semaine, 4 jours, quelques jours avec un fils de 5 ans | Besoin de louer quelques jours | [AlloVoisins](https://www.allovoisins.com/r/2964/51/0/0/location-Remorque-velo-charrette-a-velo-pour-transport-d-enfants) |
| 4 | Demandes de location pour tester avant d'acheter (remorques à chien, même réflexe) | Envie de tester | [AlloVoisins](https://www.allovoisins.com/r/2964/51/0/0/location-Remorque-velo-charrette-a-velo-pour-transport-d-enfants) |
| 5 | Un guide d'achat prévient qu'une remorque peut devenir inutilisable faute de place | Rangement | [Roulez Jeunesse](https://blog.roulezjeunesse.com/remorque-velo-enfant/) |
| 6 | Le rangement présenté comme le principal point bloquant des familles cyclistes urbaines | Rangement | [remorque-velo.com](https://remorque-velo.com/remorque-velo-expl-900/) |
| 7 | **Contre-signal** : Decathlon lance en avril 2026 une remorque pliable pensée pour les appartements, à 499,99 € | Rangement déjà attaqué par un produit | [remorque-velo.com](https://remorque-velo.com/remorque-velo-expl-900/) |
| 8 | **Contre-signal** : les remorques ne passent pas dans les trains, mieux vaut les louer sur place | Acheminement jusqu'au départ | [La Trace](https://www.latrace.com/blog/voyager-a-velo-avec-des-enfants-lequipement-essentiel-pour-les-transporter) |
| 9 | Des loueurs pros proposent déjà des remorques, tarifs dégressifs et explications en magasin | Concurrence pro sur place | [Beach Bikes](https://www.beachbikes.fr/nos-velos/remorque-enfant/) |
| 10 | Un vélo cargo est compliqué à mettre en voiture ou dans le train pour partir en vacances | Acheminement jusqu'au départ | [Forum Carnets d'Aventures](https://www.expemag.com/forum/view/588efdabe4b0ec6bb7217802) |

**Ce que ça change :** le contre-signal 8 limite la cible aux familles qui partent de chez elles à vélo ou en voiture. Le signal 3 est la meilleure preuve de demande.

### Stress-test investisseur

- **Q1 · Pourquoi louer plutôt qu'acheter d'occasion ?** Validée sous réserve (interviews non prévues). Le stockage est l'argument le plus fort. Le gain de temps n'existe que si les fiches kit sont vraiment riches.
- **Q2 · Pourquoi un parent loue son matériel ?** Validée à moitié. Deux problèmes : la saisonnalité côté offre, et la tension de prix (à 40 €/jour, deux semaines coûtent 560 €, plus cher qu'acheter neuf).
- **Q3 · Week-end ou roadtrip, et à quelle fréquence ?** Pas encore traitée.

### Tableau besoins et enjeux

| Besoin | Priorité | Rôle concerné | Fonctionnalité impliquée |
| --- | --- | --- | --- |
| Trouver un kit complet adapté à l'âge, près de chez soi | 🔴 Critique | Locataire | Recherche avec filtres (localisation, dates, âge, nombre d'enfants) |
| Réserver et payer en ligne, avec caution | 🔴 Critique | Locataire, loueur | Calendrier, Stripe Connect, caution (encaissement + remboursement manuel) |
| Se protéger en cas de casse | 🔴 Critique | Loueur, admin | État des lieux photo avant et après |
| **Profiter des conseils du loueur** | 🔴 **Critique** (relevé le 24/09) | Locataire | Fiche retour d'expérience (teaser + récit) |
| Garder des annonces fiables | 🟠 Important | Admin | File de validation des annonces |
| Organiser la remise en main propre | 🟠 Important | Locataire, loueur | Créneau de remise à la réservation |
| Choisir en confiance | 🟠 Important | Tous | Avis dans les deux sens |
| Être rappelé au bon moment | 🟡 Confort | Locataire, loueur | E-mails automatiques (non codés en V1) |
| Payer son temps de nettoyage | 🟡 Confort | Loueur | Option sérénité (nettoyage du kit par le loueur, 12 € en démo) |

### Décisions prises

- Remise du kit **en main propre**, pas de boîte à clés façon Airbnb : la rencontre fait partie de la valeur.
- **Option sérénité** (nettoyage du kit par le loueur, 12 € en démo), à la place des frais de nettoyage libres fixés par le loueur.
- **Nom : Mini Vadrouille** (24/09), tranché face à Mini-Échappées.
- **Fiche retour d'expérience du loueur : critique** (24/09), pas juste importante — c'est la vraie différenciation face à Bikup.
- **Format du retour d'expérience** (24/09) : teaser (~150 car.) affiché sous la photo dans les résultats + récit complet sur la fiche détaillée + conseil pratique optionnel. Pas de champ "parcours conseillé" dédié, pour éviter de laisser croire qu'un kit est lié à un itinéraire précis.
- **Caution : encaissement puis remboursement manuel** (24/09), suite à la vérification que Stripe ne bloque une pré-autorisation que 7 jours max.
- **Filtres de recherche V1** (24/09) : localisation, dates, âge de l'enfant, nombre d'enfants + bouton "Rechercher" (pas de questionnaire multi-écrans en V1). Au 21/10 : les dates ne filtrent pas les résultats (règles RLS), la recherche filtre par ville, âge et nombre d'enfants.
- **Connexion / inscription** (25/09) : ajoutées au MUST, nécessaires pour réserver, payer et laisser un avis.
- **Interviews parents non prévues** : projet de formation, personas et hypothèses restent simulés.
- **Stock géré par un calendrier de disponibilité** (validé). Statuts d'objet : 2 stockés sur le kit (disponible, en réparation) ; « réservé » et « en location » se déduisent des réservations.
- **Stack retenue** (grille faite) : Stitch seul pour le maquettage (pas de Figma), Lovable pour la génération, Supabase pour la base, VS Code à la place de Cursor, Stripe / Stripe Connect en mode test. Stack réelle du code constatée le 21/10 : TanStack Start, React 19, Tailwind 4 (et non React Router).
- **Soutenance le 27 octobre 2026 à 14 h** : démo = uniquement le parcours de la locataire (Chloé), pas d'écrans loueur ni admin.
- **Réservation soumise à validation du loueur** (9/10) : total et caution débités à l'envoi de la demande, refus automatique et remboursement intégral sans réponse sous 24 h. Minimum 3 jours entre la demande et le départ. Prix figé au moment de la demande. Adresse exacte et coordonnées révélées seulement après paiement et acceptation du loueur.
- **Prix démo** (9/10) : 3 jours × 22 € = 66 €, frais de service 10 %, option sérénité 12 €, caution 150 €.
- **Annulation par le loueur** (9/10) : remboursement automatique, trace visible, kit remis en relecture après 2 annulations dans l'année, exception pour motif légitime levée par l'admin, pas de frais financiers en V1.
- **Design** (9/10 et suite) : « Warm Family Outdoors », bouton principal orange brûlé #C4501B, thème clair uniquement, desktop-first. Mots bannis dans l'interface : garanti, garanties, assurance, certifié, protégé, sécurisé.
- **RGPD** (9/10) : suppression ou anonymisation du compte dans le mois suivant la demande ; avis conservé sous « Un parent vadrouilleur » ; paiements archivés 10 ans à accès restreint ; photos d'état des lieux supprimées après la fin d'un éventuel litige (sinon 6 mois après le remboursement de la caution) ; compte dormant supprimé après 3 ans sans connexion, avec e-mail d'avertissement. Détail dans le PRD, section 12.
- **Paiement** (16 et 17/10) : paiement indirect simple (la locataire paie la plateforme, une part est transférée au loueur), page de paiement hébergée par Stripe, pas de webhook ; la plateforme garde les frais de service et la caution, le loueur reçoit la location et l'option sérénité ; frais Stripe pris en charge par la plateforme (limite assumée) ; Stripe en mode test uniquement. Montants recalculés côté serveur par une Edge Function Supabase.
- **Suppression de compte** (14/10) : on anonymise le profil puis on désactive la connexion, on n'efface jamais (sauf comptes de test).
- **Feature IA : compatibilité du vélo** (17/10) : la locataire décrit son vélo, l'IA compare avec la fiche de compatibilité du kit et répond de façon informative, jamais affirmative, à confirmer avec le loueur ; texte seulement ; clé dans les Secrets Supabase.
- **IA en production** (22/10) : fournisseur **Groq** (plan gratuit, modèle ouvert `openai/gpt-oss-120b`) à la place de Mistral. **Connexion obligatoire** pour l'utiliser (option A, pour protéger l'API contre les abus). Texte limité à 500 caractères, avertissement « ne saisissez ni nom ni coordonnées », seuls le nom du kit, la fiche de compatibilité et le texte du vélo sont envoyés, rien n'est journalisé. Fiche de compatibilité rédigée par Aloa (ex-technicienne cycles) pour le kit de Thomas ; les autres kits répondent « information non disponible ». Réponse informative, jamais affirmative, renvoyant vers le « mot pour le loueur » ou la remise.
- **Automatisation** (22/10) : expiration des demandes sans réponse après 24 h par une tâche `pg_cron` horaire, preuve dans `cron.job_run_details`. **Veille concurrence Cowork : non nécessaire** (précision des formateurs du 23/10 : la grille n'impose aucun outil, elle attend une automatisation métier dans l'application, déclenchée sans geste manuel et montrée en direct ; `pg_cron` répond à ce critère).
- **Messagerie hors V1** (22/10) : la coordination locataire-loueur passe par le « mot pour le loueur » de la demande et la remise en main propre.
- **Audit de sécurité** (22/10) : [`AUDIT-SECURITE.md`](AUDIT-SECURITE.md), 15 constats, limites assumées avant la soutenance, remédiations planifiées après (webhook Stripe, quota IA par utilisateur, dépendances de développement, CORS de la fonction de paiement). En-têtes de sécurité ajoutés via `vercel.json`. Tests exploratoires dans [`TESTS-EXPLORATION.md`](TESTS-EXPLORATION.md).
- **RGPD et interface** (22/10) : texte du vélo envoyé à Groq sans nom ni coordonnées ; toute newsletter future exigerait un consentement distinct ; préremplissage de démo retiré de l'inscription ; boutons « Partager » et « Sauvegarder » retirés de la fiche kit (sans effet).
- **Temps réel et vue dynamique** (23/10) : « Mes réservations » s'abonne aux changements de la table `reservations` (Supabase Realtime) : le statut change sans recharger la page, testé en local puis en production. Cette vue répond au critère de visualisation dynamique de la grille (C5) ; pas de tableau de bord administrateur dans cette version.
- **Documentation utilisateur et RGPD** (24/10) : page publique « Conditions d'utilisation et confidentialité » (`/confidentialite`) et guide d'utilisation (`/aide`), liés depuis le pied de page et la case d'inscription ; document interne `docs/RGPD.md` (données, sous-traitants, durées de conservation, état de mise en œuvre). Contact annoncé : `contact@mini-vadrouille.fr` (boîte non créée à ce jour). La demande de suppression de compte passe par e-mail ; bouton et e-mails automatiques restent à faire.
- **Preuves de conception et d'accessibilité** (23 au 25/10) : diagramme de la base exporté depuis dbdiagram.io (`docs/ERA.dbml`, `docs/ERA-dbdiagram.png`), deux maquettes Stitch avec audits WCAG (`docs/maquettes/`), deux rapports Lighthouse (`docs/audit-accessibilite/`), test de navigation au clavier sur le parcours complet (`docs/TEST-CLAVIER.md`, vidéo hors dépôt).
- **Réglages d'authentification et domaine** (25/10) : Site URL de Supabase Authentication passé à `https://www.mini-vadrouille.fr`, adresses de redirection du domaine ajoutées (anciennes adresses Lovable laissées, à nettoyer après la soutenance) ; double authentification OVH activée, renouvellement du domaine en manuel (échéance octobre 2027).
- **Limite assumée : poids de la fiche kit** (23/10) : la page charge environ 4,5 Mo, surtout des images PNG, et obtient un LCP d'environ 14 s au test mobile simulé de Lighthouse ; correctif identifié (compression des images), non fait avant la soutenance.
- **E-mails automatiques non codés en V1** (19/10) ; **annulation par la locataire non codée**, bouton retiré (19/10).
- **Sortie de Lovable et mise en ligne** (20 et 21/10) : code repris dans un dépôt GitHub (Aloa-dev/mini-vadrouille), déployé sur Vercel (plan Hobby, déploiement à chaque push sur main), domaine mini-vadrouille.fr acheté chez OVHcloud (5,99 € TTC pour 1 an), images rapatriées dans le dépôt. Premier commit nommé différemment de « M0 - Setup initial » : historique publié non réécrit, choix assumé.
- **Conventions de travail** (20 et 21/10) : Aloa tape les commandes elle-même ; pas de commit ou push sans son accord ; .env jamais lu ni commité ; commits nommés « Mx - description ».
- **Vision après la formation** : location de kits enfants pour d'autres activités (porte-bébé de rando, camping familial…), pas le ski (les parents louent sur place en station).
- **Rappel de cadrage (24/09)** : c'est un projet de formation, pas un vrai lancement — pas besoin de pousser l'INPI, les interviews exhaustives ou les démarches admin réelles à fond ; le jury évalue la démarche produit.

### Questions d'interview parents

*Non utilisées : les interviews ne sont pas prévues (projet de formation). Gardées comme trame si elles sont faites un jour.*

Règle : faire raconter le vécu avant de présenter l'idée, interroger le passé plutôt que le futur.

1. Raconte-moi la dernière fois que tu es parti(e) à vélo avec ton enfant, ou que tu en as eu envie.
2. Comment tu t'es équipé(e) ? Qu'est-ce que tu as acheté, emprunté ou loué, et pour combien ?
3. D'où tu es parti(e), et comment tu as amené le matériel jusqu'au départ (à vélo depuis chez toi, en voiture, en train) ?
4. Qu'est-ce qui a été le plus compliqué ou le plus stressant dans la préparation ?
5. Tu as encore ce matériel ? Qu'est-ce que tu en fais aujourd'hui ?
6. (Présenter l'idée en 2 phrases) Qu'est-ce qui te ferait dire oui ? Et qu'est-ce qui te ferait dire non ?

À écouter : si « place » ou « stockage » sort spontanément, avant que tu le suggères. La question 3 vient du contre-signal 8 (les trains).

### À faire

- [x] ~~Faire les interviews parents~~ — abandonné, non prévues (projet de formation)
- [x] ~~Remplir la grille de stack (Stitch vs Figma, Lovable vs Google AI Studio)~~ — fait, prix vérifiés le 14/10, mise à jour le 21/10
- [x] ~~Vérifier la durée de blocage d'une caution Stripe~~ — fait le 24/09, 7 jours max, caution en encaissement + remboursement manuel
- [x] ~~Vérifier la norme EN 15918~~ — fait le 24/09, confirmée et intégrée à la checklist
- [x] ~~Faire valider au formateur le critère de stock basé sur un calendrier~~ — validé, stock géré par un calendrier de disponibilité
- [x] ~~Sortir le code de Lovable, créer le dépôt GitHub, déployer sur Vercel, acheter le domaine~~ — fait les 20 et 21/10
- [x] ~~Déposer cette note de cadrage dans le dépôt GitHub (dossier docs/)~~ — fait ; le PRD reste hors dépôt, par choix d'Aloa
- [ ] Vérifier la structure « 8 sections » de la note de cadrage par rapport au template de la formation
- [x] ~~Choisir le fournisseur d'IA, construire la fonctionnalité de compatibilité du vélo~~ — fait le 22/10, Groq, en production
- [x] ~~Construire l'automatisation (expiration à 24 h)~~ — fait le 22/10, `pg_cron`
- [x] ~~Audit de sécurité~~ — fait le 22/10, [`AUDIT-SECURITE.md`](AUDIT-SECURITE.md)
- [x] ~~Veille concurrence Cowork~~ — non nécessaire (23/10), `pg_cron` couvre le critère d'automatisation
- [x] ~~Trancher le dashboard / Supabase Realtime~~ — fait le 23/10 : « Mes réservations » en temps réel sert de vue dynamique, pas de tableau de bord admin
- [x] ~~Documentation utilisateur et RGPD~~ — fait le 24/10 (pages `/aide` et `/confidentialite`, `docs/RGPD.md`)
- [x] ~~Test de navigation au clavier~~ — fait le 25/10 (`docs/TEST-CLAVIER.md`)
