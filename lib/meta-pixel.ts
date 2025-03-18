// Tipos para eventos do Pixel
export type PixelEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Purchase' | 'AddPaymentInfo' | 'FindLocation'

// Interface para dados do evento
export interface PixelEventData {
  value?: number
  currency?: string
  content_name?: string
  content_category?: string
  content_ids?: string[]
  content_type?: string
  contents?: Array<{
    id: string
    quantity: number
    item_price?: number
  }>
  status?: string
  payment_method?: string
  location_id?: string
  event_time?: number
  event_source_url?: string
  user_agent?: string
}

// Declaração global do fbq
declare global {
  interface Window {
    fbq?: (...args: any[]) => void
    _fbq?: any
  }
}

// Função para inicializar o Pixel
export function initializePixel(pixelId: string = '1848788082579760') {
  if (typeof window === 'undefined') return

  // Evita duplicação da inicialização
  if (window.fbq) return

  // Código base do Pixel
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  // Inicializa o Pixel
  window.fbq?.('init', pixelId);
  window.fbq?.('track', 'PageView');
}

// Função para enviar eventos
export function trackPixelEvent(eventName: PixelEvent, data?: PixelEventData) {
  if (typeof window === 'undefined' || !window.fbq) return

  // Gera um ID único para o evento para evitar duplicidade
  const eventId = `${eventName}_${Date.now()}`

  // Envia o evento com os dados
  window.fbq?.('track', eventName, {
    ...data,
    eventID: eventId
  })

  return eventId
}

// Exporta uma instância única
export const metaPixel = {
  initialize: initializePixel,
  track: trackPixelEvent
} 