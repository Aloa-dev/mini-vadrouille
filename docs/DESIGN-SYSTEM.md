# Design system « Warm Family Outdoors » : Mini Vadrouille

Ce document décrit le design system **tel qu'il est appliqué dans le code** (`src/styles.css`, composants dans `src/components/`). Il part du fichier de design généré par Stitch pour les maquettes, adapté pendant la construction du site.

## Intention

Rassurer des parents qui partent pour la première fois à vélo avec un jeune enfant : une interface chaleureuse (fond crème, vert forêt, couleurs douces par tranche d'âge), jamais froide ni technique. Thème clair uniquement, vouvoiement, vocabulaire déclaratif.

## Couleurs

Les couleurs sont définies une seule fois, comme jetons sémantiques en OKLCH dans `src/styles.css`, puis utilisées partout par leur rôle (jamais en valeur écrite dans un composant). Équivalents hexadécimaux calculés à partir des jetons :

| Rôle | Jeton | Valeur | Usage |
|---|---|---|---|
| Fond de page | `--background` | `#FAF8F5` | Toile crème |
| Texte et titres | `--foreground`, `--forest` | `#12403C` | Vert forêt, texte principal |
| Texte secondaire | `--muted-foreground` | `#3D6662` | Légendes, métadonnées |
| Bouton principal | `--primary` | `#C4501B` | Orange brûlé, appel à l'action |
| Bouton principal au survol | `--primary-hover` | `#AD4516` | |
| Bandeau de réassurance, champs | `--muted`, `--reassurance` | `#F5EFEB` | |
| Bordures | `--border` | `#E6E1D8` | Sable, séparation douce |
| Erreur | `--destructive` | `#B91C1E` | |
| Kit Petit Cocon (9–18 mois) | `--cocoon`, `-border`, `-accent` | `#FDEFEA`, `#FCDCD3`, `#E07A5F` | Pêche |
| Kit Explorateur Curieux (18 mois–3 ans) | `--explorer`, `-border`, `-accent` | `#E8F7F4`, `#D1F2E8`, `#239BA7` | Menthe |
| Kit Mini Baroudeur (3–6 ans) | `--adventurer`, `-border`, `-accent` | `#FEF6E4`, `#FDE8B5`, `#D4A316` | Miel |

**Contraste (WCAG AA, cible 4,5:1)** : texte vert forêt sur fond crème, environ 11:1 ; texte blanc sur le bouton orange brûlé, environ 4,7:1. Lighthouse accessibilité : 100 (rapports dans `docs/audit-accessibilite/`).

## Typographie

Police unique : **Outfit** (Google Fonts, graisses 400 à 800), déclarée dans `src/styles.css` et chargée dans `src/routes/__root.tsx`. Texte de base 16 px ; titres en gras ; interlignage généreux pour le confort de lecture.

## Formes et profondeur

- Rayon de base `1rem` : cartes et modules très arrondis, boutons et filtres en forme de pastille.
- Ombres douces teintées de vert forêt : carte `0 8px 24px -4px` à 6 % d'opacité, éléments flottants (calendrier, menus) `0 16px 36px -6px` à 12 %.
- Bordure fine de 1 px couleur sable sur les cartes.

## Composants personnalisés

Les composants viennent d'une bibliothèque de base (shadcn/ui, Radix) puis sont harmonisés avec la charte par les jetons ci-dessus : boutons (principal orange, secondaire vert forêt, discret), pastilles de filtre d'âge (actif en vert forêt), cartes de kit teintées par tranche d'âge, champ de recherche en pastille, bandeau de réassurance, en-tête et pied de page partagés par toutes les pages.

## Écarts avec le fichier de design de Stitch

| Élément | Stitch | Site | Raison |
|---|---|---|---|
| Bouton principal | Corail `#D83A54` (survol `#F26076`) | Orange brûlé `#C4501B` (survol `#AD4516`) | Choix de design du 9 octobre pour le bouton principal |
| Vocabulaire | Mots comme « sécurisée » et « garanties » dans les textes | Bannis : garanti, assurance, certifié, protégé, sécurisé | Les contrôles du site sont déclaratifs, jamais présentés comme une garantie |

Tous les autres jetons (fond, vert forêt, texte secondaire, bordures, couleurs des trois tranches d'âge, ombres, rayon, police) sont identiques à ceux du fichier de Stitch.
