'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import EditableContent from './EditableContent'

interface EditableSectionProps {
  path: string
  content: string
  onSave: (path: string, value: string) => Promise<void>
  className?: string
  as?: keyof JSX.IntrinsicElements
  children?: ReactNode
}

export default function EditableSection({
  path,
  content,
  onSave,
  className = '',
  as: Component = 'div',
  children
}: EditableSectionProps) {
  const { isAdmin } = useAuth()

  // Se não houver conteúdo, use uma string vazia para evitar erros
  const safeContent = content || ''

  if (isAdmin) {
    return (
      <Component className={className}>
        <EditableContent
          type="text"
          content={safeContent}
          onSave={(value) => onSave(path, value)}
          className={className}
        />
        {children}
      </Component>
    )
  }

  return (
    <Component className={className}>
      {safeContent}
      {children}
    </Component>
  )
}
