'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import CurriculumCustomizationSidebar from '../CurriculumCustomizationSidebar'

interface CurriculumSection {
  title: string;
  items: string[];
}

interface CurriculumData {
  title: string;
  sections: CurriculumSection[];
}

// Componente Accordion/Dropdown
const AccordionSection = ({ section, index }: { 
  section: CurriculumSection, 
  index: number
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden"
    >
      {/* Header clicável */}
      <motion.div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-700/20 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <span className="text-lg font-bold text-cyan-400">
              {(index + 1).toString().padStart(2, '0')}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {section.title}
          </h3>
        </div>
        
        {/* Ícone de seta */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-cyan-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Conteúdo expansível */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <motion.div 
                className="space-y-3 pl-16"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center gap-4 group hover:bg-slate-700/20 p-3 rounded-lg transition-all duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400/70" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-200 text-base">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const defaultCurriculum: CurriculumData = {
  title: "Domine as Ferramentas|Mais Poderosas!",
  sections: [
    {
      title: "Ferramentas de Desenvolvimento",
      items: [
        "Lovable",
        "Windsurf Editor", 
        "Cursor AI",
        "Bolt.New",
        "Github Copilot"
      ]
    },
    {
      title: "Frontend & Design",
      items: [
        "React/Next.js",
        "Tailwind CSS", 
        "Framer Motion",
        "Figma",
        "Design Responsivo"
      ]
    },
    {
      title: "Backend & Banco de Dados",
      items: [
        "Firebase com IA",
        "Supabase com IA",
        "Vercel",
        "PostgreSQL"
      ]
    },
    {
      title: "Comunidade & Suporte",
      items: [
        "Circle Exclusivo",
        "Eventos ao Vivo", 
        "Networking",
        "Code Reviews"
      ]
    }
  ]
}

export default function Curriculum() {
  const { content } = useRealtimeContent()
  const { isAdmin } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [localCurriculum, setLocalCurriculum] = useState(defaultCurriculum)

  // Atualizar curriculum local quando o conteúdo mudar
  useEffect(() => {
    const initializeCurriculum = async () => {
      try {
        const supabase = createClient()
        
        // Sempre atualizar com os novos defaultCurriculum
        const { data: updateData, error: updateError } = await supabase
          .from('site_content')
          .upsert({
            id: 1,
            curriculum: defaultCurriculum
          })
          .select()
          .single()

        if (updateError) throw updateError
        console.log('Curriculum atualizado:', updateData)
        setLocalCurriculum(defaultCurriculum)
      } catch (error) {
        console.error('Erro ao atualizar curriculum:', error)
        setLocalCurriculum(defaultCurriculum)
      }
    }

    if (content?.curriculum) {
      setLocalCurriculum(content.curriculum)
    } else {
      initializeCurriculum()
    }
  }, [content])

  const handleSave = async (newCurriculum: any) => {
    try {
      console.log('Salvando novo curriculum:', newCurriculum)
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('site_content')
        .upsert({
          id: 1,
          curriculum: newCurriculum
        })
        .select()
        .single()

      if (error) throw error
      
      console.log('Dados salvos:', data)
      if (data?.curriculum) {
        setLocalCurriculum(data.curriculum)
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  return (
    <motion.section 
      id="curriculum"
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-24 relative"
    >
      {/* Botão Admin */}
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
          {/* Header Animado */}
          <motion.div 
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {localCurriculum.title.split('|').map((part: string, index: number) => (
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
              Ferramentas e tecnologias que você vai dominar na nossa comunidade
            </motion.p>
          </motion.div>

          {/* Layout Vertical - Um embaixo do outro */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {localCurriculum.sections.map((section: CurriculumSection, index: number) => (
                <AccordionSection 
                  key={index}
                  section={section}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customization Sidebar */}
      <CurriculumCustomizationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        content={localCurriculum}
        onSave={handleSave}
      />
    </motion.section>
  )
}
