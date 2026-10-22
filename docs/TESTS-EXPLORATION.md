# Tests d'exploration : « utilisateur curieux »

**Date :** 22 octobre 2026
**Méthode :** parcours du site en production (`https://www.mini-vadrouille.fr`) en tant que **visiteur non connecté**, avec le navigateur intégré de Claude Code : extraction de tous les liens et boutons, contrôle des réponses, clics sur chaque bouton, lecture des erreurs de la console. Rien n'a été envoyé : aucune connexion, aucune inscription, aucune réservation, aucun paiement.

## Résultats

| Contrôle | Résultat |
|---|---|
| Liens de la page d'accueil (15) | Tous mènent quelque part : pages internes en 200, ancres présentes (`#criteres`, `#comment-ca-marche`, `#pourquoi`, `#kits`), guide PDF en 200 |
| Liens externes | Aucun |
| Liens vides (`#` ou `javascript:`) | Aucun |
| Pages : accueil, recherche, 4 fiches kit, connexion, inscription, paiement, mes réservations, demande envoyée, réservation confirmée | Toutes répondent en 200 |
| Pages inexistantes | `/page-qui-nexiste-pas` et `/kits/inexistant` renvoient bien une erreur 404 |
| Images (accueil, recherche, fiche kit) | Aucune image cassée, aucune ressource en échec au chargement de la fiche de Thomas |
| Boutons de l'accueil (8) | Tous réagissent : menu, dates, nombre d'enfants, tranches d'âge |
| Bloc IA sur la fiche de Thomas (déconnecté) | Présent, champ grisé avec étiquette, bouton « Se connecter pour vérifier » qui ramène sur la fiche après connexion |
| Bouton « Se connecter » de l'en-tête | Conserve la page d'origine |
| Recherche « Bordeaux » | 3 kits affichés, comme décidé |
| Accessibilité des pages testées | Pas d'image sans texte alternatif ni de lien sans nom sur la recherche ; `lang="fr"`, un seul titre principal, zone `main` présente |
| Navigation clavier (échantillon) | Avec la touche Tab, le focus suit un ordre logique sur les filtres (1 enfant, 2 enfants, tranches d'âge) et un contour visible est affiché sur l'élément actif (vérifié par capture d'écran) |

## Observations (à décider)

1. **Bouton « Partager » de la fiche kit** : il ne donne aucun retour visible (il ouvre le partage du système s'il existe, sinon copie le lien sans rien afficher). **Corrigé le 22/10 : bouton retiré** (il n'apportait pas de valeur à la démo).
2. **Bouton « Sauvegarder » de la fiche kit** : il bascule seulement un état visuel (cœur plein), **rien n'est enregistré** (l'état est perdu au rechargement). **Corrigé le 22/10 : bouton retiré** (une fonction de sauvegarde pourra revenir quand elle enregistrera vraiment).
3. **Formulaire d'inscription** : l'adresse e-mail et le prénom d'une personne de démonstration sont préremplis (voir `docs/AUDIT-SECURITE.md`, constat 10). **Corrigé le 22/10 : champs vides.**
4. **Page `/paiement` ouverte directement** (sans kit choisi) : elle s'affiche avec un paramètre `kit` vide avant la redirection éventuelle vers la connexion. Sans conséquence, mais inélégant.
5. **Une vérification automatique d'un bouton sans nom accessible** sur la page de connexion n'a pas pu être confirmée (le bouton « afficher le mot de passe » a bien un nom) : à revérifier à la main.

## Ce qui n'a pas été testé

- Tous les parcours **connectés** : inscription, connexion, paiement Stripe, « Mes réservations », appel de l'IA en production (l'appel de l'IA a été testé séparément et fonctionne).
- L'affichage **mobile**.
- La navigation clavier **complète** de chaque écran (seul un échantillon a été parcouru) : le point 10 de la checklist demande un passage manuel sur les écrans principaux.
- Le lecteur d'écran réel.
