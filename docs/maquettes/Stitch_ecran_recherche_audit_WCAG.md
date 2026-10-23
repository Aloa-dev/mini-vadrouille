# Rapport d'Audit d'Accessibilité Numérique (WCAG 2.1 AA / RGAA)
**Écran audité :** `Résultats de recherche - Kits vélo à Bordeaux` ({{DATA:SCREEN:SCREEN_36}})  
**Application :** Mini Vadrouille (Marketplace location matériel vélo famille)  
**Date d'évaluation :** Mai 2026  
**Référentiel de conformité :** Web Content Accessibility Guidelines (WCAG) 2.1 Niveau AA / RGAA 4.1.2  

---

## Synthèse Exécutive

| Critère WCAG 2.1 | Statut Global | Niveau d'impact |
| :--- | :--- | :--- |
| **1. Perceptible** (Contrastes, alternatives textuelles, structure visuelle) | ⚠️ Conforme partiel | Moyen |
| **2. Utilisable** (Navigation clavier, focus visible, cibles tactiles) | ⚠️ Améliorations requises | Moyen |
| **3. Compréhensible** (Lisibilité, cohérence des libellés, formulaires de recherche) | ✅ Conforme | Faible |
| **4. Robuste** (Sémantique HTML5, attributs ARIA, compatibilité lecteurs d'écran) | ⚠️ Conforme partiel | Moyen |

**Score global estimé :** **80 / 100**

L'écran présente une clarté remarquable, une excellente hiérarchie visuelle globale et une police très lisible (Outfit). L'analyse approfondie du code HTML/CSS révèle toutefois des points d'amélioration ciblés pour satisfaire pleinement le niveau WCAG 2.1 AA et le RGAA.

---

## 1. Perceptible

### 1.1 Alternatives textuelles des images (Critère WCAG 1.1.1 - Niveau A)
* **Photos des 4 annonces de kits vélo :**
  - Les photos d'annonces (remorque Thule en cour pavée, vélo vintage avec siège enfant, vélo enfant tracté sur piste de dune, remorque avec sacoches sur terrasse) doivent comporter des descriptions fonctionnelles précises et contextualisées (ex. `alt="Remorque pour enfant Thule Chariot Cross 2 turquoise stationnée dans une cour pavée"`, `alt="Vélo de ville vert avec siège enfant Thule fixé à l'arrière"`).
  - Éviter les libellés génériques ou vides sur les photos de produits qui portent une information visuelle déterminante pour le locataire.
* **Avatars des loueurs (Sophie, Camille, Claire, Thomas) :**
  - Les photos de profil des loueurs comportent un libellé approprié mais méritent d'expliciter le statut (ex. `alt="Portrait de Thomas, vadrouilleur expert"`).
* **Éléments purement décoratifs :**
  - Les pictogrammes d'étoiles (avis), coches, icônes d'épingle de localisation et de calendrier doivent comporter systématiquement `aria-hidden="true"` lorsque le texte contigu formule déjà l'information (ex. `★ 4.98 (34 avis)`).

### 1.2 Ratios de contraste des couleurs (Critère WCAG 1.4.3 - Niveau AA)
* **Typographie principale Vert Sapin (`#12403C`) :**
  - Sur fond crème chaud `#FBF9F6` ou conteneur blanc `#FFFFFF`, le ratio dépasse **11.5:1**, garantissant une excellente lisibilité (seuil AA : 4.5:1).
* **Badges pastel des tranches d'âge :**
  - **Badge Menthe (`9-18 mois` / `18 mois-3 ans`) :** Le texte vert sombre sur fond menthe doux offre un ratio supérieur à **5.8:1** ✅.
  - **Badge Pêche :** Ratio supérieur à **6.2:1** ✅.
  - **Badge Jaune Doré (`3-6 ans`) :** Ratio supérieur à **5.5:1** avec le texte vert foncé `#12403C` ✅. Veiller à ne pas utiliser de gris secondaire sur ce fond jaune.
* **Bouton d'action de recherche et CTA (« Trouver un kit », « Découvrir ce kit ») :**
  - **Bouton rouge/corail (`#D83A54`) :** Le texte blanc sur `#D83A54` offre un ratio conforme de **4.7:1** (seuil minimal 4.5:1 pour texte normal).
  - **Boutons « Découvrir ce kit » (`#12403C`) :** Le texte blanc sur vert sapin foncé offre un ratio supérieur à **11:1** ✅.
* **Mentions secondaires en gris :**
  - Les mentions secondaires telles que « Estimation du loueur, selon son expérience » ou les dates du séjour doivent conserver une couleur d'au moins `#4B5563` ou `#2F5551` afin d'éviter de descendre sous le ratio requis de 4.5:1.

---

## 2. Utilisable

### 2.1 Navigation au clavier et Focus Visible (Critères WCAG 2.1.1 & 2.4.7 - Niveau AA)
* **Indicateurs de focus interactifs :**
  - Les filtres de recherche (« Point de départ », « Dates », « Nombre d'enfants », « Âge »), le bouton « Trouver un kit » ainsi que les 4 boutons « Découvrir ce kit » doivent comporter un contour de focus visible et contrasté lors de la navigation à la touche Tabulation : `focus-visible:ring-2 focus-visible:ring-[#12403C] focus-visible:ring-offset-2`.
* **Sélecteurs de filtres (Boutons bascules) :**
  - Les filtres d'âge (« 9–18 mois », « 18 mois–3 ans », « 3–6 ans ») et de nombre d'enfants (« 1 enfant », « 2 enfants ») agissent comme des contrôles d'état : ils doivent intégrer l'attribut `aria-pressed="true|false"` pour annoncer immédiatement leur sélection aux utilisateurs de technologies d'assistance.

### 2.2 Cibles tactiles (Critère WCAG 2.5.5 / 2.5.8 - Niveau AA)
* Les pastilles de filtres et les boutons d'action respectent une taille interactive confortable (hauteur ≥ 44px avec marges suffisantes).

---

## 3. Compréhensible

### 3.1 Clarté des libellés et cohérence (Critères WCAG 3.1 & 3.2)
* Déclaration de la langue de la page en français (`lang="fr"`).
* Titre de page et en-tête clairs : « 4 kits disponibles autour de Bordeaux ».
* Cohérence des unités de tarification (« 22 € / jour », « 15 € / jour », etc.) et transparence sur la durée d'engagement (« Jusqu'à 4 jours de voyage »).

---

## 4. Robuste

### 4.1 Sémantique HTML5 et structure d'arborescence (Critères WCAG 1.3.1 & 4.1.2)
* **Structure de la liste des résultats :**
  - La grille des 4 annonces de kits vélo doit être encapsulée dans une liste sémantique `<ul role="list">` avec des éléments `<li>` pour chaque carte. Cela permet aux lecteurs d'écran (VoiceOver, NVDA, JAWS) d'annoncer : *« Liste de 4 éléments »* et de naviguer aisément d'une annonce à l'autre.
* **Hiérarchie des titres (Headings) :**
  - `<h1>` : « 4 kits disponibles autour de Bordeaux ».
  - `<h2>` : Titre de chaque kit (« Kit Explorateur Curieux », « Kit Petit Cocon », « Kit Mini Baroudeur ») pour permettre le saut direct d'annonce en annonce via le raccourci `H` des lecteurs d'écran.
* **Groupements ARIA :**
  - Les blocs de boutons de filtres d'âge et de nombre d'enfants doivent porter `role="group"` avec un `aria-label` ou `aria-labelledby` associé.

---

## Plan d'actions et Recommandations Prioritaires

1. **Structure de liste sémantique :** Encapsuler les 4 cartes de résultats dans une liste `<ul role="list">` / `<li>`.
2. **Attributs ARIA sur les filtres :** Ajouter `aria-pressed="true|false"` sur les pastilles de filtre sélectionnables et `role="group"` sur les ensembles de choix.
3. **Alternatives textuelles des photos :** Renseigner des attributs `alt` précis et descriptifs pour chacune des 4 photos de kits vélo.
4. **Masquage décoratif :** Appliquer `aria-hidden="true"` sur les étoiles de notation et les icônes de calendrier / localisation.
5. **Focus visible :** Assurer la présence des classes `focus-visible:ring-2 focus-visible:ring-[#12403C]` sur tous les éléments cliquables.
