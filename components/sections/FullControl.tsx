'use client'

import React from 'react'

export default function FullControl() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-blue-900/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[80px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8 w-full z-10">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl shadow-xl shadow-blue-500/20 transform transition-all duration-300 hover:scale-105 border border-white/10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  <span className="text-yellow-300">Liberdade Total!</span> Domine o Frontend e o Backend
                </h3>
                <p className="text-gray-200 text-lg">
                  Domine o Frontend (o que o usuário vê) e o Backend (o "cérebro" do seu app) para ter <span className="font-bold text-white">CONTROLE ABSOLUTO</span> sobre suas criações.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl shadow-xl shadow-purple-500/20 transform transition-all duration-300 hover:scale-105 border border-white/10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  <span className="text-yellow-300">Dados no seu Bolso!</span> Gerencie como um PRO
                </h3>
                <p className="text-gray-200 text-lg">
                  Gerencie bancos de dados como um <span className="font-bold text-white">PRO</span>, garantindo a segurança e eficiência dos seus aplicativos.
                </p>
              </div>
            </div>
            
            {/* Right side - Visual elements */}
            <div className="relative hidden md:block h-[400px]">
              {/* Code snippets floating - Visíveis apenas em telas médias ou maiores */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-5 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-blue-500/50 shadow-lg shadow-blue-500/20 transform -rotate-3 animate-float">
                  <pre className="text-xs md:text-sm text-blue-400">
                    <code>{`// Frontend com Next.js
export default function App() {
  return (
    <div className="container">
      <h1>Seu App Incrível</h1>
      <Dashboard data={userData} />
    </div>
  )
}`}</code>
                  </pre>
                </div>
                
                <div className="absolute bottom-10 right-5 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-purple-500/50 shadow-lg shadow-purple-500/20 transform rotate-3 animate-float-delayed">
                  <pre className="text-xs md:text-sm text-purple-400">
                    <code>{`// Backend com Supabase
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId)
  
// Seus dados seguros e eficientes!`}</code>
                  </pre>
                </div>
                
                {/* Central connecting element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/30 animate-pulse">
                  <span className="text-3xl">🚀</span>
                </div>
                
                {/* Connection lines */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 opacity-50">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20,20 Q50,50 20,80" stroke="url(#gradient1)" strokeWidth="2" fill="none" />
                    <path d="M80,20 Q50,50 80,80" stroke="url(#gradient2)" strokeWidth="2" fill="none" />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Versão mobile dos elementos visuais */}
            <div className="flex md:hidden justify-center my-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/30 animate-pulse">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>
          
          {/* Bottom call to action */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <p className="text-xl text-white">
                <span className="font-bold text-blue-300">Pare de depender de terceiros</span> e comece a criar seus próprios projetos com <span className="font-bold text-purple-300">total autonomia!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add some custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
          100% { transform: translateY(0px) rotate(-3deg); }
        }
        
        @keyframes float-delayed {
          0% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(3deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
