import { META_CONFIG } from './meta-config'
import type { ConversionData, UserData, CustomData, StandardEvent } from './meta-config'
import { 
  hashData, 
  generateEventId, 
  getFacebookCookies, 
  getBaseUserData,
  isValidEmail,
  isValidPhone,
  normalizeEmail,
  normalizePhone,
  isValidCurrency,
  isValidValue
} from './meta-utils'

interface EventOptions {
  userData?: Partial<UserData>
  customData?: CustomData
  eventId?: string
  eventSourceUrl?: string
}

class MetaConversionsAPI {
  private readonly endpoint: string

  constructor() {
    this.endpoint = `https://graph.facebook.com/${META_CONFIG.API_VERSION}/${META_CONFIG.PIXEL_ID}/events`
  }

  private async sendEvent(data: ConversionData[]): Promise<any> {
    try {
      const response = await fetch(`${this.endpoint}?access_token=${META_CONFIG.ACCESS_TOKEN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data })
      })

      const result = await response.json()
      
      if (!response.ok) {
        console.error('Erro ao enviar evento para API de Conversões:', result)
        throw new Error(result.error?.message || 'Erro ao enviar evento')
      }

      return result
    } catch (error) {
      console.error('Erro ao chamar API de Conversões:', error)
      throw error
    }
  }

  private prepareUserData(userData?: Partial<UserData>): UserData {
    const { fbc, fbp } = getFacebookCookies()
    const baseUserData = getBaseUserData()

    const preparedData: UserData = {
      ...baseUserData,
      fbc: fbc || undefined,
      fbp: fbp || undefined,
      ...userData
    }

    // Hash dados sensíveis
    if (userData?.em) {
      preparedData.em = userData.em
        .filter(isValidEmail)
        .map(email => hashData(normalizeEmail(email)))
    }

    if (userData?.ph) {
      preparedData.ph = userData.ph
        .filter(isValidPhone)
        .map(phone => hashData(normalizePhone(phone)))
    }

    if (userData?.fn) preparedData.fn = hashData(userData.fn)
    if (userData?.ln) preparedData.ln = hashData(userData.ln)
    if (userData?.ct) preparedData.ct = hashData(userData.ct)
    if (userData?.st) preparedData.st = hashData(userData.st)
    if (userData?.zp) preparedData.zp = hashData(userData.zp)
    if (userData?.external_id) preparedData.external_id = hashData(userData.external_id)

    return preparedData
  }

  private validateCustomData(customData?: CustomData): void {
    if (!customData) return

    if (customData.currency && !isValidCurrency(customData.currency)) {
      throw new Error('Moeda inválida. Use o formato ISO (ex: BRL, USD)')
    }

    if (customData.value !== undefined && !isValidValue(customData.value)) {
      throw new Error('Valor inválido')
    }
  }

  private createEventData(
    eventName: StandardEvent,
    options: EventOptions = {}
  ): ConversionData {
    const { userData, customData, eventId, eventSourceUrl } = options

    this.validateCustomData(customData)

    return {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId || generateEventId(),
      event_source_url: eventSourceUrl || (typeof window !== 'undefined' ? window.location.href : undefined),
      action_source: 'website',
      user_data: this.prepareUserData(userData),
      custom_data: customData
    }
  }

  // Eventos Padrão
  async viewContent(options: EventOptions = {}): Promise<void> {
    const eventData = this.createEventData('ViewContent', options)
    await this.sendEvent([eventData])
  }

  async addPaymentInfo(options: EventOptions = {}): Promise<void> {
    const eventData = this.createEventData('AddPaymentInfo', options)
    await this.sendEvent([eventData])
  }

  async initiateCheckout(options: EventOptions = {}): Promise<void> {
    const eventData = this.createEventData('InitiateCheckout', options)
    await this.sendEvent([eventData])
  }

  async purchase(options: EventOptions = {}): Promise<void> {
    if (!options.customData?.currency || !options.customData?.value) {
      throw new Error('Eventos de compra requerem moeda e valor')
    }
    const eventData = this.createEventData('Purchase', options)
    await this.sendEvent([eventData])
  }

  async findLocation(options: EventOptions = {}): Promise<void> {
    const eventData = this.createEventData('FindLocation', options)
    await this.sendEvent([eventData])
  }

  // Método para testar a conexão com a API
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const testEvent: ConversionData = {
        event_name: 'PageView' as StandardEvent,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: this.prepareUserData()
      }

      const result = await this.sendEvent([testEvent])
      
      return {
        success: true,
        message: 'API de Conversões conectada com sucesso'
      }
    } catch (error) {
      return {
        success: false,
        message: `Erro na conexão com a API de Conversões: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      }
    }
  }
}

// Exporta uma instância única
export const metaConversions = new MetaConversionsAPI() 