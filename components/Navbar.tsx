'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 64 // altura do navbar
      const elementPosition = element.offsetTop - navbarHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsOpen(false) // Fecha menu mobile se estiver aberto
  }

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link href="/" className="text-white font-bold text-xl">
              COMUNIDADE
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ y: -2 }}>
              <button 
                onClick={() => scrollToSection('benefits')}
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                Benefícios
              </button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <button 
                onClick={() => scrollToSection('curriculum')}
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                Currículo
              </button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                Projetos
              </button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <button 
                onClick={() => scrollToSection('plans-section')}
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                Preços
              </button>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => scrollToSection('plans-section')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Entrar na Comunidade
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-slate-800/50">
            <button
              onClick={() => scrollToSection('benefits')}
              className="block text-slate-300 hover:text-white transition-colors duration-300 py-2 w-full text-left"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection('curriculum')}
              className="block text-slate-300 hover:text-white transition-colors duration-300 py-2 w-full text-left"
            >
              Currículo
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block text-slate-300 hover:text-white transition-colors duration-300 py-2 w-full text-left"
            >
              Projetos
            </button>
            <button
              onClick={() => scrollToSection('plans-section')}
              className="block text-slate-300 hover:text-white transition-colors duration-300 py-2 w-full text-left"
            >
              Preços
            </button>
            <button
              onClick={() => scrollToSection('plans-section')}
              className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-center mt-4 w-full"
            >
              Entrar na Comunidade
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
