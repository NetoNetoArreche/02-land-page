'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import AdminPanel from '@/components/admin/AdminPanel'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        const { data: { session }, error } = await supabase.auth.getSession()
        
        console.log('Verificando sessão:', { session, error })

        if (error || !session) {
          console.log('Sem sessão válida, redirecionando para login')
          window.location.href = '/admin/login'
          return
        }

        console.log('Sessão válida encontrada:', session.user)
        setLoading(false)
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err)
        window.location.href = '/admin/login'
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      window.location.href = '/admin/login'
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl font-semibold">
          Verificando autenticação...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sair
          </button>
        </div>
        <AdminPanel />
      </div>
    </div>
  )
}
