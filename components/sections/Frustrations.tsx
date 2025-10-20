'use client'

import { motion } from 'framer-motion'

const frustrations = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Ideias Incríveis na Gaveta?",
    description: "Você tem uma ideia brilhante para um app ou site, mas não sabe por onde começar ou acha que é caro demais para desenvolver?",
    color: "from-slate-800/60 to-slate-700/60",
    borderColor: "border-slate-700/50",
    textColor: "text-blue-400"
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Dinheiro Jogado Fora?",
    description: "Cansado de gastar rios de dinheiro com desenvolvedores que não entregam o que você precisa, ou que demoram meses para um projeto simples?",
    color: "from-slate-800/60 to-slate-700/60",
    borderColor: "border-slate-700/50",
    textColor: "text-purple-400"
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Medo de Código?",
    description: "Acha que programar é um bicho de sete cabeças e que você nunca vai conseguir criar algo complexo sem anos de estudo?",
    color: "from-slate-800/60 to-slate-700/60",
    borderColor: "border-slate-700/50",
    textColor: "text-blue-400"
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Dependência Insuportável?",
    description: "Frustrado por depender de terceiros para cada pequena atualização ou mudança no seu projeto?",
    color: "from-slate-800/60 to-slate-700/60",
    borderColor: "border-slate-700/50",
    textColor: "text-purple-400"
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Tempo é Dinheiro!",
    description: "Sente que está perdendo tempo e oportunidades valiosas por não conseguir lançar seus projetos rapidamente?",
    color: "from-slate-800/60 to-slate-700/60",
    borderColor: "border-slate-700/50",
    textColor: "text-blue-400"
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Sem Controle Total?",
    description: "Cansado de não ter controle completo sobre seus projetos e sempre depender de outras pessoas para fazer mudanças?",
    color: "from-slate-800/60 to-slate-700/60",
    borderColor: "border-slate-700/50",
    textColor: "text-purple-400"
  }
]

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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

export default function Frustrations() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Você Se Identifica Com Alguma{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Destas Frustrações?
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
            Se você já passou por alguma dessas situações, você não está sozinho...
          </p>
        </motion.div>

        {/* Frustrations Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20"
        >
          {frustrations.map((frustration, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-gradient-to-br ${frustration.color} backdrop-blur-sm rounded-2xl p-6 sm:p-8 border ${frustration.borderColor} hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                className={`mb-4 sm:mb-6 ${frustration.textColor}`}
              >
                {frustration.icon}
              </motion.div>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${frustration.textColor}`}>
                {frustration.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {frustration.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-600/50 shadow-2xl max-w-4xl mx-auto"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-white mb-4 sm:mb-6"
            >
              Se você respondeu{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                SIM
              </span>{' '}
              a qualquer uma dessas perguntas...
            </motion.p>
            <motion.h3 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                A Comunidade Vibe Coding é a SUA SOLUÇÃO!
              </span>
            </motion.h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
