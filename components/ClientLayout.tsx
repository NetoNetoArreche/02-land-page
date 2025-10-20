'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'
import Navbar from './Navbar'
import MetaPixelStatus from './MetaPixelStatus'

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simula o carregamento da página
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Delay maior para garantir que o loading desapareça completamente
      setTimeout(() => {
        setShowContent(true)
      }, 800)
    }, 2500) // 2.5 segundos de loading

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <LoadingScreen isLoading={isLoading} />
      
      {showContent && (
        <div 
          className="animate-in fade-in duration-500"
          style={{ backgroundColor: '#000000' }}
        >
          <Navbar />
          
          <div className="fixed bottom-4 right-4 z-50">
            <MetaPixelStatus />
          </div>
          
          {children}
          
          <footer className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700 py-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center space-y-6">
                
                {/* Logo/Brand */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Comunidade Vibe Coding
                  </h3>
                  <p className="text-slate-400 mt-2 text-sm">
                    Transformando carreiras através da tecnologia
                  </p>
                </div>

                {/* Divider */}
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />

                {/* Copyright and Legal Info */}
                <div className="space-y-3">
                  <p className="text-slate-300 text-sm font-medium">
                    © 2025 Comunidade Vibe Coding. Todos os direitos reservados.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>CNPJ: 42.242.938/0001-68</span>
                    </div>
                    
                    <div className="hidden sm:block w-px h-4 bg-slate-600" />
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Empresa Registrada</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-slate-700/50">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Pagamentos Seguros</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>Suporte Dedicado</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Acesso Imediato</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}
