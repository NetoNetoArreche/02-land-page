'use client'

import { useState, useEffect, useRef } from 'react'
import { IoMdClose } from 'react-icons/io'
import { FaRobot, FaUser, FaWhatsapp } from 'react-icons/fa'
import { IoSendSharp } from 'react-icons/io5'
import { BsChatDotsFill } from 'react-icons/bs'

interface Message {
  type: 'user' | 'bot'
  content: string
  options?: string[]
}

const commonQuestions = {
  'preço': {
    response: 'O investimento é de R$497,00 à vista com o cupom NOCODE10 você tem 10% de desconto! Quer saber mais? Vou te encaminhar para nosso WhatsApp.',
    options: ['Ver preços', 'Falar com atendente']
  },
  'começar': {
    response: 'Para começar agora mesmo, basta clicar no botão "Quero Fazer Parte da Comunidade" no topo da página. Quer saber mais? Vou te encaminhar para nosso WhatsApp.',
    options: ['Como funciona', 'Fazer inscrição']
  },
  'conteúdo': {
    response: 'Você terá acesso a vídeo aulas, projetos práticos, templates profissionais e suporte na comunidade. Quer saber mais? Vou te encaminhar para nosso WhatsApp.',
    options: ['Ver conteúdos', 'Falar com atendente']
  },
  'dúvida': {
    response: 'Estou aqui para ajudar! Você pode me perguntar sobre preços, como começar, conteúdos ou falar diretamente com um atendente. O que você precisa?',
    options: ['Ver preços', 'Como começar', 'Ver conteúdos', 'Falar com atendente']
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotResponse('Olá! Como posso ajudar você hoje?', [
        'Preços',
        'Como começar',
        'Ver conteúdos',
        'Outra dúvida'
      ])
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleBotResponse = (content: string, options?: string[]) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content, options }])
      setIsTyping(false)
    }, 500)
  }

  const processUserInput = (input: string) => {
    const normalizedInput = input.toLowerCase()
    let responded = false

    // Verifica palavras-chave nas respostas comuns
    Object.entries(commonQuestions).forEach(([keyword, data]) => {
      if (normalizedInput.includes(keyword) && !responded) {
        responded = true
        handleBotResponse(data.response, data.options)
      }
    })

    // Se não encontrou resposta específica
    if (!responded) {
      handleBotResponse(
        'Desculpe, não consegui entender completamente. Que tal falar diretamente com um de nossos atendentes?',
        ['Falar com atendente', 'Fazer outra pergunta']
      )
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue
    setMessages(prev => [...prev, { type: 'user', content: userMessage }])
    setInputValue('')
    processUserInput(userMessage)
  }

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, { type: 'user', content: option }])

    switch (option.toLowerCase()) {
      case 'ver preços':
        handleBotResponse('Você pode ver todos os detalhes dos nossos preços na seção de planos. Quer que eu te mostre?', [
          'Sim, mostrar preços',
          'Falar com atendente'
        ])
        break
      case 'sim, mostrar preços':
        // Scroll para a seção de preços
        document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' })
        handleBotResponse('Prontinho! Você está vendo a seção de preços. Posso ajudar com mais alguma coisa?', [
          'Fazer inscrição',
          'Tirar dúvida',
          'Falar com atendente'
        ])
        break
      case 'como funciona':
      case 'ver conteúdos':
        handleBotResponse('Na Comunidade Vibe Coding você terá acesso a:\n\n• Tutoriais passo a passo\n• Templates exclusivos\n• Suporte da comunidade\n• Atualizações semanais\n\nQuer saber mais?', [
          'Fazer inscrição',
          'Ver preços',
          'Falar com atendente'
        ])
        break
      case 'fazer inscrição':
        handleBotResponse('Ótimo! Você pode fazer sua inscrição diretamente pelo botão "Começar agora" na seção de planos. Quer que eu te mostre?', [
          'Sim, mostrar preços',
          'Falar com atendente'
        ])
        break
      case 'falar com atendente':
        window.open('https://wa.me/5511988207977?text=Olá! Vim pelo site e gostaria de mais informações sobre a Comunidade Vibe Coding.', '_blank')
        handleBotResponse('Te redirecionei para nosso WhatsApp! Um atendente já vai te responder. 😊')
        break
      default:
        processUserInput(option)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botão do chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
      >
        {isOpen ? <IoMdClose size={24} className="text-white" /> : <BsChatDotsFill size={24} className="text-white" />}
      </button>

      {/* Janela do chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[32rem] bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-800">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <h3 className="font-bold">Atendimento Design NoCode</h3>
            <p className="text-sm opacity-90">Como posso ajudar?</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-100'
                } rounded-lg p-3`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left px-3 py-2 rounded bg-gray-900 text-blue-400 hover:bg-gray-800 hover:text-blue-300 transition-colors text-sm border border-gray-700"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-800 bg-gray-900">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="Enviar mensagem"
              >
                <IoSendSharp size={20} />
              </button>
              <button
                onClick={() => handleOptionClick('Falar com atendente')}
                className="p-2 text-green-400 hover:text-green-300 transition-colors"
                aria-label="Falar no WhatsApp"
              >
                <FaWhatsapp size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
