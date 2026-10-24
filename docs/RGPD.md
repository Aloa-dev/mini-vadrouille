# RGPD et données personnelles : Mini Vadrouille

> **Statut de ce document.** Mini Vadrouille est un projet de formation présenté en démonstration. Ce texte est un document pédagogique, pas un avis juridique. Si le projet devient réel, il devra être relu par des professionnels du droit. Il distingue toujours **ce qui est défini** (règles de conservation, décisions de conception) de **ce qui est effectivement codé aujourd'hui**.

## 1. Qui est responsable des données

**Mini Vadrouille SAS** (projet de démonstration) décide pourquoi et comment les données sont utilisées : c'est le « responsable du traitement ». Contact pour toute question ou demande : **contact@mini-vadrouille.fr** (adresse de démonstration : la boîte sera activée au lancement réel).

## 2. Quelles données, pourquoi, et sur quelle base

| Données | Pourquoi | Base légale | Où elles vivent |
|---|---|---|---|
| E-mail et mot de passe (le mot de passe est stocké chiffré par Supabase, jamais lisible) | Créer un compte, se connecter | Contrat (fournir le service) | Supabase Auth |
| Prénom, nom, téléphone, ville, présentation, photo de profil | Identifier les parties d'une location | Contrat | Supabase, table `profils` |
| Réservations : dates, montants, message au loueur, créneau de remise, statuts | Gérer la location | Contrat | Supabase, table `reservations` |
| Paiement : montants et références Stripe | Encaisser, reverser, justifier | Contrat, puis obligation légale (comptabilité) | Stripe et Supabase. **Les numéros de carte ne passent jamais par le site** : la page de paiement est hébergée par Stripe |
| Avis | Aider les autres familles à choisir | Contrat, intérêt légitime | Supabase, table `avis` |
| Adresse du kit (côté loueur) | Organiser la remise en main propre, révélée après paiement et acceptation | Contrat | Supabase, table `adresses_kits` |
| Texte décrivant le vélo (aide IA) | Répondre à la question de compatibilité | Consentement implicite par l'usage (le formulaire avertit : ne saisissez ni nom ni coordonnées) | Envoyé à Groq pour la réponse, **jamais journalisé** par Mini Vadrouille |
| Demandes de suppression | Tracer le droit à l'effacement | Obligation légale | Supabase, table `demandes_suppression` |

**Aucune donnée sur les enfants n'est collectée.** Seule la tranche d'âge du kit est utilisée.

## 3. Qui reçoit les données (sous-traitants)

| Service | Rôle | Localisation | Remarque |
|---|---|---|---|
| Supabase | Base de données, authentification, fonctions serveur | Région du projet à confirmer dans le tableau de bord | Règles d'accès par utilisatrice (RLS) activées sur les 8 tables |
| Stripe | Paiement | Pays de l'UE et États-Unis | Mode test uniquement en démonstration |
| Vercel | Hébergement du site | Fonctions à Washington (États-Unis) | Voir l'audit de sécurité |
| Groq | Aide à la compatibilité du vélo (IA) | États-Unis | Plan gratuit, option de non-conservation des données (ZDR) activée ; des métadonnées d'usage subsistent |
| OVHcloud | Nom de domaine et DNS | France | Aucune donnée utilisateur |

Les transferts vers les États-Unis restent une limite assumée de la version de démonstration.

## 4. Combien de temps on garde les données

| Donnée | Durée | Origine de la durée |
|---|---|---|
| Compte et coordonnées | Supprimés ou anonymisés **dans le mois** suivant la demande. Mise en attente tant qu'une réservation est en cours ou qu'une caution n'est pas remboursée | Choix du projet (délai raisonnable) |
| Avis | Conservé, affiché sous « Un parent vadrouilleur », sans ville ni détail identifiant | Choix du projet : l'avis reste utile aux autres, il n'identifie plus la personne |
| Paiements (montants, références) | **10 ans**, accès restreint, séparés du compte | Obligation légale (Code de commerce) |
| Photos d'état des lieux | Jusqu'à la fin d'un éventuel litige de caution, puis supprimées. Sans litige : **6 mois** après le remboursement de la caution | Choix du projet, à justifier : le délai couvre une contestation raisonnable |
| Compte dormant | Supprimé après **3 ans** sans connexion, avec un e-mail d'avertissement avant | Choix du projet, à justifier |

Seule la durée de 10 ans vient d'une obligation légale. Les durées de 6 mois et de 3 ans sont des choix du projet.

## 5. Vos droits

Vous pouvez demander à tout moment : l'accès à vos données, leur rectification, leur effacement, la limitation de leur usage, leur portabilité et vous opposer à un traitement. Écrivez à l'adresse de contact ci-dessus. En cas de désaccord, vous pouvez saisir la **CNIL** (cnil.fr).

### Supprimer son compte : comment ça se passe
1. Vous faites votre demande par e-mail. Elle est enregistrée dans la table `demandes_suppression`.
2. Vous recevez un **premier e-mail** de confirmation de la demande.
3. Si une réservation est en cours ou si une caution n'est pas remboursée, la suppression attend la fin (statut « en attente de fin de réservation »).
4. Sous un mois, le compte et les coordonnées sont supprimés ou anonymisés (on anonymise le profil puis on désactive la connexion, on n'efface pas les paiements archivés).
5. Vous recevez un **second e-mail** de bilan : ce qui est supprimé, ce qui est gardé, pourquoi, jusqu'à quand, et un contact en cas d'erreur.

## 6. Cookies et traceurs

Le site n'utilise **aucun traceur publicitaire ou statistique**. Une donnée technique est stockée dans votre navigateur pour garder votre connexion ouverte : elle est strictement nécessaire au service et ne demande donc pas de bandeau de consentement. Aucun e-mail promotionnel n'est envoyé ; toute newsletter future exigerait un consentement distinct.

## 7. Ce qui est codé aujourd'hui, et ce qui ne l'est pas

| Élément | État |
|---|---|
| Table `demandes_suppression` et colonnes d'anonymisation (`anonymise_le`) | Existent en base |
| Règles d'accès RLS sur les 8 tables | Déclarées, démonstration à deux comptes préparée |
| Aide IA : texte limité à 500 caractères, avertissement, non-conservation chez Groq, aucune journalisation | En production |
| Retrait du préremplissage de démonstration de l'inscription | Fait |
| **Bouton de demande de suppression dans l'interface** | **Non codé** : la demande passe par e-mail |
| **E-mails automatiques** (confirmation, bilan, avertissement de compte dormant) | **Non codés** : décrits dans la conception, hors V1 |
| **Suppression automatique** des comptes dormants et des photos d'état des lieux | **Non codée** (les photos d'état des lieux ne font pas partie de la démonstration) |
| Confirmation d'e-mail à l'inscription | Désactivée volontairement pour la démonstration |

Ces limites sont assumées et présentées comme telles à l'oral.

## 8. Sécurité

Voir [`AUDIT-SECURITE.md`](AUDIT-SECURITE.md) : aucun secret dans le dépôt, HTTPS partout, en-têtes de sécurité, règles d'accès par utilisatrice, plan de remédiation après la soutenance.
