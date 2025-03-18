'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Session } from '@supabase/supabase-js'

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(true) // Por enquanto, sempre retorna true para testes
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Verificar sessão atual
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession()
        setSession(currentSession)
        setIsAdmin(!!currentSession) // Na produção, você deve verificar se o usuário tem role de admin
      } catch (error) {
        console.error('Erro ao verificar sessão:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setIsAdmin(!!newSession) // Na produção, você deve verificar se o usuário tem role de admin
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { isAdmin, loading, session }
}
