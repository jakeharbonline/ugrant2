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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          active: boolean
          auth_user_id: string | null
          created_at: string
          email: string
          id: string
          last_login_at: string | null
          name: string | null
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          auth_user_id?: string | null
          created_at?: string
          email: string
          id?: string
          last_login_at?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          auth_user_id?: string | null
          created_at?: string
          email?: string
          id?: string
          last_login_at?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          admin_user_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      benefits: {
        Row: {
          active: boolean
          category: string
          created_at: string
          description: string | null
          display_order: number
          id: string
          name: string
          qualifying_schemes: string[] | null
          slug: string
        }
        Insert: {
          active?: boolean
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name: string
          qualifying_schemes?: string[] | null
          slug: string
        }
        Update: {
          active?: boolean
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name?: string
          qualifying_schemes?: string[] | null
          slug?: string
        }
        Relationships: []
      }
      installers: {
        Row: {
          active: boolean
          company_name: string | null
          coverage_postcodes: string[] | null
          coverage_regions: string[] | null
          created_at: string
          default_lead_price: number
          email: string
          id: string
          name: string
          phone: string | null
          schemes_covered: string[] | null
          total_leads_purchased: number
          total_spent: number
          updated_at: string
          verified: boolean
        }
        Insert: {
          active?: boolean
          company_name?: string | null
          coverage_postcodes?: string[] | null
          coverage_regions?: string[] | null
          created_at?: string
          default_lead_price?: number
          email: string
          id?: string
          name: string
          phone?: string | null
          schemes_covered?: string[] | null
          total_leads_purchased?: number
          total_spent?: number
          updated_at?: string
          verified?: boolean
        }
        Update: {
          active?: boolean
          company_name?: string | null
          coverage_postcodes?: string[] | null
          coverage_regions?: string[] | null
          created_at?: string
          default_lead_price?: number
          email?: string
          id?: string
          name?: string
          phone?: string | null
          schemes_covered?: string[] | null
          total_leads_purchased?: number
          total_spent?: number
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      lead_purchases: {
        Row: {
          amount: number
          id: string
          installer_id: string
          lead_id: string
          payment_status: string
          purchased_at: string
          stripe_checkout_session_id: string | null
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount: number
          id?: string
          installer_id: string
          lead_id: string
          payment_status?: string
          purchased_at?: string
          stripe_checkout_session_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount?: number
          id?: string
          installer_id?: string
          lead_id?: string
          payment_status?: string
          purchased_at?: string
          stripe_checkout_session_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_purchases_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_purchases_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          accepted_privacy: boolean
          accepted_terms: boolean
          benefits: string[] | null
          consent_timestamp: string | null
          created_at: string
          deleted_at: string | null
          eligibility_details: Json | null
          eligibility_tier: Database["public"]["Enums"]["eligibility_tier"]
          eligible_schemes: string[] | null
          email: string | null
          epc_data: Json | null
          epc_rating: string | null
          heating_type: string
          id: string
          income_band: string | null
          insulation: string[] | null
          notes: string | null
          phone: string | null
          postcode: string
          price: number | null
          property_type: string
          status: Database["public"]["Enums"]["lead_status"]
          tenure: string
          updated_at: string
          wants_installer_contact: boolean
        }
        Insert: {
          accepted_privacy?: boolean
          accepted_terms?: boolean
          benefits?: string[] | null
          consent_timestamp?: string | null
          created_at?: string
          deleted_at?: string | null
          eligibility_details?: Json | null
          eligibility_tier?: Database["public"]["Enums"]["eligibility_tier"]
          eligible_schemes?: string[] | null
          email?: string | null
          epc_data?: Json | null
          epc_rating?: string | null
          heating_type: string
          id?: string
          income_band?: string | null
          insulation?: string[] | null
          notes?: string | null
          phone?: string | null
          postcode: string
          price?: number | null
          property_type: string
          status?: Database["public"]["Enums"]["lead_status"]
          tenure: string
          updated_at?: string
          wants_installer_contact?: boolean
        }
        Update: {
          accepted_privacy?: boolean
          accepted_terms?: boolean
          benefits?: string[] | null
          consent_timestamp?: string | null
          created_at?: string
          deleted_at?: string | null
          eligibility_details?: Json | null
          eligibility_tier?: Database["public"]["Enums"]["eligibility_tier"]
          eligible_schemes?: string[] | null
          email?: string | null
          epc_data?: Json | null
          epc_rating?: string | null
          heating_type?: string
          id?: string
          income_band?: string | null
          insulation?: string[] | null
          notes?: string | null
          phone?: string | null
          postcode?: string
          price?: number | null
          property_type?: string
          status?: Database["public"]["Enums"]["lead_status"]
          tenure?: string
          updated_at?: string
          wants_installer_contact?: boolean
        }
        Relationships: []
      }
      schemes: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          display_order: number
          id: string
          max_grant_amount: number | null
          name: string
          region_specific: boolean
          regions: string[] | null
          rules_json: Json
          short_description: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          max_grant_amount?: number | null
          name: string
          region_specific?: boolean
          regions?: string[] | null
          rules_json?: Json
          short_description?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          max_grant_amount?: number | null
          name?: string
          region_specific?: boolean
          regions?: string[] | null
          rules_json?: Json
          short_description?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["admin_role"]
      }
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean }
    }
    Enums: {
      admin_role: "super_admin" | "admin" | "lead_manager" | "read_only"
      eligibility_tier: "eligible" | "potentially_eligible" | "not_eligible"
      lead_status:
        | "new"
        | "sent"
        | "purchased"
        | "resent"
        | "archived"
        | "deleted"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      admin_role: ["super_admin", "admin", "lead_manager", "read_only"],
      eligibility_tier: ["eligible", "potentially_eligible", "not_eligible"],
      lead_status: [
        "new",
        "sent",
        "purchased",
        "resent",
        "archived",
        "deleted",
      ],
    },
  },
} as const
