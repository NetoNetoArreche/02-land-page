'use client'

import { useState } from 'react'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import { motion } from 'framer-motion'

const defaultTestimonials = {
  title: "O Que Nossos Alunos Estão Dizendo",
  subtitle: "Conversas reais da nossa comunidade no WhatsApp",
  items: [
    {
      name: "Rafael",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      studentNumber: "125",
      conversation: [
        {
          sender: "Rafael",
          message: "Oi, só queria agradecer de coração, viu? Consegui criar o meu app e ajudar a minha empresa e isso me rendeu um aumento e mudança de setor. Gratidão. 💪🔥"
        },
        {
          sender: "Hélio",
          message: "Cara eu fico muito feliz com o que vc está me falando, valeu mesmo. A comunidade cresce por causa de pessoas assim determinadas a fazer a diferença. 🥹🔥💪"
        }
      ],
      rating: 5
    },
    {
      name: "Caio",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      studentNumber: "233",
      conversation: [
        {
          sender: "Caio",
          message: "Cada aula que eu vou assistindo do Readdy e do prompt é algo parecido quando eu assistia e ficava esperando as minhas séries favoritas. tu é brabo mano 😭🔥"
        },
        {
          sender: "Hélio",
          message: "Poxa mano, obrigado. Rsrs. Tmj 💪🔥🥹🙌"
        }
      ],
      rating: 5
    },
    {
      name: "Concimar",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      studentNumber: "",
      conversation: [
        {
          sender: "Concimar",
          message: "Entrei na comunidade recentemente e já me sinto super acolhida. A ajuda que recebi foi incrível. Quero agradecer especialmente ao Antônio M. 🌟"
        },
        {
          sender: "Hélio",
          message: "Opa aí sim em, que bom, ficamos muito felizes com isso, oq vc precisar é só chamar 🙌"
        }
      ],
      rating: 5
    },
    {
      name: "Pedro",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      studentNumber: "347",
      conversation: [
        {
          sender: "Pedro",
          message: "Há 10 dias, vi uma aula do @helioArreche no YouTube. Fiz a entrega da versão de teste hoje. 10 dias... Muito bom fazer parte desse grupo!"
        },
        {
          sender: "Hélio",
          message: "caramba rsrs isso que é aprender com agilidade kkk, que bom que conseguiu meu amigo, parabéns mesmo. Bora pra cima 🚀🚀🚀"
        }
      ],
      rating: 5
    },
    {
      name: "Agnaldo",
      photo: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
      studentNumber: "222",
      conversation: [
        {
          sender: "Agnaldo",
          message: "Encontrei aqui na comunidade o que não tem em nenhum lugar. Está cheio de guru vendendo curso e não ajuda em nada. Obrigado pessoal"
        },
        {
          sender: "Hélio",
          message: "Obrigado meu amigo, queremos sempre ajudar e realmente isso é difícil achar em vários cursos aí na internet. tmj"
        }
      ],
      rating: 5
    },
    {
      name: "Andersom",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      studentNumber: "310",
      conversation: [
        {
          sender: "Andersom",
          message: "Depois que entrei na Comunidade, consegui aplicar tudo que aprendi e as coisas mudaram muito. Já estou faturando alto meu amigo. TMJ 💪🔥"
        },
        {
          sender: "Hélio",
          message: "fala meu parceiro, a vc é outro nível kkk, nos que temos que aprender com vc. Brabo no Marketing. tmj 💪"
        }
      ],
      rating: 5
    },
    {
      name: "Mariana",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      studentNumber: "189",
      conversation: [
        {
          sender: "Mariana",
          message: "Gente, consegui criar meu primeiro app em 5 dias! Não acredito que era tão simples assim. Obrigada Hélio! 🥳"
        },
        {
          sender: "Hélio",
          message: "Opa, que massa! Isso aí, quando a gente entende o processo fica muito mais fácil mesmo. Parabéns! 🚀"
        }
      ],
      rating: 5
    },
    {
      name: "Lucas",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      studentNumber: "456",
      conversation: [
        {
          sender: "Lucas",
          message: "Cara, a comunidade é sensacional! Todo mundo se ajuda, os professores são top. Melhor investimento que já fiz! 💯"
        },
        {
          sender: "Hélio",
          message: "Valeu Lucas! Essa é a ideia mesmo, criar uma comunidade forte onde todo mundo cresce junto. Tmj! 🙌"
        }
      ],
      rating: 5
    }
  ]
}

// Função para gerar iniciais do nome
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2) // Máximo 2 iniciais
}

// Componente de Card de Conversa
function TestimonialCard({ testimonial, index }: { testimonial: any, index: number }) {
  return (
    <motion.div
      className="flex-shrink-0 w-80 sm:w-96 mx-2 sm:mx-3 bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/30 hover:border-blue-500/40 transition-all duration-300"
      whileHover={{ y: -3, scale: 1.01 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Header com nome e número do aluno */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="flex items-center gap-2">
          <h4 className="text-white font-semibold text-sm">
            {testimonial.name}
          </h4>
          {testimonial.studentNumber && (
            <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
              aluno {testimonial.studentNumber}
            </span>
          )}
        </div>
      </div>

      {/* Layout com Avatar e Conversa lado a lado */}
      <div className="flex gap-3">
        {/* Avatar com Iniciais */}
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/60 to-blue-500/60 rounded-full blur-sm" />
            <div className="absolute inset-[1px] bg-slate-800 rounded-full" />
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {getInitials(testimonial.name)}
              </span>
            </div>
          </div>
        </div>

        {/* Conversa */}
        <div className="flex-1 space-y-3">
          {testimonial.conversation?.map((msg: any, msgIndex: number) => (
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, x: msg.sender === 'Hélio' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + msgIndex * 0.1 }}
              className={`flex ${msg.sender === 'Hélio' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${
                msg.sender === 'Hélio' 
                  ? 'bg-blue-600/80 text-white' 
                  : 'bg-slate-700/60 text-slate-200'
              } rounded-2xl px-3 py-2 text-xs sm:text-sm leading-relaxed`}>
                <div className="font-medium text-xs mb-1 opacity-80">
                  {msg.sender}
                </div>
                <div>{msg.message}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const { content } = useRealtimeContent()
  const testimonials = content?.testimonials || defaultTestimonials

  // Estados para controlar pause/play dos slides
  const [isFirstRowPaused, setIsFirstRowPaused] = useState(false)
  const [isSecondRowPaused, setIsSecondRowPaused] = useState(false)

  // Dividir depoimentos em duas fileiras
  const firstRow = testimonials.items.slice(0, 4)
  const secondRow = testimonials.items.slice(4, 8)

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">

      {/* Header - Com container */}
      <div className="container mx-auto px-4 relative z-10 mb-12 sm:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-white">
            {testimonials.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            {testimonials.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Slides Full Width - Sem container */}
      <div className="relative z-10">
        {/* Primeira Fileira - Movimento para Direita */}
        <div 
          className="relative mb-8 overflow-hidden cursor-pointer py-4"
          onMouseEnter={() => setIsFirstRowPaused(true)}
          onMouseLeave={() => setIsFirstRowPaused(false)}
        >
          <motion.div
            className="flex"
            animate={isFirstRowPaused ? {} : {
              x: [0, -1600]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Duplicar cards para efeito infinito */}
            {[...firstRow, ...firstRow, ...firstRow].map((testimonial, index) => (
              <TestimonialCard 
                key={`first-${index}`}
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </motion.div>
        </div>

        {/* Segunda Fileira - Movimento para Esquerda */}
        <div 
          className="relative overflow-hidden cursor-pointer py-4"
          onMouseEnter={() => setIsSecondRowPaused(true)}
          onMouseLeave={() => setIsSecondRowPaused(false)}
        >
          <motion.div
            className="flex"
            animate={isSecondRowPaused ? {} : {
              x: [-1600, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Duplicar cards para efeito infinito */}
            {[...secondRow, ...secondRow, ...secondRow].map((testimonial, index) => (
              <TestimonialCard 
                key={`second-${index}`}
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlays para fade nas bordas - Responsivos */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 lg:w-40 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 lg:w-40 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-20" />
    </section>
  )
}
