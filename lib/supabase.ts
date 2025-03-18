import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wqwhpbmfgtgievdifrbu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxd2hwYm1mZ3RnaWV2ZGlmcmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MTk2MjksImV4cCI6MjA0NzM5NTYyOX0.V3lUcKL5FczQjFGD5H6C9bJhPglBWmuCLbpoYI1IyME'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'supabase-auth'
  }
})

// Tipos para o conteúdo do site
export interface SiteContent {
  id: number
  hero: {
    title: string
    subtitle: string
    ctaText: string
  }
  tools: {
    name: string
    logo: string
  }[]
  features: {
    title: string
    description: string
    icon: string
  }[]
  created_at: string
  updated_at: string
}

// Funções auxiliares para o Supabase
export const supabaseAdmin = {
  // Autenticação
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Gerenciamento de conteúdo
  async getSiteContent() {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .single()
    
    if (error) throw error
    return data as SiteContent
  },

  async updateSiteContent(content: Partial<SiteContent>) {
    const { data, error } = await supabase
      .from('site_content')
      .update(content)
      .eq('id', 1) // Assumindo que temos apenas um registro
      .single()
    
    if (error) throw error
    return data
  },

  // Upload de imagens
  async uploadImage(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('tools')
      .upload(path, file)
    
    if (error) throw error
    return data
  },

  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from('tools')
      .remove([path])
    
    if (error) throw error
  },

  async getImageUrl(path: string) {
    const { data } = supabase.storage
      .from('tools')
      .getPublicUrl(path)
    
    return data.publicUrl
  }
}
