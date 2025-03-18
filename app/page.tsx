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

export default function Home() {
  const { content, loading } = useRealtimeContent()

  console.log('Page content:', content) // Log para debug

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Community />
      <Benefits />
      <Curriculum />
      <Projects />
      <Testimonials />
      <Plans />
      <FAQ />
      <FinalCTA />
    </main>
  )
}