'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

export function useRealtimeContent() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Buscar conteúdo inicial
    const fetchContent = async () => {
      try {
        const { data } = await supabase
          .from('site_content')
          .select('*')
          .eq('id', 1)
          .single()
        
        setContent(data)
      } catch (error) {
        console.error('Erro ao buscar conteúdo:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()

    // Inscrever para atualizações em tempo real
    const channel = supabase
      .channel('site_content')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_content',
        },
        (payload) => {
          console.log('Recebeu atualização:', payload)
          setContent(payload.new)
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const updateContent = async (newContent: any) => {
    try {
      const supabase = createClient()

      // Verificar se o registro existe
      const { data: existingData, error: selectError } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 1)
        .single()

      console.log('Dados existentes:', existingData)
      console.log('Novo conteúdo:', newContent)

      let result
      if (!existingData) {
        // Criar novo registro
        const { data, error: insertError } = await supabase
          .from('site_content')
          .insert([{
            id: 1,
            ...newContent
          }])
          .select()
          .single()

        if (insertError) {
          console.error('Erro ao inserir:', insertError)
          throw insertError
        }

        result = data
        console.log('Registro criado com sucesso:', data)
      } else {
        // Atualizar registro existente
        const { data, error: updateError } = await supabase
          .from('site_content')
          .update(newContent)
          .eq('id', 1)
          .select()
          .single()

        if (updateError) {
          console.error('Erro ao atualizar:', updateError)
          throw updateError
        }

        result = data
        console.log('Registro atualizado com sucesso:', data)
      }

      // Atualizar estado local
      setContent(result)
      return result
    } catch (error) {
      console.error('Erro ao salvar conteúdo:', error)
      throw error
    }
  }

  return { content, loading, updateContent }
}
