'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'

const defaultContent = {
  tools: [
    {
      name: "Bolt.new",
      description: "Plataforma No-Code para criar aplicativos web",
      url: "https://bolt.new",
      icon: "⚡"
    },
    {
      name: "Framer",
      description: "Ferramenta de design e prototipagem",
      url: "https://framer.com",
      icon: "🎨"
    },
    {
      name: "Supabase",
      description: "Banco de dados e autenticação",
      url: "https://supabase.com",
      icon: "🔒"
    },
    {
      name: "Vercel",
      description: "Plataforma de hospedagem e deploy",
      url: "https://vercel.com",
      icon: "🚀"
    }
  ]
}

export default function AdminPanel() {
  const router = useRouter()
  const { isAdmin, loading: authLoading } = useAuth()
  const { content: serverContent, loading: contentLoading } = useRealtimeContent()
  const [content, setContent] = useState(defaultContent)
  const [editingTool, setEditingTool] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/')
    }
  }, [authLoading, isAdmin, router])

  useEffect(() => {
    if (serverContent?.tools) {
      setContent(prev => ({
        ...prev,
        tools: serverContent.tools
      }))
    }
  }, [serverContent])

  const handleEditTool = (tool: any) => {
    setEditingTool(tool)
    setIsEditing(true)
  }

  const handleSaveTool = async () => {
    if (!editingTool) return

    try {
      setIsSaving(true)
      const supabase = createClient()

      // Encontrar o índice da ferramenta sendo editada
      const toolIndex = content.tools.findIndex(t => t.name === editingTool.name)
      if (toolIndex === -1) return

      // Atualizar a ferramenta no array
      const updatedTools = [...content.tools]
      updatedTools[toolIndex] = editingTool

      // Verificar se o registro existe
      const { data: existingData } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 1)
        .single()

      if (!existingData) {
        // Criar novo registro
        await supabase
          .from('site_content')
          .insert([{
            id: 1,
            tools: updatedTools
          }])
      } else {
        // Atualizar registro existente
        await supabase
          .from('site_content')
          .update({
            tools: updatedTools
          })
          .eq('id', 1)
      }

      // Atualizar estado local
      setContent(prev => ({
        ...prev,
        tools: updatedTools
      }))

      setIsEditing(false)
      setEditingTool(null)
    } catch (error) {
      console.error('Erro ao salvar ferramenta:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-700 p-4 rounded-lg h-48" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Painel de Administração</h1>

        {/* Seção de Ferramentas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Ferramentas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.tools.map((tool, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Nome
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={tool.name}
                        onChange={(e) => {
                          const updatedTools = [...content.tools]
                          updatedTools[index] = {
                            ...tool,
                            name: e.target.value
                          }
                          setContent(prev => ({
                            ...prev,
                            tools: updatedTools
                          }))
                        }}
                        className="w-full bg-gray-600 border border-gray-500 rounded-md shadow-sm px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Descrição
                    </label>
                    <div className="mt-1">
                      <textarea
                        value={tool.description}
                        onChange={(e) => {
                          const updatedTools = [...content.tools]
                          updatedTools[index] = {
                            ...tool,
                            description: e.target.value
                          }
                          setContent(prev => ({
                            ...prev,
                            tools: updatedTools
                          }))
                        }}
                        rows={2}
                        className="w-full bg-gray-600 border border-gray-500 rounded-md shadow-sm px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      URL
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        value={tool.url}
                        onChange={(e) => {
                          const updatedTools = [...content.tools]
                          updatedTools[index] = {
                            ...tool,
                            url: e.target.value
                          }
                          setContent(prev => ({
                            ...prev,
                            tools: updatedTools
                          }))
                        }}
                        className="w-full bg-gray-600 border border-gray-500 rounded-md shadow-sm px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Ícone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={tool.icon}
                        onChange={(e) => {
                          const updatedTools = [...content.tools]
                          updatedTools[index] = {
                            ...tool,
                            icon: e.target.value
                          }
                          setContent(prev => ({
                            ...prev,
                            tools: updatedTools
                          }))
                        }}
                        className="w-full bg-gray-600 border border-gray-500 rounded-md shadow-sm px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão Salvar */}
          <button
            onClick={handleSaveTool}
            disabled={isSaving}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  )
}
