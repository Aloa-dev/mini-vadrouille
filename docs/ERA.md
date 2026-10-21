# Diagramme ERA : base de données Supabase de Mini Vadrouille

Ce diagramme décrit les 8 tables du schéma `public` de la base Supabase. Il a été établi à partir du fichier généré `src/integrations/supabase/types.ts` (tables, colonnes, clés étrangères, énumérations).

Lecture des liens :
- `||--o{` : un-à-plusieurs (un profil possède plusieurs kits).
- `||--||` : un-à-un (un kit a une seule adresse).
- Les clés étrangères sont notées `FK`, les clés primaires `PK`.

```mermaid
erDiagram
    profils ||--o{ kits : "possede (proprietaire_id)"
    profils |o--o{ kits : "relit (relu_par_id)"
    kits ||--|| adresses_kits : "a une adresse"
    kits ||--o{ photos_kits : "a des photos"
    kits ||--o{ dates_bloquees : "a des indisponibilites"
    kits ||--o{ reservations : "est reserve"
    profils ||--o{ reservations : "reserve (locataire_id)"
    reservations ||--o{ avis : "donne lieu a"
    profils |o--o{ avis : "ecrit (auteur_id)"
    profils ||--o{ demandes_suppression : "demande"

    profils {
        uuid id PK
        text prenom
        text nom
        text role
        text telephone
        text ville
        text presentation
        text avatar_url
        text stripe_compte_connect_id
        timestamp cree_le
        timestamp derniere_connexion_le
        timestamp anonymise_le
    }

    kits {
        uuid id PK
        uuid proprietaire_id FK
        uuid relu_par_id FK
        text nom
        text teaser
        text recit_complet
        text tranche_age
        int age_min_mois
        int age_max_mois
        int nombre_places
        numeric prix_jour
        numeric caution_montant
        numeric option_serenite_montant
        int charge_max_kg
        int duree_max_jours
        text ville
        text quartier
        text contenu_kit
        text compatibilite
        text conseil_pratique
        boolean conformite_en15918_declaree
        text disponibilite
        text statut_relecture
        timestamp relu_le
        timestamp cree_le
        timestamp mis_a_jour_le
    }

    adresses_kits {
        uuid kit_id PK
        text adresse
        text complement
        text code_postal
        text ville
    }

    photos_kits {
        uuid id PK
        uuid kit_id FK
        text chemin_stockage
        int position
        timestamp cree_le
    }

    dates_bloquees {
        uuid id PK
        uuid kit_id FK
        timestamp debut_le
        timestamp fin_le
        text motif
        timestamp cree_le
    }

    reservations {
        uuid id PK
        uuid kit_id FK
        uuid locataire_id FK
        text reference
        text statut
        timestamp debut_le
        timestamp fin_le
        int nombre_jours
        numeric prix_jour_applique
        numeric montant_location
        numeric frais_service_taux
        numeric frais_service_montant
        numeric caution_montant
        text statut_caution
        boolean option_serenite
        numeric option_serenite_montant
        numeric total_debite
        text stripe_payment_intent_id
        text message
        timestamp creneau_remise_le
        timestamp demande_le
        timestamp reponse_limite_le
        timestamp repondu_le
        timestamp annulation_gratuite_jusqu_au
        timestamp annulee_le
        text motif_annulation
        boolean motif_legitime_valide
        timestamp caution_remboursee_le
        timestamp cree_le
        timestamp mis_a_jour_le
    }

    avis {
        uuid id PK
        uuid reservation_id FK
        uuid auteur_id FK
        int note
        text commentaire
        text sens
        timestamp cree_le
    }

    demandes_suppression {
        uuid id PK
        uuid profil_id FK
        text statut
        timestamp demandee_le
        timestamp echeance_le
        timestamp traitee_le
        timestamp email_confirmation_envoye_le
        timestamp email_bilan_envoye_le
    }
```

## Valeurs possibles des champs à choix (énumérations)

| Champ | Valeurs |
|---|---|
| `profils.role` | `client`, `vendeur`, `admin` |
| `kits.tranche_age` | `petit_cocon`, `explorateur_curieux`, `mini_baroudeur` |
| `kits.disponibilite` | `disponible`, `en_reparation` |
| `kits.statut_relecture` | `en_attente_relecture`, `publie`, `refuse` |
| `reservations.statut` | `en_attente`, `acceptee`, `refusee`, `expiree`, `annulee_par_locataire`, `annulee_par_loueur` |
| `reservations.statut_caution` | `encaissee`, `remboursee`, `retenue` |
| `avis.sens` | `locataire_vers_loueur`, `loueur_vers_locataire` |
| `demandes_suppression.statut` | `recue`, `en_attente_fin_reservation`, `traitee` |

## Points à confirmer dans le tableau de bord Supabase

- `profils.id` est probablement lié à la table d'authentification `auth.users` de Supabase Auth. Ce lien n'apparaît pas dans `types.ts` (qui ne décrit que le schéma `public`), il est donc à vérifier avant l'oral.
- Les politiques RLS (Row Level Security) de chaque table ne sont pas visibles dans ce fichier : elles sont décrites dans [RLS.md](RLS.md), à confirmer avec le tableau de bord Supabase (Authentication, puis Policies).
- Les types SQL exacts (`uuid`, `timestamptz`, `numeric`) sont déduits des types TypeScript : à confirmer dans le Table Editor.
