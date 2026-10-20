# Mini Vadrouille — Parcours de demande en démonstration

## Première correction effectuée
Les quatre photos des cartes d’équipement ont été retirées. Titres, icônes et pastilles conservés. Vérification dans la page : aucune photo dans ces cartes, cinq photos dans la galerie et total initial de 222,60 €.

## Direction visuelle
Conserver exclusivement Outfit et les couleurs validées : crème #FAF8F5, blanc #FFFFFF, vert forêt #12403C, secondaire #3D6662, bordures #E6E1D8, orange #C4501B (survol #AD4516). Champs beiges, boutons en pilule, bandeaux #F5EFEB. Reproduire les compositions propres aux captures : formulaire et récapitulatif à droite, demande envoyée centrée, confirmation en deux colonnes, réservation avec encart de préparation. Aucun nouveau style partagé.

## Contradictions et traitement par écran

### /paiement
- La capture montre un bouton rouge/corail, des accents menthe et du turquoise : appliquer l’orange exact et le vert forêt validés.
- La capture et le HTML montrent l’option cochée et 234,60 € : conserver la règle antérieure, option décochée au premier affichage et 222,60 € ; la cocher actualise le récapitulatif et le bouton à 234,60 €.
- Le HTML reçu dit déjà « Débitée à l’envoi de la demande » : le conserver ; ne jamais afficher « Débitée à la réservation ».
- Harmoniser « Paiement & Demande » en « Paiement & demande » dans les étapes. Première étape cochée, deuxième en cours, troisième à venir.
- Les références montrent Chloé connectée : réutiliser l’en-tête actuel sans créer de connexion ni simuler un compte connecté.
- La capture affiche un paiement Stripe ; conserver ses textes de référence mais aucun débit ni collecte réelle de carte. Les champs restent une démonstration, sans stockage ni envoi des données bancaires.
- Badge « + 12,00 € » toujours sur une seule ligne.

### /demande-envoyee
- Accents turquoise/menthe et bouton rectangulaire de la capture : utiliser vert forêt et boutons existants en pilule.
- Le texte d’e-mail fourni correspond déjà au HTML reçu : le reprendre exactement.
- Étapes 1 et 2 cochées, « Réponse de Thomas » en cours ; « EN COURS » en vert forêt.
- Récapitulatif de la démonstration MV-8841 à 234,60 €, option incluse. Lien vers /mes-reservations et retour vers /recherche.
- En-tête et pied de page existants inchangés.

### /reservation-confirmee
- Le guide (PDF) et les pastilles sont coupés ou superposés dans la capture : conserver les mots, augmenter l’espace et empêcher le retour à la ligne à l’intérieur d’une pastille ou de « (PDF) ».
- Le HTML reçu comporte déjà le nom sans « (Inclinable) » et la phrase « Option sérénité incluse : Thomas s’occupe du nettoyage, rendez simplement le kit. » : les conserver, sans proposer de nouveau cette option.
- Toutes les étapes cochées, dernière nommée « Confirmation ».
- Les accents menthe deviennent du vert forêt atténué.
- Le HTML contient un message masqué annonçant une synchronisation des agendas : ne pas l’afficher, aucun agenda n’étant connecté.
- Aucun guide PDF n’est joint : conserver le bouton sans fabriquer un document ni un téléchargement trompeur.

### /mes-reservations
- La référence n’affiche qu’une réservation acceptée : conserver cette composition et enregistrer les quatre statuts possibles dans les données, sans inventer trois autres réservations.
- Bordures menthe remplacées par du vert forêt atténué ; rouge réservé à l’annulation et aux erreurs.
- Le HTML contient un encart « Aucune location terminée pour l’instant » absent de la capture : le reprendre conformément à la priorité donnée au HTML pour les textes.
- La réservation acceptée ouvre /reservation-confirmee. L’état des lieux reste indisponible comme dans la référence ; aucun écran supplémentaire.
- Bouton de guide conservé sans faux téléchargement. L’annulation reste une action de démonstration, sans effet réel sur une réservation.

## Construction et navigation
- Réutiliser en-tête, pied de page, boutons, cartes, pastilles, champs et données existants.
- Seuls changements supplémentaires sur /kits/thomas : relier « Continuer vers la demande » à /paiement. Aucun changement de l’accueil ni de /recherche.
- Parcours : /kits/thomas → /paiement → /demande-envoyee → /mes-reservations → /reservation-confirmee.
- Conserver MV-8841, dates, horaires, adresse et calculs dans le fichier unique de données de démonstration.
- Pas de paiement réel, connexion, inscription, base de données, e-mail envoyé ou agenda connecté.

## Vérifications
- Parcourir la démonstration complète en cochant l’option sérénité : 222,60 € puis 234,60 €, et 234,60 € sur les écrans suivants.
- Vérifier textes de référence, mots interdits, photos existantes, minimum 14 px, pastilles non coupées et absence de débordements sur ordinateur et téléphone.
- Vérifier que l’accueil, les résultats et le reste de la fiche de Thomas sont préservés.
- Donner les chemins des quatre pages et la liste des différences de textes, limitée aux corrections explicites ci-dessus.

## Détails techniques
Conserver TanStack Start et Tailwind v4. Créer quatre routes avec leurs propres titres et descriptions de partage. Réutiliser src/data/demo.ts et les composants existants ; ajouter un indicateur d’étapes commun uniquement au nouveau parcours. Tous les contrôles de démonstration restent locaux à la page, sans persistance ni appel de paiement.
