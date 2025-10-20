'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-900 text-lg font-medium">Carregando conteúdo...</p>
        </div>
      </div>
    )
  }

  // Fallback to default if content is missing
  const heroContent = {
    ...defaultHero,
    ...localHero
  }

  // Animações Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden pt-16">
        {isAdmin && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 right-4 z-50 bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 text-white p-3 rounded-xl transition-all duration-300"
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
          </motion.button>
        )}
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Gradient Orbs */}
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>


        {/* Main Content */}
        <motion.div 
          className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={`max-w-4xl mx-auto ${alignmentClasses} mb-8 sm:mb-12 md:mb-16 lg:mb-20`}>
            {/* Logo */}
            {heroContent.logo?.url && (
              <motion.div 
                variants={itemVariants}
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
                <motion.img
                  src={heroContent.logo.url}
                  alt="Logo"
                  style={{
                    width: `${heroContent.logo.width}px`,
                    height: `${heroContent.logo.height}px`,
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
            )}

            {/* Hero Title */}
            <motion.h1
              variants={itemVariants}
              className={`font-bold mb-3 sm:mb-4 md:mb-6 cursor-pointer ${titleClasses} leading-tight text-white`}
              style={{ 
                textAlign: heroContent.elementsAlignment || 'center',
                fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              onClick={() => isAdmin && setIsSidebarOpen(true)}
            >
              {heroContent.title}
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-slate-300 leading-relaxed px-2 sm:px-0"
              style={{ 
                textAlign: heroContent.elementsAlignment || 'center',
                fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)'
              }}
            >
              {heroContent.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${alignmentClasses}`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToPlans();
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {heroContent.ctaText}
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Tech Stack Pills */}
          <motion.div 
            variants={itemVariants}
            className={`flex flex-wrap gap-2 sm:gap-3 lg:gap-4 ${alignmentClasses} mb-8 sm:mb-10 lg:mb-12 px-2 sm:px-0`}
          >
            {heroContent.tags?.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 bg-slate-800/60 backdrop-blur-sm text-blue-400 rounded-full text-xs sm:text-sm lg:text-base font-medium border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Highlight Box */}
          <motion.div 
            variants={itemVariants}
            className={`mt-8 sm:mt-12 lg:mt-20 ${alignmentClasses} px-2 sm:px-0`}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="inline-block w-full sm:w-auto"
            >
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl border border-slate-600/50 shadow-2xl">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                  <motion.span 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl flex-shrink-0"
                  >
                    ⚡
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold text-base sm:text-lg lg:text-xl xl:text-2xl block sm:inline">
                        {heroContent.offer?.title || "Oferta Especial de Lançamento"}
                      </span>
                      <br className="hidden sm:block" />
                      <span className="text-slate-300 font-medium text-sm sm:text-base lg:text-lg">
                        {heroContent.offer?.description || "Últimas vagas com 30% de desconto!"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
        </div>

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
