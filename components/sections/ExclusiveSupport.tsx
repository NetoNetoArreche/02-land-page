'use client'

import React from 'react'

export default function ExclusiveSupport() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-900/30 to-blue-900/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] animate-pulse delay-1000"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-purple-500/30 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 border-2 border-blue-500/30 rounded-full"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main content box with highlight effect */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-white/10 shadow-xl shadow-purple-500/20 backdrop-blur-sm relative overflow-hidden">
            {/* Highlight glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-[50px]"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-[50px]"></div>
            
            {/* Content */}
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 animate-gradient">
                Suporte Incomparável
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Left side - Main message */}
              <div className="bg-black/40 rounded-xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  Nenhuma outra comunidade tem o <span className="text-purple-300">suporte</span> que a <span className="text-blue-300">Comunidade Vibe Coding</span> oferece!
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  Aqui você não está sozinho! Nossa equipe de especialistas está sempre disponível para te ajudar a superar qualquer desafio e transformar suas ideias em realidade.
                </p>
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-white/10">
                  <p className="text-white font-medium">
                    <span className="text-yellow-300 font-bold">Exclusivo:</span> Lives toda segunda e quinta-feira às 20:30 com conteúdo prático e respostas em tempo real!
                  </p>
                </div>
              </div>
              
              {/* Right side - Teacher cards */}
              <div className="space-y-4">
                <div className="text-xl font-bold text-center mb-4 text-white">
                  <span className="text-blue-300">4 Professores Especialistas</span> prontos para te ajudar:
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Teacher cards */}
                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-700/20 p-4 rounded-lg border border-white/10 transform transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                      👨‍💻
                    </div>
                    <p className="text-center text-white font-medium">Frontend</p>
                    <p className="text-center text-purple-300 text-sm">Especialista</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-700/20 p-4 rounded-lg border border-white/10 transform transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                      👩‍💻
                    </div>
                    <p className="text-center text-white font-medium">Backend</p>
                    <p className="text-center text-blue-300 text-sm">Especialista</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-700/20 p-4 rounded-lg border border-white/10 transform transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                      🧠
                    </div>
                    <p className="text-center text-white font-medium">IA & No-Code</p>
                    <p className="text-center text-cyan-300 text-sm">Especialista</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-900/40 to-teal-700/20 p-4 rounded-lg border border-white/10 transform transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                      🎨
                    </div>
                    <p className="text-center text-white font-medium">Design UX/UI</p>
                    <p className="text-center text-teal-300 text-sm">Especialista</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom highlight */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-6 py-3 rounded-full border border-white/10">
                <p className="text-lg text-white">
                  <span className="font-bold text-purple-300">Dúvidas resolvidas</span> e <span className="font-bold text-blue-300">projetos concluídos</span> em tempo recorde!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add some custom styles for animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  )
}
