# Mini Vadrouille

**Marketplace de location de kits vélo pour familles.** Des parents expérimentés louent leur matériel (remorque, siège enfant, vélo suiveur, sacoches…) à d'autres familles qui veulent partir en « vadrouille » à vélo avec leurs enfants, avec l'esprit tranquille.

Projet réalisé dans le cadre de la formation *vibe coding* (certification BC02), présenté au jury le 27 octobre 2026.

- **Site en ligne :** https://www.mini-vadrouille.fr
- **Statut :** démonstration fonctionnelle, centrée sur le parcours de la **locataire** (recherche, fiche kit, inscription et connexion, demande de réservation avec paiement en mode test, suivi des réservations). Aucun vrai paiement n'est possible.

## Fonctionnalités

- Recherche de kits par ville, nombre d'enfants et âge (résultats partageables par l'URL).
- Fiche détaillée d'un kit : galerie, équipement, compatibilité, conseils, total avec option sérénité.
- Inscription, connexion et déconnexion (Supabase Auth).
- Demande de réservation avec paiement via **Stripe en mode test**.
- Page « Mes réservations » : chaque utilisatrice ne voit que les siennes.
- Guide du parent cycliste téléchargeable (PDF).

## Stack technique

| Rôle | Outil |
|---|---|
| Framework web | [TanStack Start](https://tanstack.com/start) (React 19, TypeScript, routage par fichiers) |
| Style | Tailwind CSS 4, composants shadcn/ui (Radix UI) |
| Outil de build | Vite |
| Base de données et authentification | [Supabase](https://supabase.com) (PostgreSQL, Auth, Edge Functions) |
| Paiement | [Stripe](https://stripe.com) en mode test, appelé depuis une Edge Function Supabase |
| Hébergement | [Vercel](https://vercel.com), déploiement automatique à chaque `git push` sur `main` |
| Nom de domaine | OVHcloud (DNS pointant vers Vercel, HTTPS automatique) |
| Tests | Vitest et Testing Library |

Le squelette du projet a été généré avec [Lovable](https://lovable.dev), puis repris, corrigé et déployé en autonomie.

## Installation et lancement en local

Prérequis : [Node.js](https://nodejs.org) (version LTS récente) et npm.

```sh
git clone https://github.com/Aloa-dev/mini-vadrouille.git
cd mini-vadrouille
npm install
cp .env.example .env     # puis renseigner les valeurs (voir ci-dessous)
npm run dev
```

Autres commandes utiles :

| Commande | Rôle |
|---|---|
| `npm run build` | Construit le site pour la production |
| `npm run preview` | Prévisualise la version construite |
| `npm test` | Lance les tests (Vitest) |
| `npm run lint` | Vérifie la qualité du code (ESLint) |
| `npm run format` | Reformate le code (Prettier) |

## Variables d'environnement

Le fichier `.env.example` liste les variables attendues, **sans aucune valeur**. Le vrai fichier `.env` est ignoré par Git (voir `.gitignore`) et ne doit jamais être publié.

| Variable | Rôle |
|---|---|
| `VITE_SUPABASE_URL`, `SUPABASE_URL` | Adresse du projet Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY` | Clé **publique** (« publishable ») de Supabase, faite pour être lue par le navigateur |
| `VITE_SUPABASE_PROJECT_ID`, `SUPABASE_PROJECT_ID` | Identifiant du projet Supabase |

Sur Vercel, les mêmes variables sont définies dans *Settings → Environment Variables*.

## Utilisation

1. Ouvrir le site et lancer une recherche depuis l'accueil (par exemple « Bordeaux »).
2. Ouvrir la fiche d'un kit.
3. Créer un compte ou se connecter.
4. Choisir des dates et demander la réservation : la page de paiement Stripe s'ouvre en **environnement de test**.
5. Payer avec la carte de test publique de Stripe : `4242 4242 4242 4242`, une date d'expiration future et trois chiffres au choix pour le code de sécurité.
6. La réservation apparaît dans « Mes réservations » (statut « en attente »).

## Sécurité et données personnelles

- **Aucune clé secrète dans le dépôt ni dans le code du site.** La clé secrète Stripe vit dans les *Secrets* de Supabase et n'est utilisée que par l'Edge Function de paiement, côté serveur.
- **Aucune écriture directe depuis le navigateur** : créer une réservation passe par le serveur.
- **RLS (Row Level Security) activée sur les 8 tables** de la base : une utilisatrice ne lit que son profil et ses réservations. Détail dans [`docs/RLS.md`](docs/RLS.md).
- Aucune donnée de carte bancaire ne transite par le site : le paiement se fait sur la page hébergée par Stripe.

## Documentation

- [`docs/ERA.md`](docs/ERA.md) : diagramme entité-relation de la base Supabase (8 tables).
- [`docs/RLS.md`](docs/RLS.md) : règles de sécurité des données, table par table.

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
docs/             documentation technique
supabase/         configuration Supabase
```

## Limites connues

- Démonstration : le parcours **loueur** (accepter ou refuser une demande) n'est pas développé.
- Les notes et nombres d'avis affichés, ainsi que les photos des kits, sont gérés côté site et non lus depuis la base.
- Les dates saisies dans la recherche ne filtrent pas les kits par disponibilité (les réservations d'autres utilisateurs ne sont volontairement pas lisibles).
- Le code de la fonction de paiement est hébergé côté Supabase et n'est pas encore versionné dans ce dépôt.
- La base Supabase est sur le plan gratuit : elle peut se mettre en pause après une semaine d'inactivité.
