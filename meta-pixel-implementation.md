# Implementação Meta Pixel e API de Conversões

## 1. Configurações Principais (`lib/meta-config.ts`)

```typescript
export const META_CONFIG = {
  PIXEL_ID: '1848788082579760',
  ACCESS_TOKEN: 'EAAL8LRZBbZBqIBOzYp91TAZBzw3q18rausjbbsgFEOJMFOIo7fe7ZBX1Lzz9RWBgaYvcSmzBIXeT5sLpWfzyBwNIPsYOF14lIj3sHxXjt7hyPaBRUqnmOimm0S1VeTZAQT50Vg2ujXvD5fZBb8W9Oku8IBLEKcx2uWy92ZAli2nZApX30wV8ESLF1OP9sAejwEgkLQZDZD',
  API_VERSION: 'v18.0'
}
```

## 2. Implementação do Pixel (`app/layout.tsx`)

```typescript
<Script id="meta-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1848788082579760');
    fbq('track', 'PageView');
  `}
</Script>
<noscript>
  <img 
    height="1" 
    width="1" 
    style={{ display: 'none' }}
    src="https://www.facebook.com/tr?id=1848788082579760&ev=PageView&noscript=1"
  />
</noscript>
```

## 3. API de Conversões (`lib/meta-conversions.ts`)

```typescript
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

  // Método para testar a conexão
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
```

## 4. Exemplo de Uso (em `components/sections/Plans.tsx`)

```typescript
const handleCheckout = async () => {
  try {
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
  } catch (error) {
    console.error('Erro ao enviar evento de checkout:', error)
  }
}
```

## 5. Credenciais

- **Pixel ID**: `1848788082579760`
- **Access Token**: `EAAL8LRZBbZBqIBOzYp91TAZBzw3q18rausjbbsgFEOJMFOIo7fe7ZBX1Lzz9RWBgaYvcSmzBIXeT5sLpWfzyBwNIPsYOF14lIj3sHxXjt7hyPaBRUqnmOimm0S1VeTZAQT50Vg2ujXvD5fZBb8W9Oku8IBLEKcx2uWy92ZAli2nZApX30wV8ESLF1OP9sAejwEgkLQZDZD`
- **API Version**: `v18.0`

## 6. Eventos Implementados

- PageView (automático)
- ViewContent
- InitiateCheckout
- AddPaymentInfo
- Purchase

## 7. Componente de Status (`components/MetaPixelStatus.tsx`)

```typescript
export default function MetaPixelStatus() {
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await metaConversions.testConnection()
        setStatus(result)
      } catch (error) {
        setStatus({
          success: false,
          message: 'Erro ao verificar conexão com o Meta Pixel'
        })
      } finally {
        setLoading(false)
      }
    }

    checkConnection()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        <span>Verificando conexão com Meta Pixel...</span>
      </div>
    )
  }

  return (
    <div className={`text-sm ${status?.success ? 'text-green-500' : 'text-red-500'}`}>
      <div className="flex items-center space-x-2">
        <div className={`h-2 w-2 rounded-full ${status?.success ? 'bg-green-500' : 'bg-red-500'}`} />
        <span>{status?.message}</span>
      </div>
    </div>
  )
}
```

## 8. Preparação de Dados do Usuário

```typescript
private prepareUserData(userData?: Partial<UserData>): UserData {
  const { fbc, fbp } = getFacebookCookies()
  const baseUserData = getBaseUserData()

  return {
    ...baseUserData,
    fbc: fbc || undefined,
    fbp: fbp || undefined,
    ...userData
  }
}
```

## 9. Eventos na Página de Obrigado (`app/obrigado/page.tsx`)

```typescript
const sendPurchaseEvent = async () => {
  try {
    const eventData = {
      currency: 'BRL',
      value: 497.00,
      content_type: 'product',
      content_name: 'Assinatura Anual Design no Code',
      content_ids: ['annual_subscription'],
      content_category: 'Assinatura',
      contents: [{
        id: 'annual_subscription',
        quantity: 1,
        item_price: 497.00
      }],
      status: 'completed'
    }

    // Gera ID único para o evento
    const eventId = metaPixel.track('Purchase', eventData)

    // Envia para API de Conversões com mesmo eventId
    await metaConversions.purchase({
      eventId,
      customData: eventData
    })
  } catch (error) {
    console.error('Erro ao enviar evento de compra:', error)
  }
}
```

## 10. Segurança e Boas Práticas

1. O Access Token está armazenado em constantes
2. Dados sensíveis são hasheados antes do envio
3. Validações de dados antes do envio
4. Tratamento de erros em todas as chamadas
5. Monitoramento de status da conexão
6. Eventos são enviados tanto via Pixel quanto via API
7. Logs de erro para debugging 