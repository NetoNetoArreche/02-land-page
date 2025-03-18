'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import EditableContent from './EditableContent'

interface FloatingCardProps {
  logo: string
  title: string
  description: string
  onSave?: (field: string, value: string) => Promise<void>
  className?: string
}

export default function FloatingCard({ 
  logo, 
  title, 
  description, 
  onSave,
  className = ''
}: FloatingCardProps) {
  const { isAdmin } = useAuth()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className={`floating-card glass p-6 rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      }}
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        {isAdmin ? (
          <EditableContent
            type="image"
            content={logo}
            onSave={(value) => onSave?.('logo', value)}
            imageProps={{
              width: 96,
              height: 96,
              alt: title
            }}
            className="object-contain"
          />
        ) : (
          <Image
            src={logo}
            alt={title}
            width={96}
            height={96}
            className="object-contain"
          />
        )}
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          {isAdmin ? (
            <EditableContent
              type="text"
              content={title}
              onSave={(value) => onSave?.('title', value)}
              className="text-xl font-semibold text-white"
            />
          ) : (
            title
          )}
        </h3>
        <p className="text-gray-400">
          {isAdmin ? (
            <EditableContent
              type="text"
              content={description}
              onSave={(value) => onSave?.('description', value)}
              className="text-gray-400"
            />
          ) : (
            description
          )}
        </p>
      </div>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />
    </div>
  )
}
