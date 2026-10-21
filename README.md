# Mini Vadrouille

**Louez un kit vélo complet, prêté par des parents qui l'ont déjà testé, pour partir quelques jours à vélo avec vos enfants.**

Mini Vadrouille est une marketplace de location de matériel de voyage à vélo entre familles : remorque, siège enfant, vélo suiveur, sacoches, casques… Chaque kit est adapté à l'âge de l'enfant et arrive avec le retour d'expérience du parent qui l'a utilisé.

Projet fil rouge de la formation *vibe coding* (certification BC02), présenté au jury le **27 octobre 2026**.

**Site en ligne : https://www.mini-vadrouille.fr**

> Le site fonctionne en **mode démonstration** : les paiements passent par Stripe en mode test, aucun vrai paiement n'est possible. La démo suit le parcours d'une locataire, Chloé.

## Sommaire

1. [Le problème et la proposition de valeur](#le-problème-et-la-proposition-de-valeur)
2. [Ce que fait l'application](#ce-que-fait-lapplication)
3. [Stack technique](#stack-technique)
4. [Installation et lancement en local](#installation-et-lancement-en-local)
5. [Utilisation : le parcours de démo](#utilisation--le-parcours-de-démo)
6. [Paiement](#paiement)
7. [Sécurité et données personnelles](#sécurité-et-données-personnelles)
8. [Documentation](#documentation)
9. [Structure du projet](#structure-du-projet)
10. [Limites connues](#limites-connues)
11. [Prochaines étapes](#prochaines-étapes)

## Le problème et la proposition de valeur

Partir à vélo avec un enfant de moins de 6 ans demande un équipement spécifique, cher et encombrant, qui ne sert que quelques années : l'enfant devient trop grand pour la remorque vers 4-5 ans. Les parents qui préparent un premier voyage ne savent pas quoi choisir, n'ont souvent pas la place de le stocker en ville, et hésitent à acheter puis revendre à perte pour un simple essai. De leur côté, les parents déjà équipés laissent leur matériel dormir au garage.

**Mini Vadrouille** permet de **louer près de chez soi, pour quelques jours, un kit complet adapté à l'âge de son enfant**, avec les conseils du parent qui l'a utilisé.

Ce qui différencie le projet de l'achat d'occasion ou d'un loueur généraliste :

- des **kits complets pensés par âge** (trois tranches : Petit Cocon, Explorateur Curieux, Mini Baroudeur) ;
- un **retour d'expérience du loueur** visible dès la liste de résultats ;
- une **remise en main propre**, où le loueur transmet ses astuces ;
- un contrôle **déclaratif** (checklist, état des lieux photo), jamais présenté comme « garanti ».

Les personas (simulés) : **Chloé**, locataire, persona principale ; **Thomas**, loueur ; **Inès**, administratrice de la plateforme. Le détail est dans la [note de cadrage](docs/Note-de-cadrage-mini-vadrouille.md).

## Ce que fait l'application

**Construit et visible en démo (parcours de Chloé) :**

- Recherche de kits par ville, nombre d'enfants et âge (les critères sont dans l'URL, donc partageables).
- Fiche détaillée d'un kit : galerie, équipement, compatibilité, conseils du loueur, total avec option sérénité.
- Inscription (avec acceptation des CGU), connexion et déconnexion, via Supabase Auth.
- Demande de réservation avec paiement Stripe en mode test.
- « Mes réservations » : la locataire ne voit que les siennes, avec leur statut.
- Guide du parent cycliste téléchargeable (PDF).

**Décrit dans le cahier des charges mais non codé en V1 :** parcours loueur et administrateur, e-mails automatiques, annulation par la locataire, remboursement de la caution, avis. Voir [Limites connues](#limites-connues).

**Design :** « Warm Family Outdoors », thème clair, police Outfit, vert `#12403C`, fond crème `#FAF8F5`, bouton principal orange brûlé `#C4501B`. Vouvoiement, vocabulaire déclaratif (jamais « garanti » ni « assuré »). Maquettes réalisées avec Stitch, puis code généré avec Lovable.

## Stack technique

| Rôle | Outil |
|---|---|
| Maquettes | Stitch |
| Génération initiale du code | Lovable (plus utilisé depuis le 20 octobre) |
| Framework web | [TanStack Start](https://tanstack.com/start) (React 19, TypeScript, routage par fichiers) |
| Style | Tailwind CSS 4, composants shadcn/ui (Radix UI) |
| Outil de build | Vite |
| Base de données et authentification | [Supabase](https://supabase.com) (PostgreSQL, Auth, Edge Functions) |
| Paiement | [Stripe](https://stripe.com) (Connect, mode test), appelé depuis une Edge Function Supabase |
| Éditeur et assistant | VS Code et Claude Code |
| Versionnement | GitHub (dépôt privé) |
| Hébergement | [Vercel](https://vercel.com), déploiement automatique à chaque `git push` sur `main` |
| Nom de domaine | OVHcloud (DNS pointant vers Vercel, HTTPS automatique) |
| Tests | Vitest et Testing Library |

Le choix des outils (grille de comparaison, limites, alternatives écartées) est détaillé dans la [note de cadrage](docs/Note-de-cadrage-mini-vadrouille.md).

## Installation et lancement en local

Prérequis : [Node.js](https://nodejs.org) (version LTS récente) et npm.

```sh
git clone https://github.com/Aloa-dev/mini-vadrouille.git
cd mini-vadrouille
npm install
cp .env.example .env     # puis renseigner les valeurs (voir ci-dessous)
npm run dev
```

| Commande | Rôle |
|---|---|
| `npm run build` | Construit le site pour la production |
| `npm run preview` | Prévisualise la version construite |
| `npm test` | Lance les tests (Vitest) |
| `npm run lint` | Vérifie la qualité du code (ESLint) |
| `npm run format` | Reformate le code (Prettier) |

### Variables d'environnement

Le fichier `.env.example` liste les variables attendues, **sans aucune valeur**. Le vrai fichier `.env` est ignoré par Git (voir `.gitignore`) et ne doit jamais être publié.

| Variable | Rôle |
|---|---|
| `VITE_SUPABASE_URL`, `SUPABASE_URL` | Adresse du projet Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY` | Clé **publique** (« publishable »), faite pour être lue par le navigateur |
| `VITE_SUPABASE_PROJECT_ID`, `SUPABASE_PROJECT_ID` | Identifiant du projet Supabase |

Sur Vercel, les mêmes variables sont définies dans *Settings → Environment Variables*. Les clés secrètes (Stripe) ne sont **pas** dans ce projet : elles vivent dans les *Secrets* de Supabase.

## Utilisation : le parcours de démo

1. Ouvrir le site et lancer une recherche depuis l'accueil (par exemple « Bordeaux »).
2. Ouvrir la fiche d'un kit (en démo : le kit Explorateur Curieux de Thomas).
3. Créer un compte ou se connecter. La confirmation par e-mail est volontairement désactivée pour la démo.
4. Choisir les dates (en démo : du 19 au 21 mai 2027) et demander la réservation : la page de paiement Stripe s'ouvre en **environnement de test**.
5. Payer avec la carte de test publique de Stripe : `4242 4242 4242 4242`, une date d'expiration future et trois chiffres au choix pour le code de sécurité.
6. Vous arrivez sur « Demande envoyée », puis la réservation apparaît dans « Mes réservations » avec le statut « En attente ». L'acceptation par le loueur est simulée dans la base.

## Paiement

Prix de démonstration : 3 jours × 22 € = 66 €, plus **10 % de frais de service** (6,60 €), plus l'**option sérénité** facultative (12 €, nettoyage du kit par le loueur), plus une **caution de 150 €**. Total : **222,60 €** sans l'option, **234,60 €** avec.

- Paiement indirect simple : la locataire paie la plateforme, une part est transférée au loueur (Stripe Connect, mode test).
- Page de paiement **hébergée par Stripe** : aucune donnée de carte ne transite par le site.
- La plateforme garde les frais de service et la caution ; le loueur reçoit la location et l'option sérénité.
- La caution est encaissée puis remboursée manuellement après l'état des lieux de retour (une pré-autorisation Stripe ne tient que 7 jours).
- Les **montants sont recalculés côté serveur** à partir des prix de la base, jamais à partir de la page.
- Pas de webhook : la réservation est créée à l'envoi de la demande et peut exister sans paiement terminé.

## Sécurité et données personnelles

- **Aucune clé secrète dans le dépôt ni dans le code du site.** La clé secrète Stripe vit dans les Secrets de Supabase, utilisée uniquement par l'Edge Function de paiement, côté serveur.
- **Aucune écriture directe depuis le navigateur** : créer une réservation passe par le serveur.
- **RLS (Row Level Security) activée sur les 8 tables** : une utilisatrice ne lit que son profil et ses réservations. Détail dans [`docs/RLS.md`](docs/RLS.md).
- **RGPD** : anonymisation du compte à la demande (on n'efface pas, on anonymise puis on désactive la connexion), durées de conservation définies, données envoyées aux services tiers limitées au strict nécessaire. Une table `demandes_suppression` trace les demandes.
- Seule la tranche d'âge du kit est utilisée : aucune donnée sur les enfants n'est collectée.

## Documentation

| Document | Contenu |
|---|---|
| [`docs/Note-de-cadrage-mini-vadrouille.md`](docs/Note-de-cadrage-mini-vadrouille.md) | Problème, proposition de valeur, personas, objectifs SMART, périmètre MVP, grille de stack, risques |
| [`docs/ERA.md`](docs/ERA.md) | Diagramme entité-relation de la base Supabase (8 tables) |
| [`docs/RLS.md`](docs/RLS.md) | Règles de sécurité des données, table par table |

## Structure du projet

```
src/
  routes/         une page par fichier (accueil, recherche, fiche kit, connexion, paiement…)
  components/     composants du site, dont components/ui (bibliothèque shadcn/ui)
  data/           données et accès aux kits (kits.ts, demo.ts)
  integrations/   connexion à Supabase (client, types générés)
  lib/, hooks/    utilitaires
  test/           tests automatisés
public/           images et PDF servis tels quels
docs/             documentation du projet
supabase/         configuration Supabase
```

## Limites connues

Ces points sont assumés et expliqués ici pour ne rien cacher :

- **Démonstration centrée sur la locataire** : pas d'écrans loueur ni administrateur. L'acceptation de la demande est simulée dans la base.
- **Pas de webhook Stripe** : une réservation peut exister sans paiement terminé.
- **Frais Stripe** : la plateforme les supporte sur la totalité du paiement, caution comprise (environ 7,43 € de frais pour 6 € de frais de service gardés sur un paiement test de 228 €). Pistes pour un lancement réel : ligne « frais de paiement » pour la locataire, taux de service plus élevé, ou pré-autorisation de la caution.
- **Tous les paiements de test vont au même compte connecté** (celui de Thomas), quel que soit le propriétaire du kit.
- **Non codés en V1** : e-mails automatiques, annulation par la locataire, remboursement de la caution et refus automatique à 24 h (décrits dans le cahier des charges).
- **Dates de recherche** : elles ne filtrent pas les kits, car les réservations des autres utilisateurs ne sont volontairement pas lisibles.
- **Données en dur dans le code** : notes, nombres d'avis, textes et prénoms des loueurs, et photos des kits (`src/data/kits.ts`). Ce sont des textes fictifs de démonstration.
- **Pas de Supabase Realtime** pour l'instant.
- Le code de la fonction de paiement est hébergé côté Supabase et n'est pas encore versionné dans ce dépôt.
- Base Supabase sur le plan gratuit : elle peut se mettre en pause après une semaine d'inactivité.

## Prochaines étapes

- Fonctionnalité IA : aide à la compatibilité entre le vélo de la locataire et le kit, réponse informative à confirmer avec le loueur, clé d'API dans les Secrets Supabase.
- Automatisation : refus automatique à 24 h des demandes sans réponse, veille concurrence hebdomadaire avec Claude Cowork.
- Versionner l'Edge Function de paiement dans `supabase/functions/`.
- Documentation utilisateur et page de confidentialité.
- Une vue de suivi dynamique des réservations (Supabase Realtime).

## Historique du projet

Le projet a été conçu avec Stitch et généré avec Lovable. Le **20 octobre 2026**, le code a été repris dans ce dépôt GitHub pour être déployé en autonomie sur Vercel, avec un nom de domaine personnalisé. L'historique Git de ce dépôt commence à cette date ; les commits sont nommés « Mx - description » (x = numéro du module de la formation).
