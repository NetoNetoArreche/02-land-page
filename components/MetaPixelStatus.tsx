'use client'

import { useEffect, useState } from 'react'
import { metaConversions } from '@/lib/meta-conversions'

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