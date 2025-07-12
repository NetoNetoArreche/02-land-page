'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { useTrackingEvents } from '@/hooks/useTrackingEvents'
import { createClient } from '@/lib/supabase-browser'
import CustomizationSidebar from '../CustomizationSidebar'
import { metaConversions } from '@/lib/meta-conversions'
import { metaPixel } from '@/lib/meta-pixel'

type ElementsAlignment = 'left' | 'center' | 'right'
type TitleSize = 'small' | 'medium' | 'large'
type CTAStyle = 'solid' | 'outline' | 'gradient'

interface HeroContent {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  elementsAlignment: ElementsAlignment
  titleSize: TitleSize
  titleColor: string
  subtitleColor: string
  ctaStyle: CTAStyle
  tags: string[]
  offer: {
    title: string
    description: string
  }
  floatingCards: Array<{
    code: string
    color: string
    position: { x: number; y: number }
    rotation: number
  }>
  logo: {
    url: string
    width: number
    height: number
    marginBottom: number
    neonEffect: boolean
  }
}

const defaultHero: HeroContent = {
  title: "PARE DE APENAS SONHAR! Crie Aplicativos e Sites do ZERO, em DIAS, Sem Uma Linha de Código – E COMECE A LUCRAR AGORA! ",
  subtitle: "Aprenda com ferramentas inovadoras como Bolt.new, Framer e muito mais. Transforme suas ideias em soluções reais sem escrever uma única linha de código avançado.",
  ctaText: "Quero Fazer Parte da Comunidade Agora!",
  ctaLink: "#pricing",
  elementsAlignment: 'center' as const,
  titleSize: 'large' as const,
  titleColor: '#ffffff',
  subtitleColor: '#94a3b8',
  ctaStyle: 'gradient' as const,
  tags: ["No Code", "Design UI/UX", "Framer", "Bolt.new"],
  offer: {
    title: "Oferta Especial de Lançamento",
    description: "Últimas vagas com 30% de desconto!"
  },
  floatingCards: [
    {
      code: 'const future = nocode.new()',
      color: 'text-blue-400',
      position: { x: 20, y: 25 },
      rotation: -12
    },
    {
      code: 'deploy.to("success")',
      color: 'text-purple-400',
      position: { x: 75, y: 66 },
      rotation: 12
    }
  ],
  logo: {
    url: '',
    width: 200,
    height: 80,
    marginBottom: 40,
    neonEffect: false
  }
}

export default function Hero() {
  const { content, loading } = useRealtimeContent()
  const { isAdmin } = useAuth()
  const { trackSectionView } = useTrackingEvents()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [localHero, setLocalHero] = useState(defaultHero)
  const [draggedCard, setDraggedCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    trackSectionView('Hero')
    
    // Envia evento de visualização de conteúdo para ambos Pixel e API
    const sendViewContentEvent = async () => {
      try {
        // Gera ID único para o evento
        const eventId = metaPixel.track('ViewContent', {
          content_name: 'Homepage',
          content_category: 'Landing Page',
          content_type: 'website'
        })

        // Envia para API de Conversões com mesmo eventId
        await metaConversions.viewContent({
          eventId,
          customData: {
            content_name: 'Homepage',
            content_category: 'Landing Page',
            content_type: 'website'
          }
        })
      } catch (error) {
        console.error('Erro ao enviar evento de visualização:', error)
      }
    }

    sendViewContentEvent()
  }, [])

  useEffect(() => {
    console.log('Content atualizado:', content)
    if (content?.hero) {
      console.log('Hero atualizado:', content.hero)
      console.log('Logo:', content.hero.logo)
      
      // Garantir que a logo tenha valores padrão
      const updatedHero = {
        ...content.hero,
        logo: content.hero.logo ? {
          url: content.hero.logo.url,
          width: content.hero.logo.width || 200,
          height: content.hero.logo.height || 80,
          marginBottom: content.hero.logo.marginBottom || 40,
          neonEffect: content.hero.logo.neonEffect || false
        } : defaultHero.logo
      }
      
      console.log('Hero atualizado com logo:', updatedHero)
      setLocalHero(updatedHero)
    }
  }, [content])

  const handleSave = async (newContent: any) => {
    try {
      console.log('Salvando novo conteúdo:', newContent)
      const supabase = createClient()
      
      // Garantir que a logo seja preservada
      const updatedHero = {
        ...localHero,
        ...newContent,
        logo: newContent.logo || localHero.logo
      }
      
      console.log('Hero para salvar:', updatedHero)

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
            hero: updatedHero
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
            hero: updatedHero
          })
          .eq('id', 1)
          .select()
          .single()

        if (updateError) throw updateError
        data = updateData
      }

      console.log('Dados salvos:', data)
      if (data?.hero) {
        setLocalHero(data.hero)
      }
      // Removido o setIsSidebarOpen(false) para não fechar o sidebar automaticamente
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const updateCardPosition = (index: number, x: number, y: number) => {
    const newCards = [...localHero.floatingCards]
    newCards[index] = {
      ...newCards[index],
      position: { x, y }
    }
    setLocalHero(prev => ({
      ...prev,
      floatingCards: newCards
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    if (draggedCard === null || !containerRef.current || !e.clientX || !e.clientY) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const offsetX = dragOffsetRef.current.x
    const offsetY = dragOffsetRef.current.y
    
    // Calculate position as percentage
    const x = ((e.clientX - offsetX - rect.left) / rect.width) * 100
    const y = ((e.clientY - offsetY - rect.top) / rect.height) * 100

    // Clamp values between 0 and 100
    const newX = Math.max(0, Math.min(100, x))
    const newY = Math.max(0, Math.min(100, y))

    // Update position without waiting
    const newCards = [...localHero.floatingCards]
    newCards[draggedCard] = {
      ...newCards[draggedCard],
      position: { x: newX, y: newY }
    }
    
    setLocalHero(prev => ({
      ...prev,
      floatingCards: newCards
    }))
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const card = localHero.floatingCards[index]
    
    // Set drag offset relative to card position
    dragOffsetRef.current = {
      x: e.clientX - (rect.left + (card.position.x * rect.width / 100)),
      y: e.clientY - (rect.top + (card.position.y * rect.height / 100))
    }

    setDraggedCard(index)
    e.dataTransfer.setDragImage(new Image(), 0, 0) // Hide default drag image
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    if (draggedCard !== null) {
      // Save the final position
      handleSave(localHero)
      setDraggedCard(null)
    }
  }

  const alignmentClasses = {
    left: 'text-left justify-start',
    center: 'text-center justify-center',
    right: 'text-right justify-end'
  }[localHero.elementsAlignment || 'center']

  const titleClasses = {
    small: 'text-2xl sm:text-3xl lg:text-5xl',
    medium: 'text-3xl sm:text-4xl lg:text-6xl',
    large: 'text-3xl sm:text-5xl lg:text-7xl'
  }[localHero.titleSize || 'large']

  const ctaClasses = {
    solid: 'bg-blue-500 hover:bg-blue-600',
    outline: 'border-2 border-blue-500 hover:bg-blue-500/20',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90'
  }[localHero.ctaStyle || 'gradient']

  const scrollToPlans = () => {
    const plansSection = document.getElementById('pricing');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando conteúdo...</p>
        </div>
      </div>
    )
  }

  // Fallback to default if content is missing
  const heroContent = {
    ...defaultHero,
    ...localHero
  }

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {isAdmin && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>
        )}
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-purple-500/20 rounded-full blur-[96px] animate-pulse delay-1000" />

        {/* Floating Code Snippets */}
        <div 
          ref={containerRef}
          className="absolute inset-0 overflow-hidden"
          onDragOver={(e) => {
            e.preventDefault()
            if (draggedCard !== null && isAdmin) {
              handleDrag(e)
            }
          }}
          onDrop={(e) => {
            e.preventDefault()
            handleDragEnd()
          }}
        >
          {heroContent.floatingCards?.map((card, index) => (
            <div
              key={index}
              className={`absolute hidden md:block transform ${isAdmin ? 'cursor-move' : ''}`}
              style={{
                left: `${card.position.x}%`,
                top: `${card.position.y}%`,
                transform: `rotate(${card.rotation}deg)`,
                transition: draggedCard === index ? 'none' : 'all 0.3s ease',
                zIndex: draggedCard === index ? 50 : 1,
                cursor: isAdmin ? 'move' : 'default'
              }}
              draggable={isAdmin}
              onDragStart={(e) => isAdmin && handleDragStart(e, index)}
              onDragEnd={(e) => isAdmin && handleDragEnd()}
              onClick={(e) => {
                if (isAdmin) {
                  e.stopPropagation()
                  setIsSidebarOpen(true)
                }
              }}
            >
              <div className={`neon-border bg-black/80 backdrop-blur-sm p-4 rounded-lg ${draggedCard === index ? '' : 'animate-float'}`}>
                <pre className={`text-sm ${card.color}`}>
                  <code>{card.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
          <div className={`max-w-4xl mx-auto ${alignmentClasses} mb-12 sm:mb-16 md:mb-20`}>
            {/* Logo */}
            {heroContent.logo?.url && (
              <div 
                className="mb-6 sm:mb-8 cursor-pointer flex items-center justify-center"
                style={{ 
                  marginBottom: heroContent.logo.marginBottom,
                  justifyContent: heroContent.elementsAlignment === 'left' 
                    ? 'flex-start' 
                    : heroContent.elementsAlignment === 'right' 
                      ? 'flex-end' 
                      : 'center'
                }}
                onClick={() => isAdmin && setIsSidebarOpen(true)}
              >
                <img
                  src={heroContent.logo.url}
                  alt="Logo"
                  style={{
                    width: `${heroContent.logo.width}px`,
                    height: `${heroContent.logo.height}px`,
                    maxWidth: '100%',
                    objectFit: 'contain',
                    ...(heroContent.logo.neonEffect && {
                      filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
                      mixBlendMode: 'screen'
                    })
                  }}
                  className="animate-float"
                />
              </div>
            )}

            {/* Hero Title */}
            <h1
              className={`font-bold mb-4 sm:mb-6 gradient-text animate-gradient cursor-pointer neon-text ${titleClasses} leading-tight sm:leading-relaxed`}
              style={{ 
                textAlign: heroContent.elementsAlignment || 'center',
                color: heroContent.titleColor,
                textShadow: '0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.25)',
                fontSize: 'clamp(1.75rem, 5vw, 4rem)' // Tamanho responsivo que se adapta à largura da tela
              }}
            >
              {heroContent.title}
            </h1>

            {/* Hero Subtitle */}
            <p
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12"
              style={{ 
                textAlign: heroContent.elementsAlignment || 'center',
                color: heroContent.subtitleColor,
                textShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                fontSize: 'clamp(1rem, 3vw, 1.5rem)' // Tamanho responsivo para o subtítulo
              }}
            >
              {heroContent.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${alignmentClasses}`}>
              <Link
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToPlans();
                }}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
              >
                <span className="relative text-white">
                  {heroContent.ctaText}
                </span>
              </Link>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className={`flex flex-wrap gap-3 sm:gap-4 ${alignmentClasses} mb-12`}>
            {heroContent.tags?.map((tech, index) => (
              <span
                key={index}
                className="px-4 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full text-sm sm:text-base md:text-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Highlight Box */}
          <div className={`mt-12 sm:mt-20 ${alignmentClasses}`}>
            <div className="inline-block transform hover:scale-105 transition-all duration-300">
              <div className="p-4 sm:p-6 md:p-8 glass neon-border rounded-2xl">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce">⚡</span>
                  <div>
                    <p className="text-base sm:text-lg md:text-2xl">
                      <span className="gradient-text font-bold">
                        {heroContent.offer?.title || "Oferta Especial de Lançamento"}
                      </span>
                      <br />
                      <span className="text-white">
                        {heroContent.offer?.description || "Últimas vagas com 30% de desconto!"}
                      </span>
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

        {/* Admin Edit Hint */}
        {isAdmin && (
          <div className="absolute top-4 right-4 text-sm text-gray-400">
            Clique no título para customizar
          </div>
        )}
      </section>

      {/* Customization Sidebar */}
      <CustomizationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        content={heroContent}
        onSave={handleSave}
      />
    </>
  )
}
