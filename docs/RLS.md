# Sécurité des données : règles RLS de Mini Vadrouille

> **Statut de ce document.** Ces règles proviennent du travail de conception réalisé en amont avec Claude (conversations « Supabase » et « Supabase 2 », fichier de suivi du projet). Elles ont été testées sur un Postgres local puis appliquées au projet Supabase. **Elles n'ont pas été relues ni vérifiées depuis ce dépôt** : la preuve à montrer au jury est la page des politiques du tableau de bord Supabase, et la démonstration à deux comptes décrite en bas de page.

## L'idée en une phrase

Chaque table est comme une pièce avec **trois verrous**. Il faut les trois pour qu'une porte s'ouvre. Par défaut tout est fermé, et on ne rouvre que le strict nécessaire :

1. **Le droit d'entrer** (le *grant*) : qui a le droit de toucher à la table.
2. **La règle de lecture** (la *policy*, ou politique RLS) : quelles lignes la personne voit.
3. **L'exposition de la table dans la Data API** de Supabase : la table est-elle accessible depuis le navigateur.

## Les trois « personnes »

| Rôle Supabase | Qui c'est |
|---|---|
| `anon` | Le visiteur non connecté |
| `authenticated` | L'utilisateur connecté |
| `service_role` | Le serveur, avec tous les pouvoirs. C'est lui qui crée les réservations via la fonction de paiement (Edge Function `creer-reservation-paiement`) |

## Table par table

| Table | Visiteur | Connecté | Serveur | Règle |
|---|---|---|---|---|
| `kits` | lit | lit | tout | Lecture des kits **publiés** par tous. Un loueur connecté lit aussi les siens (policy « Un loueur lit ses propres kits ») |
| `photos_kits` | lit | lit | tout | Photos lisibles seulement si le kit est publié (vide pour la démo) |
| `profils` | rien | lit **sa** ligne | tout | `id = auth.uid()` : chacun voit son profil et personne d'autre |
| `reservations` | rien | lit **les siennes** | tout | `locataire_id = auth.uid()` |
| `adresses_kits` | rien | rien | tout | Fermée : l'adresse exacte ne sort qu'après paiement et acceptation, via le serveur |
| `dates_bloquees` | rien | rien | tout | Fermée |
| `avis` | rien | rien | tout | Fermée (non montrés au jury) |
| `demandes_suppression` | rien | rien | tout | Fermée (preuve RGPD, gérée côté serveur) |

La RLS est activée sur les **8 tables**. Seules **4 tables sont exposées** dans la Data API : `kits`, `photos_kits`, `profils`, `reservations`.

## Ce que ça garantit

- **Aucune écriture depuis le navigateur.** Personne n'a de droit d'écriture côté site : créer une réservation, changer un statut, tout passe par le serveur. Ça empêche aussi de se donner le rôle admin en modifiant son profil, ou de truquer un montant.
- **Deux réservations ne peuvent pas se chevaucher sur un même kit.** Ce n'est pas de la RLS mais une règle de la base de données, observée le 19/10 avec le message « Ces dates ne sont plus disponibles ».
- **Les réservations des autres utilisateurs ne sont pas lisibles.** Conséquence connue : les dates saisies dans la recherche ne filtrent pas les kits (limite assumée).
- **Les clés secrètes restent côté serveur** : la clé Stripe secrète vit dans les Secrets Supabase et n'est utilisée que par l'Edge Function.

## Limites connues et choix assumés

- Pas encore de règle **admin** : un futur tableau de bord n'aurait pas de droit de lecture global.
- Pas encore de règle pour qu'un **loueur lise les réservations de ses kits**, ni pour l'**adresse après acceptation**, ni pour les **avis**. Non nécessaire pour la démo.
- Le **prénom des loueurs** est écrit en dur dans le code du site, pas lu dans `profils`, puisque cette table est privée. C'est un choix assumé.
- Les **notes et nombres d'avis** affichés sont également en dur (`src/data/kits.ts`), alors que la table `avis` existe et est fermée.

## Preuves à préparer pour le jury

- [ ] Capture du tableau de bord Supabase montrant la RLS activée sur les 8 tables et la liste des politiques.
- [ ] Démonstration à deux comptes : un premier compte voit **ses** réservations, un second compte voit une **liste vide** (même page, mêmes requêtes).
- [ ] Démonstration qu'un visiteur non connecté ne peut pas lire `profils` ni `reservations`.
- [ ] Capture des variables d'environnement côté Vercel (aucune clé secrète) et des Secrets côté Supabase.
