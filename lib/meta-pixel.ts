// Tipos de eventos do Pixel
export type PixelEventType = 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'AddPaymentInfo' | 'Lead' | 'CompleteRegistration' | 'Contact' | 'FindLocation' | 'Schedule' | 'SubmitApplication' | 'Subscribe'

// Interface para o objeto window com o fbq já está definida em types/window.d.ts

// Classe para gerenciar o Meta Pixel - apenas verificação, sem inicialização
class MetaPixel {
  private pixelId: string

  constructor(pixelId: string = '1848788082579760') {
    this.pixelId = pixelId
  }

  // Verifica se o Pixel está disponível
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.fbq
  }

  // NÃO inicializa o pixel, apenas verifica se ele já existe
  initialize(): void {
    if (typeof window === 'undefined') return
    
    if (window.fbq) {
      console.log('Meta Pixel já está disponível')
    } else {
      console.warn('Meta Pixel não encontrado no window. Verifique o script no layout.tsx')
    }
  }

  // Envia apenas o evento PageView se o pixel já estiver inicializado
  trackEvent(eventName: PixelEventType, data: Record<string, any> = {}): string | null {
    // Bloqueia qualquer evento que não seja PageView
    if (eventName !== 'PageView') {
      console.warn(`Evento ${eventName} bloqueado. Apenas PageView é permitido.`)
      return null
    }

    // Verifica se o Pixel está disponível
    if (!this.isAvailable()) {
      console.warn('Meta Pixel não disponível para enviar eventos')
      return null
    }

    // Gera um ID único para o evento
    const eventId = `${eventName}_${Date.now()}`

    try {
      // NÃO enviamos o evento novamente, pois o PageView já é enviado automaticamente
      // pelo script no layout.tsx. Apenas logamos para fins de debug.
      console.log(`Evento ${eventName} já foi enviado pelo script no layout.tsx`)
      return eventId
    } catch (error) {
      console.error('Erro ao verificar evento:', error)
      return null
    }
  }
}

// Instância única do Meta Pixel
export const metaPixel = new MetaPixel()

// Funções de conveniência para compatibilidade com código existente

// NÃO inicializa o pixel, apenas verifica se ele já existe
export function initializePixel(pixelId: string = '1848788082579760'): void {
  metaPixel.initialize()
}

// Função para enviar eventos - apenas PageView é permitido e não envia de fato
export function trackPixelEvent(
  eventName: PixelEventType,
  data: Record<string, any> = {}
): string | null {
  return metaPixel.trackEvent(eventName, data)
}

// Exporta uma instância única
export const metaPixelInstance = {
  initialize: initializePixel,
  track: trackPixelEvent
}