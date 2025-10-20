'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Community() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transformações 3D corretas baseadas na documentação oficial
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.05])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.8])

  return (
    <section ref={containerRef} className="py-16 sm:py-20 lg:py-24 relative">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 text-white">
              A maior comunidade de{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                desenvolvimento com IA
              </span>{' '}
              do mundo!
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12">
              Quanto mais a comunidade crescer, mais benefícios para você. Queremos reunir desenvolvedores e programadores para oferecer suporte de qualidade, mas, para isso, precisamos da sua ajuda para crescer.
            </p>

            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 mb-8 sm:mb-12"
            >
              Comunidade criada com ferramentas de IA
            </motion.h3>
          </motion.div>

          {/* Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center items-center gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20 flex-wrap"
          >
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <img src="/bolt-logo.svg" alt="Bolt.new" className="h-12 sm:h-16 w-auto drop-shadow-lg" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <img src="/supabase.png" alt="Supabase" className="h-12 sm:h-16 w-auto drop-shadow-lg rounded-lg" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <img src="/lovable.png" alt="Lovable" className="h-12 sm:h-16 w-auto drop-shadow-lg rounded-lg" />
            </motion.div>
          </motion.div>

          {/* Community Image with 3D Scroll Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <div className="relative mx-auto max-w-5xl">
              <motion.div
                className="relative"
                style={{
                  rotateX,
                  scale,
                  opacity,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="relative">
                  <img 
                    src="/vibe-coding-community.png?v=2025" 
                    alt="Comunidade Vibe Coding - Plataforma"
                    className="w-full rounded-2xl border-2 border-slate-700/50 shadow-2xl relative z-10"
                    style={{
                      filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))"
                    }}
                  />
                  
                  {/* Top Border Light Effect - Contorno da imagem */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-2 rounded-t-2xl"
                    style={{
                      background: "linear-gradient(to right, transparent 0%, transparent 20%, rgba(34, 211, 238, 0.8) 50%, transparent 80%, transparent 100%)",
                      boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)"
                    }}
                  />
                  
                  {/* Glow effect atrás da borda */}
                  <div 
                    className="absolute -top-1 left-0 right-0 h-4 rounded-t-2xl -z-10"
                    style={{
                      background: "linear-gradient(to right, transparent 0%, transparent 25%, rgba(34, 211, 238, 0.4) 50%, transparent 75%, transparent 100%)",
                      filter: "blur(8px)"
                    }}
                  />
                </div>
                
                {/* 3D Shadow */}
                <div 
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gradient-to-r from-transparent via-black/30 to-transparent blur-xl"
                  style={{
                    transform: "rotateX(90deg) translateZ(-20px)"
                  }}
                />
                
                {/* Bottom Glow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-lg" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
