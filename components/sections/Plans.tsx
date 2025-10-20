'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { metaConversions } from '@/lib/meta-conversions'
import { metaPixel } from '@/lib/meta-pixel'

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { content } = useRealtimeContent()

  const plan = {
    id: 'annual',
    name: 'Assinatura Anual',
    priceOneTime: '497,00',
    priceInstallment: '51,40',
    ctaLink: content?.hero?.ctaLink,
    features: [
      'Acesso a todos os cursos futuros',
      'Comunidade no Circle',
      'Acesso a lives exclusivas',
      'Projetos práticos',
      'Networking ',
      'Suporte ',
      'Acesso total aos  próximos módulos ',
      'Módulo de Framer completo'
    ]
  }

  const notifications = [
    {
      name: "Maria Silva",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      time: "agora mesmo"
    },
    {
      name: "João Santos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      time: "há 2 minutos"
    },
    {
      name: "Ana Costa",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      time: "há 5 minutos"
    },
    {
      name: "Pedro Oliveira",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      time: "há 8 minutos"
    },
    {
      name: "Lucas Mendes",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      time: "há 10 minutos"
    },
    {
      name: "Carla Souza",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      time: "agora mesmo"
    },
    {
      name: "Rafael Lima",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150",
      time: "há 3 minutos"
    },
    {
      name: "Julia Martins",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      time: "há 7 minutos"
    },
    {
      name: "Bruno Costa",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150",
      time: "agora mesmo"
    },
    {
      name: "Sofia Oliveira",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      time: "há 1 minuto"
    },
    {
      name: "Gabriel Santos",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      time: "há 4 minutos"
    },
    {
      name: "Isabella Lima",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      time: "há 6 minutos"
    }
  ];

  const [activeNotifications, setActiveNotifications] = useState<Array<{ id: number; notification: typeof notifications[0] }>>([]);

  // Cache de imagens de avatar para melhor performance
  const preloadedAvatars = useMemo(() => {
    return notifications.map(n => {
      const img = new Image();
      img.src = n.avatar;
      return img;
    });
  }, []);

  // Memoize a função de posicionamento para evitar recálculos desnecessários
  const getColumnPosition = useCallback((id: number) => {
    const isLeftColumn = id % 2 === 0;
    const column = isLeftColumn ? 
      { x: 15, minY: 20, maxY: 80 } : 
      { x: 85, minY: 20, maxY: 80 };
    
    const verticalPosition = Math.random() * (column.maxY - column.minY) + column.minY;
    
    return {
      left: `${column.x}%`,
      top: `${verticalPosition}%`
    };
  }, []);

  // Memoize as notificações ativas para evitar re-renders desnecessários
  const renderedNotifications = useMemo(() => {
    return activeNotifications.map(({ id, notification }) => {
      const position = getColumnPosition(id);
      return (
        <div 
          key={id}
          className="absolute z-10 animate-fade-in-out transform transition-all duration-500 will-change-transform"
          style={position}
        >
          <div className={`bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 shadow-2xl flex items-center gap-3 max-w-xs transform hover:scale-105 transition-transform ${id % 2 === 0 ? 'translate-x-[-50%]' : 'translate-x-[-100%]'}`}>
            <img
              src={notification.avatar}
              alt={notification.name}
              className="w-12 h-12 rounded-full ring-2 ring-blue-500/50 object-cover"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {notification.name}
              </p>
              <p className="text-blue-400 text-xs">
                acabou de assinar a Comunidade Vibe Coding!
              </p>
              <p className="text-gray-200 text-xs mt-0.5">
                {notification.time}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }, [activeNotifications, getColumnPosition]);

  useEffect(() => {
    let lastId = 0;
    let timeouts: number[] = [];
    let isActive = true;
    
    const addNotification = () => {
      if (!isActive) return;
      
      const notification = notifications[Math.floor(Math.random() * notifications.length)];
      const id = lastId++;
      
      setActiveNotifications(prev => {
        const newNotifications = [...prev, { id, notification }];
        return newNotifications.length > 6 ? newNotifications.slice(1) : newNotifications;
      });
      
      const timeout = window.setTimeout(() => {
        if (!isActive) return;
        setActiveNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);
      
      timeouts.push(timeout);
    };

    const firstTimer = window.setTimeout(addNotification, 1000);
    timeouts.push(firstTimer);

    const interval = window.setInterval(() => {
      if (Math.random() > 0.3) {
        addNotification();
      }
    }, Math.random() * 2000 + 2000);

    return () => {
      isActive = false;
      timeouts.forEach(t => window.clearTimeout(t));
      window.clearInterval(interval);
    };
  }, []);

  const handleCheckout = async () => {
    try {
      // Envia evento de início de checkout para ambos Pixel e API
      const eventData = {
        currency: 'BRL',
        value: 497.00,
        content_name: 'Assinatura Anual',
        content_type: 'product',
        content_ids: ['annual_subscription'],
        content_category: 'Assinatura',
        contents: [{
          id: 'annual_subscription',
          quantity: 1,
          item_price: 497.00
        }]
      }

      // Gera ID único para o evento
      const eventId = metaPixel.track('InitiateCheckout', eventData)

      // Envia para API de Conversões com mesmo eventId
      await metaConversions.initiateCheckout({
        eventId,
        customData: eventData
      })

      // Efeito de confete
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B']
      });

      // Atualiza estado e redireciona
      if (plan.ctaLink) {
        window.location.href = plan.ctaLink;
      }
    } catch (error) {
      console.error('Erro ao enviar evento de checkout:', error)
      // Continua com o redirecionamento mesmo se o evento falhar
      if (plan.ctaLink) {
        window.location.href = plan.ctaLink;
      }
    }
  };

  const handlePaymentMethodSelect = async (method: 'credit_card' | 'pix') => {
    try {
      const eventData = {
        currency: 'BRL',
        value: 497.00,
        content_name: 'Assinatura Anual',
        content_type: 'product',
        payment_method: method,
        content_category: 'Assinatura'
      }

      // Gera ID único para o evento
      const eventId = metaPixel.track('AddPaymentInfo', eventData)

      // Envia para API de Conversões com mesmo eventId
      await metaConversions.addPaymentInfo({
        eventId,
        customData: eventData,
        userData: {
          client_user_agent: navigator.userAgent,
          client_ip_address: '', // Será preenchido pelo servidor
          transaction_time: Math.floor(Date.now() / 1000)
        }
      })
    } catch (error) {
      console.error('Erro ao enviar evento de pagamento:', error)
    }
  }

  return (
    <section id="plans-section" className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 relative">
      {/* Container para as notificações */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderedNotifications}
      </div>

      {/* Content */}
      <div id="pricing" className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> 
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-6 py-2 mb-6"
          >
            <span className="text-blue-400 font-semibold text-sm">💎 OFERTA ESPECIAL</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Plano Exclusivo
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Transforme sua carreira com acesso completo à nossa plataforma
          </p>
        </motion.div>

        {/* Premium Pricing Card */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg mx-auto mt-16"
        >
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-colors duration-300">

              {/* Header with Gradient */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-8 pt-8 pb-8 text-center text-white relative">
                
                {/* Oferta Badge - DENTRO do header */}
                <div className="absolute -top-0 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-b-2xl text-sm font-bold shadow-lg">
                    💎 OFERTA ESPECIAL
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-6">{plan.name}</h3>
                <p className="text-indigo-100 text-sm">Transforme sua carreira agora</p>
              </div>

              {/* Price Section */}
              <div className="px-8 py-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center">
                  {/* Old Price */}
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-lg text-gray-400 line-through">De R$ 997</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce">-50%</span>
                  </div>
                  
                  {/* Current Price */}
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-2xl font-semibold text-gray-600">R$</span>
                    <span className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      497
                    </span>
                  </div>
                  
                  <p className="text-gray-600 font-medium mb-4">pagamento único</p>
                  
                  {/* Installments */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                    <p className="text-gray-700">
                      ou <span className="text-2xl font-bold text-indigo-600">12x R$ {plan.priceInstallment}</span>
                    </p>
                    <p className="text-sm text-gray-500">sem juros</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="px-8 py-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  ✨ Tudo que você vai receber
                </h4>
                
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="px-8 pb-8">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
                >
                  🚀 Começar Agora
                </motion.button>
                
                {/* Trust Indicators */}
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Garantia de 7 dias</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm">Pagamento 100% Seguro</span>
                  </div>
                  
                  {/* Payment Methods */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <div 
                      className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
                      onClick={() => handlePaymentMethodSelect('credit_card')}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4ZM4 6H20V10H4V6ZM4 12H20V18H4V12Z"/>
                      </svg>
                      <span className="text-xs font-medium">Cartão</span>
                    </div>
                    
                    <div className="w-px h-4 bg-gray-300" />
                    
                    <div 
                      className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
                      onClick={() => handlePaymentMethodSelect('pix')}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.0607 2.93934C11.9289 1.80761 10.0711 1.80761 8.93934 2.93934L2.93934 8.93934C1.80761 10.0711 1.80761 11.9289 2.93934 13.0607L8.93934 19.0607C10.0711 20.1924 11.9289 20.1924 13.0607 19.0607L19.0607 13.0607C20.1924 11.9289 20.1924 10.0711 19.0607 8.93934L13.0607 2.93934ZM11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11V7ZM12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z"/>
                      </svg>
                      <span className="text-xs font-medium">PIX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
