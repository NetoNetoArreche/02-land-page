'use client'

import Link from 'next/link'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import EditableSection from '../EditableSection'

const defaultPricing = {
  title: "Invista no Seu Futuro Hoje",
  plans: [
    {
      name: "Plano Básico",
      price: 97,
      features: [
        "Acesso à Comunidade",
        "Grade Curricular Completa",
        "Projetos Práticos",
        "Suporte via Circle"
      ],
      ctaText: "Começar Agora"
    },
    {
      name: "Plano Premium",
      price: 197,
      features: [
        "Tudo do Plano Básico",
        "Mentorias Individuais",
        "Code Reviews",
        "Eventos Exclusivos",
        "Certificado Digital"
      ],
      ctaText: "Quero o Premium"
    }
  ]
}

export default function Pricing() {
  const { content } = useRealtimeContent()
  const { isAdmin } = useAuth()

  const handleSave = async (path: string, value: string) => {
    if (!content) return

    try {
      const supabase = createClient()
      const [section, index, field] = path.split('.')
      
      let newContent: any = { ...content }
      
      if (index) {
        newContent[section].plans = [...content[section].plans]
        if (field.startsWith('features.')) {
          // Editando uma feature específica
          const [_, featureIndex] = field.split('.')
          newContent[section].plans[parseInt(index)].features = [
            ...content[section].plans[parseInt(index)].features
          ]
          newContent[section].plans[parseInt(index)].features[parseInt(featureIndex)] = value
        } else {
          // Editando outros campos do plano
          newContent[section].plans[parseInt(index)][field] = value
        }
      } else {
        // Editando o título principal
        newContent[section] = {
          ...content[section],
          [field]: value
        }
      }

      const { error } = await supabase
        .from('site_content')
        .update(newContent)
        .eq('id', content.id)

      if (error) throw error
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  // Use o conteúdo do banco ou o conteúdo padrão
  const pricing = content?.pricing || defaultPricing

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <EditableSection
          path="pricing.title"
          content={pricing.title}
          onSave={handleSave}
          as="h2"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 gradient-text"
        />

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 sm:px-6">
          {pricing.plans.map((plan, index) => (
            <div
              key={index}
              className="neon-border bg-black/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl transform hover:scale-105 transition-all duration-300"
            >
              {/* Plan Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {isAdmin ? (
                  <EditableSection
                    path={`pricing.${index}.name`}
                    content={plan.name}
                    onSave={handleSave}
                    className="text-xl sm:text-2xl font-bold text-white"
                  />
                ) : (
                  plan.name
                )}
              </h3>

              {/* Price */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col items-start">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-white">R$</span>
                    <span className="text-5xl sm:text-6xl font-bold gradient-text ml-1">
                      {isAdmin ? (
                        <EditableSection
                          path={`pricing.${index}.price`}
                          content={plan.price.toString()}
                          onSave={handleSave}
                          className="text-5xl sm:text-6xl font-bold gradient-text"
                        />
                      ) : (
                        plan.price
                      )}
                    </span>
                  </div>
                  <span className="text-gray-400 mt-1 text-base sm:text-lg">/mês</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300 text-sm sm:text-base">
                      {isAdmin ? (
                        <EditableSection
                          path={`pricing.${index}.features.${featureIndex}`}
                          content={feature}
                          onSave={handleSave}
                          className="text-gray-300 text-sm sm:text-base"
                        />
                      ) : (
                        feature
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  const form = document.getElementById('pricing');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block w-full text-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white">
                  {isAdmin ? (
                    <EditableSection
                      path={`pricing.${index}.ctaText`}
                      content={plan.ctaText}
                      onSave={handleSave}
                      className="relative text-white text-base sm:text-lg"
                    />
                  ) : (
                    plan.ctaText
                  )}
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    </section>
  )
}
