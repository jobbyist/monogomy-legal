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
      profiles: {
        Row: {
          id: string
          role: 'client' | 'attorney' | 'admin'
          country: 'ZA' | 'KE' | 'NG' | null
          full_name: string | null
          phone: string | null
          email: string | null
          onboarding_completed: boolean
          onboarding_metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'client' | 'attorney' | 'admin'
          country?: 'ZA' | 'KE' | 'NG' | null
          full_name?: string | null
          phone?: string | null
          onboarding_completed?: boolean
          onboarding_metadata?: Json
        }
        Update: {
          role?: 'client' | 'attorney' | 'admin'
          country?: 'ZA' | 'KE' | 'NG' | null
          full_name?: string | null
          phone?: string | null
          onboarding_completed?: boolean
          onboarding_metadata?: Json
        }
      }
      attorney_profiles: {
        Row: {
          id: string
          profile_id: string
          bar_number: string
          verified: boolean
          practice_areas: string[]
          jurisdiction: 'ZA' | 'KE' | 'NG'
          paystack_payout_details: Json
          bio: string | null
          years_experience: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          profile_id: string
          bar_number: string
          jurisdiction: 'ZA' | 'KE' | 'NG'
          practice_areas?: string[]
          paystack_payout_details?: Json
          bio?: string | null
          years_experience?: number | null
        }
        Update: {
          bar_number?: string
          verified?: boolean
          practice_areas?: string[]
          paystack_payout_details?: Json
          bio?: string | null
          years_experience?: number | null
        }
      }
      templates: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          raw_markdown_content: string
          jurisdiction: 'ZA' | 'KE' | 'NG' | null
          preview_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      documents: {
        Row: {
          id: string
          client_id: string
          attorney_id: string | null
          template_id: string | null
          title: string
          status: 'drafted' | 'pending_review' | 'attorney_approved' | 'sent_to_client'
          file_path: string | null
          raw_text: string | null
          ai_analysis: Json
          attorney_notes: string | null
          final_file_path: string | null
          created_at: string
          updated_at: string
          approved_at: string | null
          sent_at: string | null
        }
      }
      consultations: {
        Row: {
          id: string
          client_id: string
          attorney_id: string | null
          scheduled_at: string
          duration_minutes: number
          status: 'scheduled' | 'completed' | 'canceled'
          notes: string | null
          meeting_link: string | null
          created_at: string
          updated_at: string
        }
      }
      document_chunks: {
        Row: {
          id: string
          document_id: string
          content: string
          embedding: number[] | null
          chunk_index: number
          created_at: string
        }
      }
    }
    Enums: {
      user_role: 'client' | 'attorney' | 'admin'
      country_code: 'ZA' | 'KE' | 'NG'
      document_status: 'drafted' | 'pending_review' | 'attorney_approved' | 'sent_to_client'
      consultation_status: 'scheduled' | 'completed' | 'canceled'
    }
  }
}
