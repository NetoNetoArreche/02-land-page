'use client'

import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import EditableSection from '../EditableSection'

interface CurriculumSection {
  title: string;
  items: string[];
}

interface CurriculumData {
  title: string;
  sections: CurriculumSection[];
}

const defaultCurriculum: CurriculumData = {
  title: "Domine as Ferramentas|Mais Poderosas do No Code e Além!",
  sections: [
    {
      title: "Ferramentas de Desenvolvimento",
      items: [
        "Bolt.new",
        "Windsurf Editor",
        "Cursor AI",
        "GPTEngineers",
        "Framer",
        "Integração Git"
      ]
    },
    {
      title: "Frontend & Design",
      items: [
        "React/Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Figma",
        "Design Responsivo"
      ]
    },
    {
      title: "Backend & Banco de Dados",
      items: [
        "Firebase",
        "Supabase",
        "Vercel",
        "PostgreSQL"
      ]
    },
    {
      title: "Comunidade & Suporte",
      items: [
        "Circle Exclusivo",
        "Eventos ao Vivo",
        "Networking"
      ]
    }
  ]
}

export default function Curriculum() {
  const { content } = useRealtimeContent()
  const { isAdmin } = useAuth()

  const handleSave = async (path: string, value: string) => {
    if (!content) return

    try {
      const supabase = createClient()
      const [section, index, subIndex, field] = path.split('.')
      
      let newContent: any = { ...content }
      
      if (index) {
        newContent[section].sections = [...content[section].sections]
        if (subIndex) {
          // Editando um item específico da lista
          newContent[section].sections[parseInt(index)].items = [
            ...content[section].sections[parseInt(index)].items
          ]
          newContent[section].sections[parseInt(index)].items[parseInt(subIndex)] = value
        } else {
          // Editando o título da seção
          newContent[section].sections[parseInt(index)][field] = value
        }
      } else {
        // Editando o título principal
        newContent[section] = {
          ...content[section],
          [field]: value
        }
      }

      const { error } = await supabase
        .from('site_content')
        .update(newContent)
        .eq('id', content.id)

      if (error) throw error
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  // Use o conteúdo do banco ou o conteúdo padrão
  const curriculum = content?.curriculum || defaultCurriculum

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
        <div className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Enhanced Section Title */}
        <div className="flex flex-col items-center gap-4 mb-24">
          {curriculum.title.split('|').map((part: string, index: number) => (
            <h2 
              key={index}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
              }}
            >
              {isAdmin ? (
                <EditableSection
                  path={`curriculum.title.${index}`}
                  content={part}
                  onSave={handleSave}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x"
                />
              ) : (
                part
              )}
            </h2>
          ))}
        </div>

        {/* Novo Layout do Currículo */}
        <div className="relative">
          {/* Linha central decorativa */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50 hidden lg:block" />
          
          <div className="space-y-16">
            {curriculum.sections.map((section: CurriculumSection, sectionIndex: number) => (
              <div 
                key={sectionIndex}
                className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 ${
                  sectionIndex % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Título da Seção */}
                <div className={`w-full lg:w-1/3 text-center ${
                  sectionIndex % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'
                }`}>
                  <div className="relative inline-block">
                    <h4 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">
                      {isAdmin ? (
                        <EditableSection
                          path={`curriculum.${sectionIndex}.title`}
                          content={section.title}
                          onSave={handleSave}
                          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                        />
                      ) : (
                        section.title
                      )}
                    </h4>
                    {/* Número da Seção */}
                    <span className="absolute -top-6 -left-4 text-6xl font-bold text-blue-500/10">
                      {(sectionIndex + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Marcador Central */}
                <div className="hidden lg:block w-12 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ring-4 ring-blue-500/20" />
                  </div>
                </div>

                {/* Lista de Items */}
                <div className={`w-full lg:w-1/2 bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 group ${
                  sectionIndex % 2 === 0 ? 'lg:text-left' : 'lg:text-left'
                }`}
                style={{
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {section.items.map((item: string, itemIndex: number) => (
                      <div 
                        key={itemIndex}
                        className="flex items-start gap-4 group/item bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover/item:from-blue-500/30 group-hover/item:to-purple-500/30 transition-all duration-300">
                          <svg className="w-4 h-4 text-blue-400 group-hover/item:text-blue-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300 font-medium">
                          {isAdmin ? (
                            <EditableSection
                              path={`curriculum.${sectionIndex}.${itemIndex}.item`}
                              content={item}
                              onSave={handleSave}
                              className="text-gray-300 group-hover/item:text-white transition-colors duration-300"
                            />
                          ) : (
                            item
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
