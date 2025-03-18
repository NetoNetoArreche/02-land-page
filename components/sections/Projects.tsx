'use client'

import Image from 'next/image'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import ProjectsCustomizationSidebar from '../ProjectsCustomizationSidebar'
import { createClient } from '@/lib/supabase-browser'

const defaultProjects = {
  title: "Veja o que Você Será Capaz de Construir!",
  items: [
    {
      title: "Plataforma de Gestão em Saúde",
      description: "Sistema especializado para psicólogos, psiquiatras e nutricionistas",
      image: "/projects/health.jpg",
      tech: ["Next.js", "Supabase", "Vercel"],
      isRecording: true
    },
    {
      title: "Landing Page Completa",
      description: "Página moderna e responsiva com hospedagem profissional",
      image: "/projects/landing.jpg",
      tech: ["Next.js", "Tailwind CSS", "Vercel"],
      isRecording: false
    },
    {
      title: "Dashboard SaaS",
      description: "Sistema profissional de análise e gestão",
      image: "/projects/dashboard.jpg",
      tech: ["React", "Charts.js", "REST API"],
      isRecording: true
    }
  ]
}

export default function Projects() {
  const { content, loading } = useRealtimeContent()
  const { isAdmin } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [localProjects, setLocalProjects] = useState(defaultProjects)

  // Atualizar projetos locais quando o conteúdo mudar
  useEffect(() => {
    console.log('Content atualizado:', content)
    if (content?.projects) {
      console.log('Projects atualizados:', content.projects)
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
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6">
                  <div className="h-48 bg-gray-700 rounded mb-4" />
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4" />
                  <div className="h-20 bg-gray-700 rounded w-full mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 w-20 bg-gray-700 rounded-full" />
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
    <section className="py-32 relative overflow-hidden">
      {/* Enhanced Background Effects */}
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
      
      <div className="container mx-auto px-4 relative">
        {/* Enhanced Section Title with Edit Button */}
        <div className="flex flex-col items-center gap-4 mb-24 relative">
          {localProjects.title.split('|').map((part, index) => (
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
          {isAdmin && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors z-10"
              title="Personalizar Seção"
            >
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          )}
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {localProjects.items.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-blue-500/10 to-purple-500/10 p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              style={{
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />
              
              {/* Project Image with enhanced container */}
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-shadow duration-300">
                {project.isRecording && (
                  <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    Em Gravação
                  </div>
                )}
                {project.image.startsWith('/') ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e: any) => {
                        console.error('Erro ao carregar imagem:', project.image)
                        e.target.src = '/projects/default.jpg'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Project Title with gradient effect */}
              <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {project.title}
              </h3>

              {/* Project Description with enhanced readability */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Enhanced Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 rounded-full text-sm font-medium border border-blue-500/20 hover:border-blue-500/40 hover:text-blue-200 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced "E muito mais..." text */}
        <div className="text-center mt-16">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x italic">
            E muito mais...
          </p>
        </div>
      </div>

      {/* Enhanced decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
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
