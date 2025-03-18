'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = 'https://wqwhpbmfgtgievdifrbu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxd2hwYm1mZ3RnaWV2ZGlmcmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MTk2MjksImV4cCI6MjA0NzM5NTYyOX0.V3lUcKL5FczQjFGD5H6C9bJhPglBWmuCLbpoYI1IyME'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('NEXT_PUBLIC_SUPABASE_URL não está definido')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY não está definido')
}

export const createClient = () => {
  return createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey
  })
}
