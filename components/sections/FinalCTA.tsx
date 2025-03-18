'use client'

import Link from 'next/link'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import EditableSection from '../EditableSection'
import { useEffect, useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles-engine'
import type { Engine } from 'tsparticles-engine'
import confetti from 'canvas-confetti'
import { useTrackingEvents } from '@/hooks/useTrackingEvents'

const defaultFinalCTA = {
  title: "Junte-se Agora à Comunidade IAcode",
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

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
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
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <EditableSection
            path="finalCta.title"
            content={finalCta.title}
            onSave={handleSave}
            as="h2"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight sm:leading-tight lg:leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text"
          />
          <p className="text-gray-400 text-lg">
            Aproveite agora esta oportunidade única de criar sua startup ou transformar sua carreira 
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            {/* Benefits List */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                O que você vai receber
              </h3>
              <div className="space-y-4">
                {finalCta.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 group-hover:bg-blue-500/30 transition-colors">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300 text-lg group-hover:text-white transition-colors">
                      {isAdmin ? (
                        <EditableSection
                          path={`finalCta.${index}`}
                          content={benefit}
                          onSave={handleSave}
                          className="text-gray-300"
                        />
                      ) : (
                        benefit
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center lg:text-left">
              <button
                onClick={handleCTAClick}
                className="group relative px-8 py-4 rounded-xl text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
              >
                <span className="relative text-white">
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
              </button>
            </div>
          </div>

          {/* Right Column - Guarantee Seal */}
          <div className="relative">
            {/* Guarantee Seal */}
            <div className="relative w-96 h-96 mx-auto">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-blue-500/20 animate-ping-slow" />
              </div>
              
              {/* Rotating Border */}
              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                <div className="w-72 h-72 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-blue-400 border-l-purple-400 blur-[2px]" />
              </div>

              {/* Main Seal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-sm border-2 border-blue-500/50 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-500 group super-neon">
                  {/* Inner Glow */}
                  <div className="absolute inset-4 rounded-full bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />
                  
                  {/* Content */}
                  <div className="relative text-center p-6 z-10">
                    {/* Check Icon with Strong Glow */}
                    <div className="relative mb-4">
                      <div className="absolute inset-0 text-blue-500 blur-md">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <svg className="w-16 h-16 mx-auto relative text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                    {/* Text with Strong Glow */}
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-white relative">
                        <span className="absolute inset-0 text-blue-500 blur-lg">GARANTIA</span>
                        <span className="relative">GARANTIA</span>
                      </div>
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 relative">
                        <span className="absolute inset-0 text-blue-500 blur-lg">7 DIAS</span>
                        <span className="relative">7 DIAS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rotating Stars */}
              <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-150px)`,
                      boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.7)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Guarantee Text */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold relative inline-block mb-2">
                <span className="absolute inset-0 text-blue-500 blur-lg">
                  Garantia incondicional de 7 dias
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Garantia incondicional de 7 dias
                </span>
              </h3>
              <p className="text-gray-400 text-lg">
                Se você não ficar satisfeito, devolvemos 100% do seu dinheiro
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>
    </section>
  )
}
