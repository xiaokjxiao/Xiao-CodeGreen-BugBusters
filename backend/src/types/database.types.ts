export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Cars: {
        Row: {
          car_model: string
          driver_id: string
          id: string
          plate_number: string
        }
        Insert: {
          car_model: string
          driver_id?: string
          id?: string
          plate_number: string
        }
        Update: {
          car_model?: string
          driver_id?: string
          id?: string
          plate_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "Cars_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "Drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      Drivers: {
        Row: {
          date_of_birth: string
          driver_type: Database["public"]["Enums"]["DriverType"] | null
          email: string
          first_name: string
          id: string
          is_driver_registered: boolean
          last_name: string
          license_expiration_date: string
          license_number: string
          middle_name: string | null
          sex: Database["public"]["Enums"]["Sex"]
          user_id: string | null
        }
        Insert: {
          date_of_birth: string
          driver_type?: Database["public"]["Enums"]["DriverType"] | null
          email: string
          first_name: string
          id?: string
          is_driver_registered?: boolean
          last_name: string
          license_expiration_date: string
          license_number: string
          middle_name?: string | null
          sex: Database["public"]["Enums"]["Sex"]
          user_id?: string | null
        }
        Update: {
          date_of_birth?: string
          driver_type?: Database["public"]["Enums"]["DriverType"] | null
          email?: string
          first_name?: string
          id?: string
          is_driver_registered?: boolean
          last_name?: string
          license_expiration_date?: string
          license_number?: string
          middle_name?: string | null
          sex?: Database["public"]["Enums"]["Sex"]
          user_id?: string | null
        }
        Relationships: []
      }
      Notifications: {
        Row: {
          date_created: string | null
          driver_id: string
          id: number
          message: string
        }
        Insert: {
          date_created?: string | null
          driver_id: string
          id?: number
          message: string
        }
        Update: {
          date_created?: string | null
          driver_id?: string
          id?: number
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "Notifications_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "Drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          is_admin: boolean
          last_login: string
          last_name: string
          password: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          is_admin?: boolean
          last_login?: string
          last_name: string
          password: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_admin?: boolean
          last_login?: string
          last_name?: string
          password?: string
        }
        Relationships: []
      }
      Violations: {
        Row: {
          driver_id: string
          id: string
          paid_status: boolean
          violation_date: string
          violation_type: string
        }
        Insert: {
          driver_id: string
          id?: string
          paid_status?: boolean
          violation_date?: string
          violation_type?: string
        }
        Update: {
          driver_id?: string
          id?: string
          paid_status?: boolean
          violation_date?: string
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "Violations_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "Drivers"
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
      DriverType: "Student" | "Faculty" | "Staff"
      Sex: "Male" | "Female"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
