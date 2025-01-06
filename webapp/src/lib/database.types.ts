export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          license_plate: string
          vin: string | null
          status: 'active' | 'maintenance' | 'inactive'
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          make: string
          model: string
          year: number
          license_plate: string
          vin?: string | null
          status: 'active' | 'maintenance' | 'inactive'
          created_at?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          id?: string
          make?: string
          model?: string
          year?: number
          license_plate?: string
          vin?: string | null
          status?: 'active' | 'maintenance' | 'inactive'
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 