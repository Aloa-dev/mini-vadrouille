export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      adresses_kits: {
        Row: {
          adresse: string
          code_postal: string
          complement: string | null
          kit_id: string
          ville: string
        }
        Insert: {
          adresse: string
          code_postal: string
          complement?: string | null
          kit_id: string
          ville: string
        }
        Update: {
          adresse?: string
          code_postal?: string
          complement?: string | null
          kit_id?: string
          ville?: string
        }
        Relationships: [
          {
            foreignKeyName: "adresses_kits_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: true
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
        ]
      }
      avis: {
        Row: {
          auteur_id: string | null
          commentaire: string | null
          cree_le: string
          id: string
          note: number
          reservation_id: string
          sens: Database["public"]["Enums"]["sens_avis"]
        }
        Insert: {
          auteur_id?: string | null
          commentaire?: string | null
          cree_le?: string
          id?: string
          note: number
          reservation_id: string
          sens: Database["public"]["Enums"]["sens_avis"]
        }
        Update: {
          auteur_id?: string | null
          commentaire?: string | null
          cree_le?: string
          id?: string
          note?: number
          reservation_id?: string
          sens?: Database["public"]["Enums"]["sens_avis"]
        }
        Relationships: [
          {
            foreignKeyName: "avis_auteur_id_fkey"
            columns: ["auteur_id"]
            isOneToOne: false
            referencedRelation: "profils"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avis_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      dates_bloquees: {
        Row: {
          cree_le: string
          debut_le: string
          fin_le: string
          id: string
          kit_id: string
          motif: string | null
        }
        Insert: {
          cree_le?: string
          debut_le: string
          fin_le: string
          id?: string
          kit_id: string
          motif?: string | null
        }
        Update: {
          cree_le?: string
          debut_le?: string
          fin_le?: string
          id?: string
          kit_id?: string
          motif?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dates_bloquees_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
        ]
      }
      demandes_suppression: {
        Row: {
          demandee_le: string
          echeance_le: string
          email_bilan_envoye_le: string | null
          email_confirmation_envoye_le: string | null
          id: string
          profil_id: string
          statut: Database["public"]["Enums"]["statut_suppression"]
          traitee_le: string | null
        }
        Insert: {
          demandee_le?: string
          echeance_le: string
          email_bilan_envoye_le?: string | null
          email_confirmation_envoye_le?: string | null
          id?: string
          profil_id: string
          statut?: Database["public"]["Enums"]["statut_suppression"]
          traitee_le?: string | null
        }
        Update: {
          demandee_le?: string
          echeance_le?: string
          email_bilan_envoye_le?: string | null
          email_confirmation_envoye_le?: string | null
          id?: string
          profil_id?: string
          statut?: Database["public"]["Enums"]["statut_suppression"]
          traitee_le?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demandes_suppression_profil_id_fkey"
            columns: ["profil_id"]
            isOneToOne: false
            referencedRelation: "profils"
            referencedColumns: ["id"]
          },
        ]
      }
      kits: {
        Row: {
          age_max_mois: number
          age_min_mois: number
          caution_montant: number
          charge_max_kg: number
          compatibilite: string | null
          conformite_en15918_declaree: boolean
          conseil_pratique: string | null
          contenu_kit: string | null
          cree_le: string
          disponibilite: Database["public"]["Enums"]["disponibilite_kit"]
          duree_max_jours: number | null
          id: string
          mis_a_jour_le: string
          nom: string
          nombre_places: number
          option_serenite_montant: number | null
          prix_jour: number
          proprietaire_id: string
          quartier: string | null
          recit_complet: string
          relu_le: string | null
          relu_par_id: string | null
          statut_relecture: Database["public"]["Enums"]["statut_relecture"]
          teaser: string
          tranche_age: Database["public"]["Enums"]["tranche_age"]
          ville: string
        }
        Insert: {
          age_max_mois: number
          age_min_mois: number
          caution_montant: number
          charge_max_kg?: number
          compatibilite?: string | null
          conformite_en15918_declaree?: boolean
          conseil_pratique?: string | null
          contenu_kit?: string | null
          cree_le?: string
          disponibilite?: Database["public"]["Enums"]["disponibilite_kit"]
          duree_max_jours?: number | null
          id?: string
          mis_a_jour_le?: string
          nom: string
          nombre_places: number
          option_serenite_montant?: number | null
          prix_jour: number
          proprietaire_id: string
          quartier?: string | null
          recit_complet: string
          relu_le?: string | null
          relu_par_id?: string | null
          statut_relecture?: Database["public"]["Enums"]["statut_relecture"]
          teaser: string
          tranche_age: Database["public"]["Enums"]["tranche_age"]
          ville: string
        }
        Update: {
          age_max_mois?: number
          age_min_mois?: number
          caution_montant?: number
          charge_max_kg?: number
          compatibilite?: string | null
          conformite_en15918_declaree?: boolean
          conseil_pratique?: string | null
          contenu_kit?: string | null
          cree_le?: string
          disponibilite?: Database["public"]["Enums"]["disponibilite_kit"]
          duree_max_jours?: number | null
          id?: string
          mis_a_jour_le?: string
          nom?: string
          nombre_places?: number
          option_serenite_montant?: number | null
          prix_jour?: number
          proprietaire_id?: string
          quartier?: string | null
          recit_complet?: string
          relu_le?: string | null
          relu_par_id?: string | null
          statut_relecture?: Database["public"]["Enums"]["statut_relecture"]
          teaser?: string
          tranche_age?: Database["public"]["Enums"]["tranche_age"]
          ville?: string
        }
        Relationships: [
          {
            foreignKeyName: "kits_proprietaire_id_fkey"
            columns: ["proprietaire_id"]
            isOneToOne: false
            referencedRelation: "profils"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kits_relu_par_id_fkey"
            columns: ["relu_par_id"]
            isOneToOne: false
            referencedRelation: "profils"
            referencedColumns: ["id"]
          },
        ]
      }
      photos_kits: {
        Row: {
          chemin_stockage: string
          cree_le: string
          id: string
          kit_id: string
          position: number
        }
        Insert: {
          chemin_stockage: string
          cree_le?: string
          id?: string
          kit_id: string
          position: number
        }
        Update: {
          chemin_stockage?: string
          cree_le?: string
          id?: string
          kit_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "photos_kits_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
        ]
      }
      profils: {
        Row: {
          anonymise_le: string | null
          avatar_url: string | null
          cree_le: string
          derniere_connexion_le: string | null
          id: string
          nom: string
          prenom: string
          presentation: string | null
          role: Database["public"]["Enums"]["role_utilisateur"]
          stripe_compte_connect_id: string | null
          telephone: string | null
          ville: string | null
        }
        Insert: {
          anonymise_le?: string | null
          avatar_url?: string | null
          cree_le?: string
          derniere_connexion_le?: string | null
          id: string
          nom: string
          prenom: string
          presentation?: string | null
          role?: Database["public"]["Enums"]["role_utilisateur"]
          stripe_compte_connect_id?: string | null
          telephone?: string | null
          ville?: string | null
        }
        Update: {
          anonymise_le?: string | null
          avatar_url?: string | null
          cree_le?: string
          derniere_connexion_le?: string | null
          id?: string
          nom?: string
          prenom?: string
          presentation?: string | null
          role?: Database["public"]["Enums"]["role_utilisateur"]
          stripe_compte_connect_id?: string | null
          telephone?: string | null
          ville?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          annulation_gratuite_jusqu_au: string
          annulee_le: string | null
          caution_montant: number
          caution_remboursee_le: string | null
          cree_le: string
          creneau_remise_le: string
          debut_le: string
          demande_le: string
          fin_le: string
          frais_service_montant: number
          frais_service_taux: number
          id: string
          kit_id: string
          locataire_id: string
          message: string | null
          mis_a_jour_le: string
          montant_location: number
          motif_annulation: string | null
          motif_legitime_valide: boolean
          nombre_jours: number
          option_serenite: boolean
          option_serenite_montant: number
          prix_jour_applique: number
          reference: string | null
          repondu_le: string | null
          reponse_limite_le: string
          statut: Database["public"]["Enums"]["statut_reservation"]
          statut_caution: Database["public"]["Enums"]["statut_caution"]
          stripe_payment_intent_id: string | null
          total_debite: number
        }
        Insert: {
          annulation_gratuite_jusqu_au: string
          annulee_le?: string | null
          caution_montant: number
          caution_remboursee_le?: string | null
          cree_le?: string
          creneau_remise_le: string
          debut_le: string
          demande_le?: string
          fin_le: string
          frais_service_montant: number
          frais_service_taux?: number
          id?: string
          kit_id: string
          locataire_id: string
          message?: string | null
          mis_a_jour_le?: string
          montant_location: number
          motif_annulation?: string | null
          motif_legitime_valide?: boolean
          nombre_jours: number
          option_serenite?: boolean
          option_serenite_montant?: number
          prix_jour_applique: number
          reference?: string | null
          repondu_le?: string | null
          reponse_limite_le: string
          statut?: Database["public"]["Enums"]["statut_reservation"]
          statut_caution?: Database["public"]["Enums"]["statut_caution"]
          stripe_payment_intent_id?: string | null
          total_debite: number
        }
        Update: {
          annulation_gratuite_jusqu_au?: string
          annulee_le?: string | null
          caution_montant?: number
          caution_remboursee_le?: string | null
          cree_le?: string
          creneau_remise_le?: string
          debut_le?: string
          demande_le?: string
          fin_le?: string
          frais_service_montant?: number
          frais_service_taux?: number
          id?: string
          kit_id?: string
          locataire_id?: string
          message?: string | null
          mis_a_jour_le?: string
          montant_location?: number
          motif_annulation?: string | null
          motif_legitime_valide?: boolean
          nombre_jours?: number
          option_serenite?: boolean
          option_serenite_montant?: number
          prix_jour_applique?: number
          reference?: string | null
          repondu_le?: string | null
          reponse_limite_le?: string
          statut?: Database["public"]["Enums"]["statut_reservation"]
          statut_caution?: Database["public"]["Enums"]["statut_caution"]
          stripe_payment_intent_id?: string | null
          total_debite?: number
        }
        Relationships: [
          {
            foreignKeyName: "reservations_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_locataire_id_fkey"
            columns: ["locataire_id"]
            isOneToOne: false
            referencedRelation: "profils"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      disponibilite_kit: "disponible" | "en_reparation"
      role_utilisateur: "client" | "vendeur" | "admin"
      sens_avis: "locataire_vers_loueur" | "loueur_vers_locataire"
      statut_caution: "encaissee" | "remboursee" | "retenue"
      statut_relecture: "en_attente_relecture" | "publie" | "refuse"
      statut_reservation:
        | "en_attente"
        | "acceptee"
        | "refusee"
        | "expiree"
        | "annulee_par_locataire"
        | "annulee_par_loueur"
      statut_suppression: "recue" | "en_attente_fin_reservation" | "traitee"
      tranche_age: "petit_cocon" | "explorateur_curieux" | "mini_baroudeur"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      disponibilite_kit: ["disponible", "en_reparation"],
      role_utilisateur: ["client", "vendeur", "admin"],
      sens_avis: ["locataire_vers_loueur", "loueur_vers_locataire"],
      statut_caution: ["encaissee", "remboursee", "retenue"],
      statut_relecture: ["en_attente_relecture", "publie", "refuse"],
      statut_reservation: [
        "en_attente",
        "acceptee",
        "refusee",
        "expiree",
        "annulee_par_locataire",
        "annulee_par_loueur",
      ],
      statut_suppression: ["recue", "en_attente_fin_reservation", "traitee"],
      tranche_age: ["petit_cocon", "explorateur_curieux", "mini_baroudeur"],
    },
  },
} as const
