'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import BenefitsCustomizationSidebar from '../BenefitsCustomizationSidebar'

// Função para renderizar ícones baseado no tipo
const renderIcon = (iconType: string) => {
  const iconProps = "w-12 h-12"
  
  switch (iconType) {
    case 'lightning':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'beaker':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    case 'users':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    case 'academic':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    case 'modules':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    case 'video':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    case 'calendar':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    default:
      return null
  }
}

const defaultBenefits = {
  title: "Por que fazer parte da|Comunidade Vibe Coding?",
  items: [
    {
      iconType: "modules",
      title: "Módulos Completos",
      description: "Conteúdo estruturado e organizado para seu aprendizado progressivo.",
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10"
    },
    {
      iconType: "beaker",
      title: "Melhores Ferramentas",
      description: "Bolt.new, Framer, Cursor AI, Supabase e as tecnologias mais atuais.",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10"
    },
    {
      iconType: "lightning",
      title: "Tudo Passo a Passo",
      description: "Metodologia clara e didática para você não se perder no processo.",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-500/10 to-orange-500/10"
    },
    {
      iconType: "users",
      title: "4 Professores",
      description: "Equipe especializada em diferentes áreas para te dar suporte completo.",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10"
    },
    {
      iconType: "video",
      title: "Lives 2x na Semana",
      description: "Conteúdo ao vivo toda segunda e quinta-feira às 20:30.",
      color: "from-red-400 to-rose-500",
      bgColor: "from-red-500/10 to-rose-500/10"
    },
    {
      iconType: "calendar",
      title: "2 Módulos por Mês",
      description: "Ritmo acelerado de aprendizado com novos conteúdos mensais.",
      color: "from-indigo-400 to-blue-500",
      bgColor: "from-indigo-500/10 to-blue-500/10"
    },
    {
      iconType: "shield",
      title: "7 dias, 100% Livre de Riscos",
      description: "Garantia total de satisfação ou seu dinheiro de volta.",
      color: "from-emerald-400 to-green-500",
      bgColor: "from-emerald-500/10 to-green-500/10"
    },
    {
      iconType: "academic",
      title: "Comunidade e Grupo",
      description: "Networking com profissionais e acesso ao grupo exclusivo no Circle.",
      color: "from-cyan-400 to-teal-500",
      bgColor: "from-cyan-500/10 to-teal-500/10"
    }
  ]
}

// Componente de Card com Efeito Tilt Magnético
const InteractiveCard = ({ benefit, index }: { benefit: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCardHydrated, setIsCardHydrated] = useState(false)
  const [rotations, setRotations] = useState({ x: 0, y: 0, z: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Aguardar hidratação
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setIsCardHydrated(true)
    }
  }, [])

  // Funções utilitárias para cálculos
  const round = (num: number, fix = 2) => parseFloat(num.toFixed(fix))
  const distance = (x1: number, y1: number, x2: number, y2: number) => 
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

  // Handler para movimento do mouse - efeito tilt magnético
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    setIsAnimating(true)
    const rect = cardRef.current.getBoundingClientRect()
    
    // Posição do mouse relativa ao card
    const absolute = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
    
    // Posição em porcentagem do centro
    const percent = {
      x: round((100 / rect.width) * absolute.x),
      y: round((100 / rect.height) * absolute.y)
    }
    
    // Calcular centro (-50% a 50%)
    const center = {
      x: percent.x - 50,
      y: percent.y - 50
    }
    
    // Aplicar rotações suaves
    setRotations({
      x: round(center.y / 8), // Rotação X baseada em Y
      y: round(-center.x / 8), // Rotação Y baseada em X (invertida)
      z: round(distance(percent.x, percent.y, 50, 50) / 25) // Rotação Z baseada na distância
    })
  }

  // Handler para quando o mouse sai do card
  const handleMouseLeave = () => {
    setIsAnimating(false)
    setRotations({ x: 0, y: 0, z: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotations.x,
        rotateY: rotations.y,
        rotateZ: rotations.z,
        scale: isAnimating ? 1.05 : 1
      }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center",
        perspective: "1000px"
      }}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        rotateX: { type: "spring", stiffness: 300, damping: 20 },
        rotateY: { type: "spring", stiffness: 300, damping: 20 },
        rotateZ: { type: "spring", stiffness: 300, damping: 20 },
        scale: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { delay: index * 0.1, duration: 0.6 },
        y: { delay: index * 0.1, duration: 0.6 }
      }}
    >
      <div className={`relative bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden`}>
        {/* Glow effect baseado na cor */}
        <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        {/* Efeito de brilho que segue o mouse - DENTRO do card */}
        <motion.div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${rotations.y * 8 + 50}% ${-rotations.x * 8 + 50}%, rgba(34, 211, 238, 0.4), transparent 60%)`
          }}
        />
        
        {/* Ícone com animação */}
        <motion.div 
          className={`mb-6 text-white relative z-10`}
          whileHover={{ 
            scale: 1.2,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        >
          {(() => {
            console.log('Renderizando ícone:', benefit.iconType, benefit.title)
            if (benefit.iconType) {
              const icon = renderIcon(benefit.iconType)
              console.log('Ícone renderizado:', icon)
              return icon || (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )
            }
            return benefit.icon || (
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )
          })()}
        </motion.div>
        
        {/* Título */}
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300 relative z-10">
          {benefit.title}
        </h3>
        
        {/* Descrição */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10">
          {benefit.description}
        </p>
        
        {/* Indicador de interatividade */}
        <motion.div 
          className="absolute top-4 right-4 text-cyan-400 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          animate={{ 
            scale: isAnimating ? [1, 1.2, 1] : 1,
            rotate: isAnimating ? [0, 360] : 0
          }}
          transition={{ 
            duration: 1,
            repeat: isAnimating ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Benefits() {
  const { content, loading } = useRealtimeContent()
  const { isAdmin } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [localBenefits, setLocalBenefits] = useState(defaultBenefits)
  const [isHydrated, setIsHydrated] = useState(false)
  const containerRef = useRef(null)

  // Aguardar hidratação antes de usar useScroll
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHydrated(true)
    }
  }, [])

  // Hooks do Framer Motion condicionais para evitar erro de hidratação
  const { scrollYProgress } = useScroll(
    isHydrated && containerRef.current ? {
      target: containerRef,
      offset: ["start end", "end start"]
    } : {}
  )
  
  const backgroundY = useTransform(scrollYProgress || 0, [0, 1], ["0%", "50%"])
  const titleScale = useTransform(scrollYProgress || 0, [0, 0.5, 1], [0.8, 1, 1.2])

  // Função para normalizar benefits antigos
  const normalizeBenefits = (benefits: any) => {
    // Se os benefits têm o formato antigo (com icon em vez de iconType), usar defaultBenefits
    if (benefits?.items?.some((item: any) => item.icon && !item.iconType)) {
      console.log('Detectados benefits antigos, usando defaultBenefits')
      return defaultBenefits
    }
    
    // Se tem número diferente de 8 items, usar os defaultBenefits
    if (benefits?.items?.length !== 8) {
      console.log('Número incorreto de benefits detectado, usando defaultBenefits')
      return defaultBenefits
    }
    
    return benefits || defaultBenefits
  }

  // Atualizar benefícios locais quando o conteúdo mudar
  useEffect(() => {
    const initializeBenefits = async () => {
      try {
        const supabase = createClient()
        
        // Sempre atualizar com os novos defaultBenefits
        const { data: updateData, error: updateError } = await supabase
          .from('site_content')
          .upsert({
            id: 1,
            benefits: defaultBenefits
          })
          .select()
          .single()

        if (updateError) throw updateError
        console.log('Benefits atualizados:', updateData)
        setLocalBenefits(defaultBenefits)
      } catch (error) {
        console.error('Erro ao atualizar benefits:', error)
        // Em caso de erro, usar defaultBenefits
        setLocalBenefits(defaultBenefits)
      }
    }

    // Sempre usar os novos benefits
    if (content?.benefits) {
      const normalizedBenefits = normalizeBenefits(content.benefits)
      setLocalBenefits(normalizedBenefits)
      
      // Se os benefits foram normalizados (eram antigos), atualizar no banco
      if (normalizedBenefits === defaultBenefits) {
        initializeBenefits()
      }
    } else {
      initializeBenefits()
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-3/4 mx-auto mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-6">
                  <div className="h-12 w-12 bg-slate-700 rounded-full mx-auto mb-4" />
                  <div className="h-6 bg-slate-700 rounded w-3/4 mx-auto mb-4" />
                  <div className="h-20 bg-slate-700 rounded w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }


  return (
    <section id="benefits" ref={containerRef} className="py-16 sm:py-20 lg:py-24 relative">
      
      {isAdmin && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 right-4 p-3 rounded-xl bg-white shadow-lg hover:shadow-xl text-slate-700 border border-slate-200 transition-all duration-300 hover:scale-105 z-10"
          title="Personalizar Seção"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header com parallax */}
          <motion.div 
            style={{ scale: titleScale }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {localBenefits.title.split('|').map((part, index) => (
              <motion.h2 
                key={index}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {index === 1 ? (
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {part}
                  </span>
                ) : (
                  <span className="text-white">{part}</span>
                )}
              </motion.h2>
            ))}
            
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Descubra os benefícios únicos que só nossa comunidade oferece
            </motion.p>
          </motion.div>

          {/* Interactive Cards Grid */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20"
            style={{ perspective: "1000px" }}
          >
            {(localBenefits.items || defaultBenefits.items).map((benefit: any, index: number) => (
              <InteractiveCard key={index} benefit={benefit} index={index} />
            ))}
          </div>

          {/* Enhanced CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToPlans();
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl gap-2"
              >
                Garanta Sua Vaga Agora!
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Link>
            </motion.div>
            
            {/* Hint text */}
            <motion.p 
              className="text-slate-500 text-sm mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              ✨ Dica: Passe o mouse sobre os cards para ver o efeito 3D!
            </motion.p>
          </motion.div>
        </div>
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
