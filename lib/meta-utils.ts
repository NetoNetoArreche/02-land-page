import crypto from 'crypto'

// Função para criar hash SHA256
export function hashData(data: string): string {
  if (!data) return ''
  return crypto
    .createHash('sha256')
    .update(data.toLowerCase().trim())
    .digest('hex')
}

// Função para normalizar email
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

// Função para normalizar número de telefone (remove tudo exceto números)
export function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '')
}

// Função para validar email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para validar telefone (básica, pode ser adaptada)
export function isValidPhone(phone: string): boolean {
  const normalizedPhone = normalizePhone(phone)
  return normalizedPhone.length >= 10 && normalizedPhone.length <= 15
}

// Função para gerar ID único do evento
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Função para obter cookies FBC e FBP
export function getFacebookCookies(): { fbc: string | null; fbp: string | null } {
  if (typeof document === 'undefined') return { fbc: null, fbp: null }
  
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=').map(c => c.trim())
    acc[key] = value
    return acc
  }, {} as { [key: string]: string })

  return {
    fbc: cookies._fbc || null,
    fbp: cookies._fbp || null
  }
}

// Função para obter dados básicos do usuário para todos os eventos
export function getBaseUserData(): { client_user_agent: string } {
  return {
    client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
  }
}

// Função para validar moeda
export function isValidCurrency(currency: string): boolean {
  const currencyRegex = /^[A-Z]{3}$/
  return currencyRegex.test(currency)
}

// Função para validar valor
export function isValidValue(value: number): boolean {
  return typeof value === 'number' && value >= 0 && !isNaN(value)
} 