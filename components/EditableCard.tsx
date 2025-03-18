'use client'

import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import EditableContent from './EditableContent'

interface EditableCardProps {
  path: string
  content: {
    title?: string
    description?: string
    image?: string
    icon?: string
    [key: string]: any
  }
  onSave: (field: string, value: string) => Promise<void>
  className?: string
  imageProps?: {
    width: number
    height: number
    alt: string
  }
}

export default function EditableCard({
  path,
  content,
  onSave,
  className = '',
  imageProps
}: EditableCardProps) {
  const { isAdmin } = useAuth()

  return (
    <div className={`neon-border bg-black/50 backdrop-blur-sm p-6 rounded-xl hover:scale-105 transition-all duration-300 ${className}`}>
      {/* Icon or Image */}
      {(content.icon || content.image) && (
        <div className="relative w-24 h-24 mx-auto mb-4">
          {content.icon ? (
            <div className="text-4xl sm:text-5xl mb-4">{content.icon}</div>
          ) : isAdmin ? (
            <EditableContent
              type="image"
              content={content.image || ''}
              onSave={(value) => onSave('image', value)}
              imageProps={imageProps}
              className="object-contain"
            />
          ) : (
            <Image
              src={content.image || '/placeholder.svg'}
              alt={imageProps?.alt || ''}
              width={imageProps?.width || 96}
              height={imageProps?.height || 96}
              className="object-contain"
            />
          )}
        </div>
      )}

      {/* Title */}
      {content.title && (
        <h3 className="text-xl font-semibold text-white mb-2">
          {isAdmin ? (
            <EditableContent
              type="text"
              content={content.title}
              onSave={(value) => onSave('title', value)}
              className="text-xl font-semibold text-white"
            />
          ) : (
            content.title
          )}
        </h3>
      )}

      {/* Description */}
      {content.description && (
        <p className="text-gray-400">
          {isAdmin ? (
            <EditableContent
              type="text"
              content={content.description}
              onSave={(value) => onSave('description', value)}
              className="text-gray-400"
            />
          ) : (
            content.description
          )}
        </p>
      )}

      {/* Additional Content */}
      {content.tech && (
        <div className="flex flex-wrap gap-2 mt-4">
          {content.tech.map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
            >
              {isAdmin ? (
                <EditableContent
                  type="text"
                  content={tech}
                  onSave={(value) => onSave(`tech.${idx}`, value)}
                  className="text-blue-400"
                />
              ) : (
                tech
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
