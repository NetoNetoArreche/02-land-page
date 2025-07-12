'use client'

import React from 'react'

export default function Frustrations() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-purple-900/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-pulse">
            Você Se Identifica Com Alguma Destas Frustrações?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
            <div className="text-4xl mb-4">😩</div>
            <h3 className="text-xl font-bold mb-3 text-blue-300">Ideias Incríveis na Gaveta?</h3>
            <p className="text-gray-300">Você tem uma ideia brilhante para um app ou site, mas não sabe por onde começar ou acha que é caro demais para desenvolver?</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-xl font-bold mb-3 text-purple-300">Dinheiro Jogado Fora?</h3>
            <p className="text-gray-300">Cansado de gastar rios de dinheiro com desenvolvedores que não entregam o que você precisa, ou que demoram meses para um projeto simples?</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-900/40 to-red-900/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20">
            <div className="text-4xl mb-4">🤯</div>
            <h3 className="text-xl font-bold mb-3 text-pink-300">Medo de Código?</h3>
            <p className="text-gray-300">Acha que programar é um bicho de sete cabeças e que você nunca vai conseguir criar algo complexo sem anos de estudo?</p>
          </div>
          
          <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-red-900/40 to-orange-900/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="text-4xl mb-4">⛓</div>
            <h3 className="text-xl font-bold mb-3 text-red-300">Dependência Insuportável?</h3>
            <p className="text-gray-300">Frustrado por depender de terceiros para cada pequena atualização ou mudança no seu projeto?</p>
          </div>
          
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-orange-900/40 to-yellow-900/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-bold mb-3 text-orange-300">Tempo é Dinheiro!</h3>
            <p className="text-gray-300">Sente que está perdendo tempo e oportunidades valiosas por não conseguir lançar seus projetos rapidamente?</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl shadow-purple-500/20 max-w-3xl mx-auto transform transition-all duration-500 hover:scale-105 border border-white/10">
            <p className="text-xl md:text-2xl font-bold mb-4 text-white">
              Se você respondeu <span className="text-yellow-300">SIM</span> a qualquer uma dessas perguntas...
            </p>
            <h3 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-100 text-transparent bg-clip-text animate-pulse">
              A Comunidade IACode é a SUA ÚNICA SOLUÇÃO!
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
