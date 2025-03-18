export const META_CONFIG = {
  PIXEL_ID: '1848788082579760',
  ACCESS_TOKEN: 'EAAL8LRZBbZBqIBOzYp91TAZBzw3q18rausjbbsgFEOJMFOIo7fe7ZBX1Lzz9RWBgaYvcSmzBIXeT5sLpWfzyBwNIPsYOF14lIj3sHxXjt7hyPaBRUqnmOimm0S1VeTZAQT50Vg2ujXvD5fZBb8W9Oku8IBLEKcx2uWy92ZAli2nZApX30wV8ESLF1OP9sAejwEgkLQZDZD',
  API_VERSION: 'v18.0'
}

export type StandardEvent = 
  | 'ViewContent'
  | 'AddPaymentInfo'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'FindLocation'
  | 'PageView'

export interface UserData {
  em?: string[] // Emails hasheados
  ph?: string[] // Telefones hasheados
  ge?: string // Gênero
  db?: string // Data de nascimento
  ln?: string // Sobrenome hasheado
  fn?: string // Nome hasheado
  ct?: string // Cidade hasheada
  st?: string // Estado hasheado
  zp?: string // CEP hasheado
  country?: string // País hasheado
  external_id?: string // ID externo hasheado
  client_ip_address?: string // IP do cliente - não hashear
  client_user_agent?: string // User Agent - não hashear
  fbc?: string // Click ID - não hashear
  fbp?: string // Browser ID - não hashear
  subscription_id?: string // ID da assinatura - não hashear
  transaction_time?: number // Horário da transação
}

export interface CustomData {
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
  location_id?: string // Para evento FindLocation
  payment_method?: string // Para evento AddPaymentInfo
}

export interface ConversionData {
  event_name: StandardEvent
  event_time: number
  event_id?: string
  event_source_url?: string
  action_source: 'website' | 'email' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other'
  user_data: UserData
  custom_data?: CustomData
} 