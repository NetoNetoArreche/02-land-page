'use client'

import Image from 'next/image'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect, memo, useRef } from 'react'
import { motion } from 'framer-motion'
import ProjectsCustomizationSidebar from '../ProjectsCustomizationSidebar'
import { createClient } from '@/lib/supabase-browser'

// Componente Ticker que usa dados do banco
const TickerComponent = memo(({ projects }: { projects: any[] }) => {
  const tickerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationIdRef = useRef<number>()
  const currentTranslateRef = useRef(0) // Manter posição entre pausas

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    const tickerWidth = ticker.scrollWidth / 2 // Metade porque duplicamos
    
    const animate = () => {
      if (!isPaused) {
        currentTranslateRef.current -= 0.5 // Velocidade do movimento (pixels por frame)
        
        // Reset seamless quando chega na metade
        if (Math.abs(currentTranslateRef.current) >= tickerWidth) {
          currentTranslateRef.current = 0
        }
        
        ticker.style.transform = `translateX(${currentTranslateRef.current}px)`
      }
      
      animationIdRef.current = requestAnimationFrame(animate)
    }
    
    animationIdRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [projects, isPaused])

  return (
    <div 
      className="sticky top-20 z-20 mb-12 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden py-8 w-screen -ml-[50vw] left-1/2 max-w-none">
        <div ref={tickerRef} className="flex gap-8">
          {[...projects, ...projects].map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0"
            >
              <div className="w-64 h-96 rounded-lg overflow-hidden border border-slate-700/30 hover:border-blue-500/50 transition-colors duration-300 shadow-md relative">
                {/* Debug no useEffect */}
                {(() => { console.log('Projeto:', project); return null; })()}
                
                {project.image && project.image.includes('supabase') ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onLoad={() => console.log('Imagem carregada com sucesso:', project.image)}
                    onError={(e) => {
                      console.error('ERRO ao carregar imagem do Supabase:', project.image)
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Fallback que aparece quando imagem falha */}
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center absolute top-0 left-0" style={{ display: 'none' }}>
                  <div className="text-center p-6">
                    <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
})

TickerComponent.displayName = 'TickerComponent'

const defaultProjects = {
  title: "Veja o que Você Será Capaz de Construir!",
  subtitle: "Projetos reais criados por membros da nossa comunidade",
  items: [
    {
      title: "Plataforma de Gestão em Saúde",
      description: "Sistema especializado para psicólogos, psiquiatras e nutricionistas",
      image: "/projects/health.jpg",
      tech: ["Next.js", "Supabase", "Vercel"],
      category: "SaaS"
    },
    {
      title: "Landing Page Completa",
      description: "Página moderna e responsiva com hospedagem profissional",
      image: "/projects/landing.jpg",
      tech: ["Next.js", "Tailwind CSS", "Vercel"],
      category: "Website"
    },
    {
      title: "Dashboard SaaS",
      description: "Sistema profissional de análise e gestão",
      image: "/projects/dashboard.jpg",
      tech: ["React", "Charts.js", "REST API"],
      category: "Dashboard"
    },
    {
      title: "E-commerce Moderno",
      description: "Loja virtual completa com pagamentos integrados",
      image: "/projects/ecommerce.jpg",
      tech: ["Next.js", "Stripe", "Prisma"],
      category: "E-commerce"
    },
    {
      title: "App Mobile Híbrido",
      description: "Aplicativo multiplataforma com React Native",
      image: "/projects/mobile.jpg",
      tech: ["React Native", "Expo", "Firebase"],
      category: "Mobile"
    },
    {
      title: "Sistema de CRM",
      description: "Gestão completa de relacionamento com clientes",
      image: "/projects/crm.jpg",
      tech: ["Vue.js", "Node.js", "MongoDB"],
      category: "CRM"
    }
  ]
}

export default function Projects() {
  const { content, loading } = useRealtimeContent()
  const { isAdmin } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [localProjects, setLocalProjects] = useState(defaultProjects)
  

  // Usar projetos estáticos para o ticker (evita re-renders)
  const tickerProjects = defaultProjects.items
  
  // Atualizar projetos locais quando o conteúdo mudar (para todos os usuários)
  useEffect(() => {
    if (content?.projects) {
      setLocalProjects(content.projects)
    }
  }, [content])

  const handlePreview = (newContent: any) => {
    console.log('Preview novo conteúdo:', newContent)
    setLocalProjects(newContent)
  }

  const handleSave = async () => {
    try {
      console.log('Salvando novo conteúdo:', localProjects)
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
            projects: localProjects
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
            projects: localProjects
          })
          .eq('id', 1)
          .select()
          .single()

        if (updateError) throw updateError
        data = updateData
      }

      console.log('Dados salvos:', data)
      if (data?.projects) {
        setLocalProjects(data.projects)
      }
      setIsSidebarOpen(false)
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-3/4 mx-auto mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-6">
                  <div className="h-48 bg-slate-700 rounded mb-4" />
                  <div className="h-6 bg-slate-700 rounded w-3/4 mb-4" />
                  <div className="h-20 bg-slate-700 rounded w-full mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 w-20 bg-slate-700 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 relative"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white">
            {localProjects.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            {localProjects.subtitle}
          </p>
          
          {/* Admin Button */}
          {isAdmin && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute top-0 right-0 p-3 rounded-xl bg-white shadow-lg hover:shadow-xl text-slate-700 border border-slate-200 transition-all duration-300 hover:scale-105 z-10"
              title="Personalizar Seção"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          )}
        </motion.div>

      </div>

      {/* Ticker com dados do banco */}
      <TickerComponent projects={localProjects.items} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


        {/* Enhanced "E muito mais..." text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent italic">
            E muito mais...
          </p>
        </motion.div>
      </div>

      {/* Customization Sidebar */}
      <ProjectsCustomizationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        content={localProjects}
        onPreview={handlePreview}
        onSave={handleSave}
      />
    </section>
  )
}
