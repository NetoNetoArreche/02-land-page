'use client'

import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import Curriculum from '@/components/sections/Curriculum'
import Projects from '@/components/sections/Projects'
import Testimonials from '@/components/sections/Testimonials'
import Plans from '@/components/sections/Plans'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'
import Community from '@/components/sections/Community'
import Frustrations from '@/components/sections/Frustrations'
import ExclusiveSupport from '@/components/sections/ExclusiveSupport'

export default function Home() {
  const { content, loading } = useRealtimeContent()

  console.log('Page content:', content) // Log para debug

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-900 text-xl font-medium">Carregando...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
      {/* Fundo único com efeitos */}
      <div className="fixed inset-0 -z-10">
        {/* Grid Pattern Global */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Gradient Orbs Globais */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <Hero />
      <Testimonials />
      <Frustrations />
      <Community />
      <ExclusiveSupport />
      <Benefits />
      <Curriculum />
      <Projects />
      <Plans />
      <FAQ />
      <FinalCTA />
    </main>
  )
}