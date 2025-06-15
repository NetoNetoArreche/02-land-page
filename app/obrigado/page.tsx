'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { metaConversions } from '@/lib/meta-conversions'

export default function ThankYou() {
  const searchParams = useSearchParams()
 
  useEffect(() => {
    // Dispara confetti quando a página carrega
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      )
    }, 250)

    // Envia evento Purchase após a página carregar
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', {
          currency: 'BRL',
          value: 497.00
        })
        console.log('Evento Purchase enviado')
      }
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Ícone de Sucesso */}
        <div className="mb-8">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Mensagem de Agradecimento */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
          Obrigado pela sua compra!
        </h1>

        {/* Boas-vindas */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-blue-400">
          Bem vindo à maior comunidade de desenvolvimento com IA do mundo!
        </h2>

        {/* Mensagem Principal */}
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          Quanto mais a comunidade crescer, mais benefícios para você. Queremos reunir desenvolvedores 
          e programadores para oferecer suporte de qualidade, mas, para isso, precisamos da sua ajuda para crescer.
        </p>

        {/* Próximos Passos */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">Próximos Passos:</h3>
          <ul className="text-gray-300 space-y-3">
            <li>✨ Você receberá um email com as instruções de acesso</li>
            <li>🎯 Entre em nosso Circle para começar a interagir</li>
            <li>📚 Acesse o conteúdo exclusivo da comunidade</li>
            <li>🚀 Comece sua jornada de aprendizado agora mesmo</li>
          </ul>
        </div>

        {/* Botão de Retorno */}
        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Voltar para a Página Inicial
        </Link>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    </main>
  )
}
