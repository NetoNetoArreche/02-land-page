'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import BenefitsCustomizationSidebar from '../BenefitsCustomizationSidebar'

const defaultBenefits = {
  title: "Por que fazer parte da|Comunidade IAcode?",
  items: [
    {
      icon: "🌟",
      title: "Aprendizado Prático",
      description: "Criação de plataformas e sites completos com projetos reais."
    },
    {
      icon: "🚀",
      title: "Ferramentas Inovadoras",
      description: "Bolt.new, Framer, Cursor AI e muito mais."
    },
    {
      icon: "🤝",
      title: "Suporte Exclusivo",
      description: "Acesso à comunidade no Circle e code reviews."
    },
    {
      icon: "🎓",
      title: "Desenvolvimento Pessoal",
      description: "Networking com profissionais e eventos ao vivo."
    }
  ]
}

export default function Benefits() {
  const { content, loading } = useRealtimeContent()
  const { isAdmin } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [localBenefits, setLocalBenefits] = useState(defaultBenefits)

  // Atualizar benefícios locais quando o conteúdo mudar
  useEffect(() => {
    const initializeBenefits = async () => {
      try {
        const supabase = createClient()
        
        // Primeiro, tenta buscar o registro existente
        const { data: existingData, error: selectError } = await supabase
          .from('site_content')
          .select('*')
          .eq('id', 1)
          .single()

        if (existingData) {
          // Se existe registro mas não tem benefits, atualiza apenas o campo benefits
          if (!existingData.benefits) {
            const { data: updateData, error: updateError } = await supabase
              .from('site_content')
              .update({
                benefits: defaultBenefits
              })
              .eq('id', 1)
              .select()
              .single()

            if (updateError) throw updateError
            console.log('Campo benefits atualizado:', updateData)
            if (updateData?.benefits) {
              setLocalBenefits(updateData.benefits)
            }
          } else {
            // Se já tem benefits, usa os dados do banco
            console.log('Usando benefits do banco:', existingData.benefits)
            setLocalBenefits(existingData.benefits)
          }
        } else {
          // Se não existe nenhum registro, cria um novo
          const { data: insertData, error: insertError } = await supabase
            .from('site_content')
            .insert([{
              benefits: defaultBenefits,
              hero: content?.hero || {},
              tools: content?.tools || [],
              features: content?.features || []
            }])
            .select()
            .single()

          if (insertError) throw insertError
          console.log('Novo registro criado:', insertData)
          if (insertData?.benefits) {
            setLocalBenefits(insertData.benefits)
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar benefits:', error)
      }
    }

    // Se não tem benefits no content, tenta inicializar
    if (!content?.benefits) {
      console.log('Inicializando benefits...')
      initializeBenefits()
    } else {
      console.log('Benefits já existem no banco:', content.benefits)
      setLocalBenefits(content.benefits)
    }
  }, [content])

  const handleSave = async (newContent: any) => {
    try {
      console.log('Salvando novo conteúdo:', newContent)
      const supabase = createClient()
      
      // Verificar se o registro existe
      const { data: existingData, error: selectError } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 1)
        .single()

      if (selectError && selectError.code !== 'PGRST116') {
        throw selectError
      }

      let data
      if (!existingData) {
        // Criar novo registro
        const { data: insertData, error: insertError } = await supabase
          .from('site_content')
          .insert([{
            id: 1,
            benefits: newContent
          }])
          .select()
          .single()

        if (insertError) throw insertError
        data = insertData
      } else {
        // Atualizar registro existente
        const { data: updateData, error: updateError } = await supabase
          .from('site_content')
          .update({
            benefits: newContent
          })
          .eq('id', 1)
          .select()
          .single()

        if (updateError) throw updateError
        data = updateData
      }

      console.log('Dados salvos:', data)
      if (data?.benefits) {
        setLocalBenefits(data.benefits)
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans-section');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6">
                  <div className="h-12 w-12 bg-gray-700 rounded-full mx-auto mb-4" />
                  <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-4" />
                  <div className="h-20 bg-gray-700 rounded w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[80px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[80px] animate-pulse delay-1000" />
      </div>
      
      {isAdmin && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors z-10"
          title="Personalizar Seção"
        >
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      )}
      
      <div className="container mx-auto px-4 relative">
        {/* Section Title with enhanced styling */}
        <div className="flex flex-col items-center gap-4 mb-24">
          {localBenefits.title.split('|').map((part, index) => (
            <h2 
              key={index}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
              }}
            >
              {part}
            </h2>
          ))}
        </div>

        {/* Benefits Grid with enhanced cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {localBenefits.items.map((benefit, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-b from-blue-500/10 to-purple-500/10 p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              style={{
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />
              
              {/* Icon with enhanced styling */}
              <div className="relative text-5xl sm:text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <span className="relative z-10">{benefit.icon}</span>
                <div className="absolute inset-0 blur-2xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300" />
              </div>
              
              {/* Title with gradient effect */}
              <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {benefit.title}
              </h3>
              
              {/* Description with enhanced readability */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Button */}
        <div className="text-center">
          <Link
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollToPlans();
            }}
            className="group relative inline-flex items-center px-12 py-5 rounded-2xl text-xl font-bold overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #3B82F6)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite'
            }}
          >
            <span className="relative text-white flex items-center gap-2">
              Garanta Sua Vaga Agora!
              <svg 
                className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Enhanced decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      {/* Customization Sidebar */}
      <BenefitsCustomizationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        content={localBenefits}
        onSave={handleSave}
      />
    </section>
  )
}
