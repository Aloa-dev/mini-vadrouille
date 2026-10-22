# Audit de sécurité : Mini Vadrouille

**Date :** 22 octobre 2026
**Réalisé par :** Claude Code, avec Aloa (qui a fourni les accès et validé chaque étape)
**Type d'audit :** relecture du code et de la configuration du dépôt, plus quelques contrôles publics sur le site en ligne (`https://www.mini-vadrouille.fr`). **Ce n'est pas un test d'intrusion.** Rien n'a été modifié dans le projet pendant la collecte.

## 1. Périmètre et méthode

| Zone | Ce qui a été fait | Outil |
|---|---|---|
| Secrets dans le code | Recherche de motifs de clés (Stripe `sk_`, `rk_`, `whsec_`, Groq `gsk_`, clés privées, AWS) dans tous les fichiers suivis par Git | `git grep` |
| Secrets dans l'historique | Même recherche dans **tous les commits** ; vérification qu'aucun `.env` n'a jamais été ajouté | `git log -G`, `git log --diff-filter=A` |
| Dépendances | Comparaison des paquets à la base de failles connues, dans un dossier temporaire hors projet | `npm audit` |
| Site en ligne | Lecture des en-têtes HTTP, redirection HTTP vers HTTPS, redirection du domaine nu | `curl -I` (requêtes publiques) |
| Code sensible | Relecture des deux Edge Functions, du client Supabase, des formulaires de connexion, recherche de motifs dangereux (`innerHTML`, `eval`…) | lecture du code, `git grep` |
| Comportement du site | Parcours de liens, boutons et pages en tant que visiteur non connecté (voir `docs/TESTS-EXPLORATION.md`) | navigateur intégré |

## 2. Résumé

| Gravité | Nombre | Détail |
|---|---|---|
| Élevée | 0 | Aucun secret exposé, aucune faille directement exploitable repérée |
| Moyenne | 4 | En-têtes de sécurité manquants ; dépendances de développement vulnérables ; réservations « fantômes » sans webhook ; CORS ouvert sur la fonction de paiement |
| Faible | 6 | Voir section 4 |
| Information | 3 | Voir section 4 |

## 3. Ce qui est en bon état (vérifié)

- **Aucun secret dans les fichiers suivis par Git** : aucun motif de clé Stripe, Groq, webhook ou clé privée.
- **Aucun secret dans l'historique** : aucun des motifs recherchés n'apparaît dans aucun des 12 commits.
- **`.env` n'a jamais été commité.** Seul `.env.example` est suivi, et il ne contient aucune valeur (le mot `service_role` n'y apparaît que dans un commentaire).
- **HTTPS partout** : `http://` redirige en 308 vers `https://`, le domaine nu redirige vers `www`, et l'en-tête `Strict-Transport-Security` (2 ans) est présent.
- **Pas d'injection HTML dans le code applicatif** : aucun `innerHTML`, `eval` ou `new Function`. Seul `dangerouslySetInnerHTML` apparaît dans `src/components/ui/chart.tsx` (composant de bibliothèque qui injecte du style depuis une configuration interne, sans donnée utilisateur).
- **Redirection après connexion sécurisée** : `safeRedirect` n'accepte que des chemins internes (un test automatique vérifie que `//evil.com` est refusé).
- **Fonction de paiement** : montants **recalculés côté serveur** à partir de la base, jamais depuis la page ; refus de toute clé Stripe qui ne commence pas par `sk_test_` ; connexion vérifiée côté serveur ; entrées contrôlées.
- **Fonction IA** : connexion obligatoire, CORS restreint à `www.mini-vadrouille.fr`, `mini-vadrouille.fr` et localhost, texte limité à 500 caractères, délai de 20 s, aucune donnée personnelle envoyée à l'IA (ni e-mail, ni nom, ni profil), texte de la locataire jamais journalisé, clé uniquement dans les Secrets Supabase.
- **Gestion des clés** : la clé Mistral inutilisée a été supprimée, la clé Groq a une date d'expiration.

## 4. Constats et recommandations

| # | Gravité | Constat | Recommandation | Statut |
|---|---|---|---|---|
| 1 | Moyenne | **En-têtes de sécurité manquants** sur le site : seul `Strict-Transport-Security` est présent. Absents : `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options` (ou `frame-ancestors`), `Referrer-Policy`, `Permissions-Policy` | Ajouter les en-têtes simples dans un fichier `vercel.json`. La politique CSP demande des essais (Stripe, Supabase, polices Google) : à reporter | À décider |
| 2 | Moyenne | **5 vulnérabilités de dépendances** (4 modérées, 1 haute) : `vite` (haute : exécution de script depuis un autre site via un middleware du serveur de développement, fichiers hors périmètre servis sur d'autres systèmes), `esbuild` (le serveur de développement répond à n'importe quel site), `drizzle-kit` et deux paquets `@esbuild-kit` qui en dépendent. **Toutes concernent les outils de développement**, pas le site servi par Vercel | Ne lancer `npm run dev` que le temps nécessaire, et ne pas naviguer sur des sites non fiables pendant ce temps. Mise à jour de `vite` et `drizzle-kit` après la soutenance, avec tests (la version de `vite` est fixée par la configuration Lovable) | Assumé jusqu'après le jury |
| 3 | Moyenne | **Réservations « fantômes »** : la réservation est créée avant la fin du paiement (pas de webhook Stripe). Une personne connectée peut créer des demandes sans payer et bloquer les dates d'un kit | La tâche planifiée qui fait expirer les demandes à 24 h réduit le problème (hypothèse : à vérifier que les dates sont libérées). Webhook Stripe en version suivante | Assumé |
| 4 | Moyenne | **CORS ouvert à tous** (`Access-Control-Allow-Origin: *`) sur la fonction de paiement. Le risque est limité (la connexion est exigée et le jeton ne peut pas être lu depuis un autre site) | Restreindre aux domaines du projet, comme sur la fonction IA | À décider |
| 5 | Faible | `SUPABASE_SERVICE_ROLE_KEY` est marquée **dépréciée** par Supabase (remplacée par `SUPABASE_SECRET_KEYS`) et lue par les deux fonctions | Migrer après la soutenance | Assumé |
| 6 | Faible | **Messages d'erreur verbeux** dans la fonction de paiement (message de la base, valeurs de statut) | Renvoyer des messages génériques, garder le détail dans les journaux | À décider |
| 7 | Faible | **Pas de limite par utilisateur** sur la fonction IA : une personne connectée peut épuiser le quota gratuit de Groq (environ 1 000 requêtes par jour) | Quota par compte en version suivante. Pour la démo : 1 à 2 questions à la minute | Assumé |
| 8 | Faible | **Injection d'instructions (prompt injection)** : atténuée (consignes strictes, texte encadré, test de détournement réussi) mais jamais éliminée | Garder les consignes, ne donner à l'IA aucun accès ni outil | Assumé |
| 9 | Faible | **Clé publique Supabase et URL du projet écrites en dur** dans `src/integrations/supabase/client.ts`, depuis le premier commit (fichier généré par Lovable). Ce n'est pas un secret (faite pour le navigateur) : la protection repose sur la RLS | Lire ces valeurs depuis les variables d'environnement | À décider |
| 10 | Faible | **Adresse e-mail de démonstration préremplie** sur le formulaire d'inscription public (une adresse Gmail de test, prénom « Chloé »), présente dans le code public. Choix de commodité pour la démo | La retirer après la soutenance (ou la remplacer par un texte d'exemple) | **Corrigé le 22/10** : le formulaire d'inscription n'est plus prérempli |
| 11 | Faible | **Données traitées par un tiers** : le texte décrivant le vélo est envoyé à Groq (société américaine). La politique de réutilisation des données de l'offre gratuite n'a pas été vérifiée | Lire les conditions de Groq ; l'avertissement « ne saisissez ni nom ni coordonnées » est affiché sous le champ | À vérifier |
| 12 | Information | **Secrets partagés** : les Secrets des Edge Functions sont communs à toutes les fonctions du projet | Rien à faire à cette échelle | Noté |
| 13 | Information | **Confirmation d'e-mail désactivée** à l'inscription (décision pour la démo) : n'importe quelle adresse peut créer un compte | La réactiver pour un vrai lancement | Assumé |
| 14 | Information | **Latence** : les fonctions du site s'exécutent à Washington (`iad1`) alors que les visiteurs sont en France | Choisir une région plus proche de Supabase dans les réglages Vercel (région de Supabase à confirmer) | Noté |

## 5. Ce qui n'a PAS été vérifié

- Les **politiques RLS réelles** dans Supabase : elles sont décrites dans `docs/RLS.md` (reprises d'un travail antérieur, testées en local), mais pas relues depuis ce dépôt. **Preuves à produire :** capture des politiques, démonstration à deux comptes.
- Les **réglages d'authentification de Supabase** (par exemple la vérification des mots de passe déjà divulgués, signalée comme point d'information par l'analyse de Lovable).
- Le **contenu des variables d'environnement** de Vercel et des Secrets de Supabase (seuls leurs noms ont été examinés).
- Les réglages du compte **Stripe** (mode test uniquement, d'après Aloa).
- Les **mises à jour des dépendances** : l'audit a été fait sur une résolution neuve des versions (le projet utilise `bun.lock`), les versions réellement déployées peuvent différer légèrement.
- Aucun **test d'intrusion**, aucun test de charge, aucune analyse du code côté Supabase hors Edge Functions.

## 6. Conclusion

Aucune faille directement exploitable et aucun secret exposé n'ont été trouvés dans le périmètre examiné. Les points les plus utiles à traiter sont les **en-têtes de sécurité** (correction simple) et la **restriction du CORS** de la fonction de paiement. Les autres sont des limites assumées d'un projet de démonstration (pas de webhook, pas de quota par utilisateur, mise à jour des outils de développement après la soutenance), à présenter comme telles.
