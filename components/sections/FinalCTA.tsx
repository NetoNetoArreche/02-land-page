'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import EditableSection from '../EditableSection'
import { useEffect, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { useTrackingEvents } from '@/hooks/useTrackingEvents'

const defaultFinalCTA = {
  title: "Junte-se Agora à Comunidade Vibe Coding",
  benefits: [
    "Acesso imediato aos cursos",
    "Comunidade ativa e suporte ",
    "Garantia de 7 dias"
  ],
  ctaText: "Sim! Quero Fazer Parte Agora!"
}

export default function FinalCTA() {
  const { content } = useRealtimeContent()
  const { isAdmin } = useAuth()
  const { trackSectionView } = useTrackingEvents()

  useEffect(() => {
    trackSectionView('FinalCTA')
  }, [])


  const handleSave = async (path: string, value: string) => {
    if (!content) return

    try {
      const supabase = createClient()
      const [section, index, field] = path.split('.')
      
      let newContent: any = { ...content }
      
      if (index) {
        newContent[section].benefits = [...content[section].benefits]
        newContent[section].benefits[parseInt(index)] = value
      } else {
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

  const handleCTAClick = () => {
    // Atualiza o estado do ExitPopup para não mostrar quando o botão for clicado
    window.dispatchEvent(new CustomEvent('startButtonClicked'));
    
    // Efeito de confete
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'],
      ticks: 200,
      startVelocity: 30,
      shapes: ['star', 'circle'],
      scalar: 1.2,
      zIndex: 1000,
      disableForReducedMotion: true
    });
    
    // Navegação
    if (content?.hero?.ctaLink) {
      window.location.href = content.hero.ctaLink;
    }
  };

  // Use o conteúdo do banco ou o conteúdo padrão
  const finalCta = content?.finalCta || defaultFinalCTA

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full px-6 py-2 mb-6"
          >
            <span className="text-green-400 font-semibold text-sm">🚀 ÚLTIMA CHANCE</span>
          </motion.div>
          
          <EditableSection
            path="finalCta.title"
            content={finalCta.title}
            onSave={handleSave}
            as="h2"
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white"
          />
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Aproveite agora esta oportunidade única de criar sua startup ou transformar sua carreira
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Column - Benefits Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 sm:p-10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl">
                
                {/* Benefits Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    O que você vai receber
                  </h3>
                </div>

                {/* Benefits List */}
                <div className="space-y-6 mb-10">
                  {finalCta.benefits.map((benefit: string, index: number) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-300 text-lg font-medium group-hover:text-white transition-colors">
                        {isAdmin ? (
                          <EditableSection
                            path={`finalCta.${index}`}
                            content={benefit}
                            onSave={handleSave}
                            className="text-slate-300"
                          />
                        ) : (
                          benefit
                        )}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCTAClick}
                  className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-5 px-8 rounded-2xl text-lg sm:text-xl transition-all duration-300 shadow-2xl relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isAdmin ? (
                      <EditableSection
                        path="finalCta.ctaText"
                        content={finalCta.ctaText}
                        onSave={handleSave}
                      />
                    ) : (
                      finalCta.ctaText
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {/* Trust Indicators */}
                <div className="mt-6 flex items-center justify-center gap-6 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="w-px h-4 bg-slate-600" />
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Acesso Imediato</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Guarantee Seal */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse" />
              
              {/* Main Guarantee Circle */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto">
                
                {/* Rotating Border */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #10b981, #3b82f6)',
                    padding: '3px'
                  }}
                >
                  <div className="w-full h-full rounded-full bg-slate-900" />
                </motion.div>

                {/* Inner Content */}
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex flex-col items-center justify-center">
                  
                  {/* Check Icon */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Text */}
                  <div className="text-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="text-2xl sm:text-3xl font-bold text-white mb-2"
                    >
                      GARANTIA
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                    >
                      7 DIAS
                    </motion.div>
                  </div>
                </div>

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0'
                    }}
                    animate={{
                      rotate: [0, 360],
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 200],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 200],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>

              {/* Guarantee Text */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-center mt-8"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Garantia Incondicional de 7 Dias
                </h3>
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                  Se você não ficar satisfeito, devolvemos 
                  <span className="text-green-400 font-semibold"> 100% do seu dinheiro</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
