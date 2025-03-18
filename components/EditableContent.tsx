'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-browser'

interface EditableContentProps {
  type: 'text' | 'image'
  content: string
  onSave: (newContent: string) => Promise<void>
  className?: string
  imageProps?: {
    width: number
    height: number
    alt: string
  }
}

export default function EditableContent({ type, content, onSave, className = '', imageProps }: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempContent, setTempContent] = useState(content)
  const [isHovered, setIsHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = async () => {
    try {
      await onSave(tempContent)
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const supabase = createClient()
      
      // Criar nome único para o arquivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `tools/${fileName}`

      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('tools')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('tools')
        .getPublicUrl(filePath)

      await onSave(publicUrl)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
    }
  }

  if (type === 'image') {
    return (
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={content || '/placeholder-logo.svg'}
          alt={imageProps?.alt || ''}
          width={imageProps?.width || 96}
          height={imageProps?.height || 96}
          className={`${className} ${isHovered ? 'opacity-50' : ''}`}
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded transition-all">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload(file)
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-white hover:text-blue-400 transition-colors"
            >
              Editar Imagem
            </button>
          </div>
        )}
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') setIsEditing(false)
          }}
          className={`${className} bg-transparent border border-blue-500 rounded px-2 py-1 outline-none`}
        />
      </div>
    )
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`${className} cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 rounded px-2 py-1 -mx-2`}
    >
      {content}
    </div>
  )
}
