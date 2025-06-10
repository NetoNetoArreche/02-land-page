import { NextRequest, NextResponse } from 'next/server'
import { META_CONFIG } from '@/lib/meta-config'
import type { ConversionData } from '@/lib/meta-config'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const url = request.headers.get('referer') || request.url
    const userAgent = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-forwarded-for') || request.ip || ''

    // Verificar se o evento é PageView, caso contrário, rejeitar
    if (data.event_name && data.event_name !== 'PageView') {
      return NextResponse.json(
        { success: false, error: 'Apenas eventos PageView são permitidos' },
        { status: 400 }
      )
    }

    // Pegar cookies FBC e FBP
    const cookies = request.cookies
    const fbc = cookies.get('_fbc')?.value
    const fbp = cookies.get('_fbp')?.value

    // Preparar dados do evento - forçar como PageView
    const eventData: ConversionData = {
      ...data,
      event_name: 'PageView', // Forçar apenas PageView
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: url,
      user_data: {
        ...data.user_data,
        client_ip_address: ip,
        client_user_agent: userAgent,
        fbc: fbc,
        fbp: fbp
      },
      action_source: 'website'
    }

    // Enviar para a API do Meta
    const response = await fetch(
      `https://graph.facebook.com/${META_CONFIG.API_VERSION}/${META_CONFIG.PIXEL_ID}/events?access_token=${META_CONFIG.ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventData]
        }),
      }
    )

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error?.message || 'Erro ao enviar evento')
    }

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Erro na rota de conversões:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao processar conversão' },
      { status: 500 }
    )
  }
} 