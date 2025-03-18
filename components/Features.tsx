'use client'

import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import EditableContent from './EditableContent'
import Image from 'next/image'

export default function Features() {
  const { content } = useRealtimeContent()
  const { isAdmin } = useAuth()

  const handleSave = async (path: string, value: string) => {
    if (!content) return

    try {
      const supabase = createClient()
      const [section, index, field] = path.split('.')
      
      let newContent: any = { ...content }
      
      if (index) {
        newContent[section] = [...content[section]]
        newContent[section][parseInt(index)][field] = value
      } else {
        newContent[section] = value
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

  // Dados padrão para quando não houver conteúdo do Supabase
  const defaultFeatures = [
    {
      title: "Domínio Completo das Ferramentas",
      description: "Domine Bolt.new, Windsurf Editor, Cursor e outras ferramentas de desenvolvimento de ponta",
      icon: "🛠️"
    },
    {
      title: "Desenvolvimento Full-Stack",
      description: "Construa aplicações completas com bancos de dados modernos, APIs e soluções de hospedagem",
      icon: "⚡"
    },
    {
      title: "Comunidade Ativa no Ciecle",
      description: "Conecte-se com outros devs, participe de eventos e receba ajuda em tempo real",
      icon: "💬"
    },
    {
      title: "Projetos do Mundo Real",
      description: "Desenvolva e faça deploy de aplicações prontas para produção do início ao fim",
      icon: "🚀"
    },
    {
      title: "Inteligência Artificial",
      description: "Aprenda a integrar e utilizar IA em seus projetos com as mais modernas ferramentas do mercado",
      icon: "🤖"
    }
  ]

  const defaultTools = [
    {
      name: "Bolt.new",
      logo: "/bolt-logo.svg",
      description: "Desenvolvimento web em tempo real"
    },
    {
      name: "Windsurf Editor",
      logo: "/windsurf-logo.svg",
      description: "Editor de código inteligente"
    },
    {
      name: "Cursor AI",
      logo: "/cursor-logo.svg",
      description: "Assistente de programação com IA"
    },
    {
      name: "GPTEngineers",
      logo: "/gpt-logo.svg",
      description: "Engenharia de software com IA"
    }
  ]

  // Use os dados do Supabase se disponíveis, caso contrário use os dados padrão
  const features = content?.features || defaultFeatures
  const tools = content?.tools || defaultTools

  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 bg-black/40">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Features */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 gradient-text">
          Jornada de Aprendizado Completa
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-16 sm:mb-24 lg:mb-32">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="neon-border bg-black/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl transform hover:scale-105 transition duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                {isAdmin ? (
                  <EditableContent
                    type="text"
                    content={feature.title}
                    onSave={(value) => handleSave(`features.${index}.title`, value)}
                    className="text-lg sm:text-xl font-semibold text-white"
                  />
                ) : (
                  feature.title
                )}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                {isAdmin ? (
                  <EditableContent
                    type="text"
                    content={feature.description}
                    onSave={(value) => handleSave(`features.${index}.description`, value)}
                    className="text-sm sm:text-base text-gray-400"
                  />
                ) : (
                  feature.description
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Ferramentas */}
        <div className="mt-16 sm:mt-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16 text-white">
            Ferramentas Exclusivas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 neon-border bg-black/50 backdrop-blur-sm rounded-xl hover:scale-105 transition duration-300"
              >
                <div className="w-24 h-24 relative mb-4">
                  {isAdmin ? (
                    <EditableContent
                      type="image"
                      content={tool.logo}
                      onSave={(value) => handleSave(`tools.${index}.logo`, value)}
                      imageProps={{
                        width: 96,
                        height: 96,
                        alt: tool.name
                      }}
                      className="object-contain"
                    />
                  ) : (
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isAdmin ? (
                    <EditableContent
                      type="text"
                      content={tool.name}
                      onSave={(value) => handleSave(`tools.${index}.name`, value)}
                      className="text-xl font-semibold text-white"
                    />
                  ) : (
                    tool.name
                  )}
                </h3>
                <p className="text-gray-400">
                  {isAdmin ? (
                    <EditableContent
                      type="text"
                      content={tool.description}
                      onSave={(value) => handleSave(`tools.${index}.description`, value)}
                      className="text-gray-400"
                    />
                  ) : (
                    tool.description
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Curricular */}
        <div className="mt-16 sm:mt-24 lg:mt-32">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16 text-white">
            Grade Curricular Completa
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                name: "Ferramentas de Desenvolvimento",
                items: ["Bolt.new", "Windsurf Editor", "Cursor AI", "GPTEngineers", "Framer", "Integração Git"]
              },
              {
                name: "Frontend & Design",
                items: ["React/Next.js", "Tailwind CSS", "Framer Motion", "Figma", "Design Responsivo"]
              },
              {
                name: "Backend & Banco de Dados",
                items: ["Firebase", "Supabase", "Vercel", "PostgreSQL"]
              },
              {
                name: "Comunidade & Suporte",
                items: ["Circle Exclusivo", "Code Reviews", "Eventos ao Vivo", "Networking"]
              }
            ].map((section, index) => (
              <div 
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-blue-500/50 transition duration-300"
              >
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-400">
                  {section.name}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-300 text-sm sm:text-base">
                      <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Projetos */}
        <div className="mt-16 sm:mt-24 lg:mt-32">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16 text-white">
            O Que Você Vai Construir
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Plataforma de Gestão em Saúde",
                desc: "Sistema especializado para psicólogos, psiquiatras e nutricionistas",
                tech: ["Next.js", "Supabase", "Vercel"]
              },
              {
                title: "Landing Page Completa",
                desc: "Página moderna e responsiva com hospedagem profissional",
                tech: ["Next.js", "Tailwind CSS", "Vercel"]
              },
              {
                title: "Dashboard SaaS",
                desc: "Sistema profissional de análise e gestão",
                tech: ["React", "Charts.js", "REST API"]
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="neon-border bg-black/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl"
              >
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
                  {project.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 sm:px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
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