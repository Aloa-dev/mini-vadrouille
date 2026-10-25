# Test de navigation au clavier : Mini Vadrouille

**Date du test :** 25 octobre 2026
**Site testé :** https://www.mini-vadrouille.fr (production)
**Testeuse :** Aloa, sans utiliser la souris
**Objectif :** vérifier que les écrans principaux sont utilisables avec le clavier seul (point 10 de la checklist Qualité Produit).

## Méthode

Chaque page est chargée une fois, puis la souris n'est plus utilisée. Touches employées : `Tab` et `Maj + Tab` (élément suivant ou précédent), `Entrée` (lien, bouton), `Espace` (case à cocher, bouton), flèches (calendrier, listes), `Échap` (fermer le calendrier).

Quatre contrôles par page :
1. **Atteignable** : chaque lien, bouton et champ utile reçoit le focus.
2. **Ordre logique** : de haut en bas, de gauche à droite.
3. **Focus visible** : un contour ou un halo marque l'élément actif.
4. **Aucun piège** : on peut toujours sortir d'un menu ou d'un calendrier.

## Résultats

| Écran | Atteignable | Ordre logique | Focus visible | Aucun piège | Remarque |
|---|---|---|---|---|---|
| Accueil | OK | OK | OK | OK | Calendrier de dates utilisable aux flèches, fermé avec `Échap` |
| Recherche | OK | OK | OK | OK | Parcours complet réalisé sans souris |
| Fiche kit | OK | OK | OK | OK | Bloc d'aide à la compatibilité inclus |
| Connexion et inscription | OK | OK | OK | OK | Case à cocher des CGU activable à `Espace`, liens « CGU » et « politique de confidentialité » atteignables |
| Paiement (côté site) | OK | OK | OK | OK | Page de paiement hébergée par Stripe incluse dans le parcours |
| Mes réservations | OK | OK | OK | OK | Statut visible après la demande |
| Guide d'utilisation et confidentialité | OK | OK | OK | OK | |

**Conclusion :** le parcours complet de la locataire (recherche, fiche kit, connexion, demande de réservation, paiement, suivi dans « Mes réservations ») a été réalisé de bout en bout au clavier, sans aucune action à la souris.

## Vérification complémentaire automatisée (25/10)

Une inspection par script sur le site en ligne (déconnectée) a relevé, pour l'accueil, l'inscription et le guide d'utilisation : aucun `tabindex` positif, aucun élément cliquable inaccessible au clavier, un ordre de focus cohérent, un contour ou un halo de focus présent sur chaque élément, et un retour au début de la page après le dernier élément (pas de piège). Cette inspection ne remplace pas le test manuel ci-dessus.

## Limites assumées

- Pas de test avec un lecteur d'écran.
- Pas de test sur mobile avec clavier externe.
- Le contraste des couleurs est couvert à part (rapports Lighthouse dans `docs/audit-accessibilite/`).

## Preuve vidéo

Un enregistrement d'écran du parcours au clavier (`Mini_vadrouille_test_clavier.mp4`, environ 70 Mo, réalisé le 25 octobre 2026) est conservé hors du dépôt à cause de sa taille : lien dans la page Notion du jury.
