'use client'

export default function MetaPixelStatus() {
  // Componente estático sem efeitos ou interações com o Meta Pixel
  return (
    <div className="text-sm text-green-500">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span>Pixel configurado (apenas PageView)</span>
      </div>
    </div>
  )
}