'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function ExclusiveSupport() {
  const specialists = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Frontend",
      subtitle: "Especialista",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      title: "Backend",
      subtitle: "Especialista",
      color: "from-slate-800/60 to-slate-700/60",
      borderColor: "border-slate-700/50",
      textColor: "text-purple-400"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "IA & No-Code",
      subtitle: "Especialista",
      color: "from-slate-800/60 to-slate-700/60",
      borderColor: "border-slate-700/50",
      textColor: "text-blue-400"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
        </svg>
      ),
      title: "Design UX/UI",
      subtitle: "Especialista",
      color: "from-slate-800/60 to-slate-700/60",
      borderColor: "border-slate-700/50",
      textColor: "text-purple-400"
    }
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Suporte Incomparável
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Nenhuma outra comunidade tem o suporte que a Comunidade Vibe Coding oferece!
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Left side - Main message */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">
                Aqui você não está <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">sozinho!</span>
              </h3>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Nossa equipe de especialistas está sempre disponível para te ajudar a superar qualquer desafio e transformar suas ideias em realidade.
              </p>
              
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-cyan-500/20">
                <p className="text-white text-sm sm:text-base font-medium">
                  <span className="text-cyan-400 font-bold">Exclusivo:</span> Lives toda segunda e quinta-feira às 20:30 com conteúdo prático e respostas em tempo real!
                </p>
              </div>
            </motion.div>
              
            {/* Right side - Specialists */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">4 Especialistas</span> prontos para te ajudar:
                </h4>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                {specialists.map((specialist, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`bg-gradient-to-br ${specialist.color} backdrop-blur-sm rounded-xl p-4 sm:p-6 border ${specialist.borderColor} hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <div className={`mb-4 ${specialist.textColor}`}>
                      {specialist.icon}
                    </div>
                    <h5 className={`text-sm sm:text-base font-bold mb-1 ${specialist.textColor}`}>
                      {specialist.title}
                    </h5>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      {specialist.subtitle}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50 max-w-4xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">Dúvidas resolvidas</span> e <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">projetos concluídos</span> em tempo recorde!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
