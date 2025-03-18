'use client'

import Link from 'next/link'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import EditableContent from './EditableContent'
import FloatingCard from './FloatingCard'

export default function Hero() {
  const { content } = useRealtimeContent()
  const { isAdmin } = useAuth()

  const handleSave = async (path: string, value: string) => {
    if (!content) return

    try {
      const supabase = createClient()
      const [section, field] = path.split('.')
      
      const newContent = {
        ...content,
        [section]: {
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

  const handleToolSave = async (index: number, field: string, value: string) => {
    if (!content) return

    try {
      const supabase = createClient()
      const updatedTools = [...content.tools]
      updatedTools[index] = {
        ...updatedTools[index],
        [field]: value
      }

      const { error } = await supabase
        .from('site_content')
        .update({ tools: updatedTools })
        .eq('id', content.id)

      if (error) throw error
    } catch (error) {
      console.error('Erro ao salvar ferramenta:', error)
    }
  }

  if (!content) {
    return null
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-purple-500/20 rounded-full blur-[96px] animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        {/* Hero Text */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8">
            {isAdmin ? (
              <EditableContent
                type="text"
                content={content.hero.title}
                onSave={(value) => handleSave('hero.title', value)}
                className="gradient-text animate-gradient inline-block"
              />
            ) : (
              <span className="gradient-text animate-gradient">{content.hero.title}</span>
            )}
            <br />
            {isAdmin ? (
              <EditableContent
                type="text"
                content={content.hero.subtitle}
                onSave={(value) => handleSave('hero.subtitle', value)}
                className="gradient-text animate-gradient inline-block"
              />
            ) : (
              <span className="gradient-text animate-gradient">{content.hero.subtitle}</span>
            )}
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12">
            Domine o desenvolvimento moderno com nossas ferramentas exclusivas
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="#pricing"
              className="group relative px-8 py-4 rounded-xl text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">
                {isAdmin ? (
                  <EditableContent
                    type="text"
                    content={content.hero.ctaText}
                    onSave={(value) => handleSave('hero.ctaText', value)}
                    className="relative text-white"
                  />
                ) : (
                  content.hero.ctaText
                )}
              </span>
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 rounded-xl text-lg font-semibold text-white hover-neon transition-all duration-300 border border-blue-500/50 hover:border-blue-400 hover:scale-105"
            >
              Explorar Recursos
            </Link>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {content.tools.map((tool, index) => (
            <FloatingCard
              key={index}
              logo={tool.logo}
              title={tool.name}
              description={tool.description}
              onSave={(field, value) => handleToolSave(index, field, value)}
              className="animate-float"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Highlight Box */}
        <div className="mt-20 text-center">
          <div className="inline-block transform hover:scale-105 transition-all duration-300">
            <div className="p-6 sm:p-8 glass rounded-2xl border border-blue-500/20">
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl animate-bounce">⚡</span>
                <div>
                  <p className="text-lg sm:text-2xl">
                    <span className="gradient-text font-bold">Oferta Especial de Lançamento</span>
                    <br />
                    <span className="text-white">Últimas vagas com 30% de desconto!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    </section>
  )
}