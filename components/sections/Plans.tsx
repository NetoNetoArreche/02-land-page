'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
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
                acabou de assinar a Comunidade IACode!
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
    <section id="plans-section" className="py-32 relative overflow-hidden">
      {/* Container para as notificações */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderedNotifications}
      </div>

      {/* Base Background with Visible Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#000',
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      
      {/* Large Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Medium Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Small Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Diagonal Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-blue-500/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-500" />

      {/* Content */}
      <div id="pricing" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Plano Exclusivo
          </h2>
          <p className="text-xl text-gray-400">
            Invista no seu futuro com nossa assinatura anual
          </p>
        </div>

        {/* Single Plan */}
        <div className="max-w-lg mx-auto">
          <div className="relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 overflow-hidden shadow-xl">
            {/* Card Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
            
            <div className="relative">
              {/* Plan name */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="text-center mb-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-semibold text-gray-300">R$</span>
                    <div className="flex items-start">
                      <span className="text-7xl font-bold gradient-text">497</span>
                      <span className="text-3xl font-bold gradient-text">,00</span>
                    </div>
                  </div>
                  <span className="text-xl font-medium text-gray-300">à vista</span>
                </div>
              </div>

              {/* Installment Option */}
              <div className="text-center mb-8">
                <p className="text-lg text-gray-400">
                  ou 12x de{' '}
                  <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    R$ {plan.priceInstallment}
                  </span>
                </p>
              </div>

              {/* Divider */}
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8" />

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300 bg-black/20 p-3 rounded-lg hover:bg-black/30 transition-colors backdrop-blur-sm">
                    <svg
                      className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={handleCheckout}
                className="w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity mb-6"
              >
                Começar Agora
              </button>

              {/* Secure Payment Info */}
              <div className="text-center mt-2">
                <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm">Compra 100% Segura</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div 
                    className="flex items-center gap-1 text-gray-400 cursor-pointer hover:text-blue-400 transition-colors"
                    onClick={() => handlePaymentMethodSelect('credit_card')}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4ZM4 6H20V10H4V6ZM4 12H20V18H4V12Z"/>
                    </svg>
                    <span className="text-sm">Cartão</span>
                  </div>
                  <div 
                    className="flex items-center gap-1 text-gray-400 cursor-pointer hover:text-blue-400 transition-colors"
                    onClick={() => handlePaymentMethodSelect('pix')}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.0607 2.93934C11.9289 1.80761 10.0711 1.80761 8.93934 2.93934L2.93934 8.93934C1.80761 10.0711 1.80761 11.9289 2.93934 13.0607L8.93934 19.0607C10.0711 20.1924 11.9289 20.1924 13.0607 19.0607L19.0607 13.0607C20.1924 11.9289 20.1924 10.0711 19.0607 8.93934L13.0607 2.93934ZM11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11V7ZM12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z"/>
                    </svg>
                    <span className="text-sm">Pix</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
