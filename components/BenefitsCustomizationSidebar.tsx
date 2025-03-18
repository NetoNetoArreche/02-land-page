'use client'

import { useState, useEffect } from 'react'

interface BenefitsCustomizationSidebarProps {
  isOpen: boolean
  onClose: () => void
  content: any
  onSave: (content: any) => Promise<void>
}

export default function BenefitsCustomizationSidebar({
  isOpen,
  onClose,
  content,
  onSave
}: BenefitsCustomizationSidebarProps) {
  const [localContent, setLocalContent] = useState(content)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setLocalContent(content)
  }, [content])

  // Função para salvar sem fechar o sidebar
  const handleContentChange = async (newContent: any) => {
    try {
      setIsSaving(true)
      setLocalContent(newContent)
      await onSave(newContent)
    } catch (error) {
      console.error('Erro ao salvar:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Função para salvar e fechar o sidebar
  const handleSaveAndClose = async () => {
    try {
      setIsSaving(true)
      await onSave(localContent)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={`fixed top-0 right-0 h-full w-96 bg-black/95 border-l border-blue-500/30 transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
        <h2 className="text-lg font-semibold text-white">Personalizar Benefícios</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-blue-500/10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-8rem)] overflow-y-auto p-6 space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Título da Seção</label>
          <input
            type="text"
            value={localContent.title}
            onChange={(e) => handleContentChange({
              ...localContent,
              title: e.target.value
            })}
            className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Benefits List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-white">Benefícios</label>
            <button
              onClick={() => handleContentChange({
                ...localContent,
                items: [
                  ...localContent.items,
                  {
                    icon: "✨",
                    title: "Novo Benefício",
                    description: "Descrição do benefício"
                  }
                ]
              })}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              + Adicionar Benefício
            </button>
          </div>

          {/* Benefits Items */}
          <div className="space-y-6">
            {localContent.items.map((benefit: any, index: number) => (
              <div key={index} className="p-4 bg-black/30 rounded-lg border border-blue-500/20 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">Benefício {index + 1}</h4>
                  <button
                    onClick={() => {
                      const newItems = [...localContent.items]
                      newItems.splice(index, 1)
                      handleContentChange({
                        ...localContent,
                        items: newItems
                      })
                    }}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remover
                  </button>
                </div>

                {/* Icon */}
                <div className="space-y-2">
                  <label className="block text-xs text-gray-400">Ícone (Emoji)</label>
                  <input
                    type="text"
                    value={benefit.icon}
                    onChange={(e) => {
                      const newItems = [...localContent.items]
                      newItems[index] = {
                        ...benefit,
                        icon: e.target.value
                      }
                      handleContentChange({
                        ...localContent,
                        items: newItems
                      })
                    }}
                    className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-xs text-gray-400">Título</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => {
                      const newItems = [...localContent.items]
                      newItems[index] = {
                        ...benefit,
                        title: e.target.value
                      }
                      handleContentChange({
                        ...localContent,
                        items: newItems
                      })
                    }}
                    className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-xs text-gray-400">Descrição</label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => {
                      const newItems = [...localContent.items]
                      newItems[index] = {
                        ...benefit,
                        description: e.target.value
                      }
                      handleContentChange({
                        ...localContent,
                        items: newItems
                      })
                    }}
                    rows={3}
                    className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/30 bg-black/95">
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveAndClose}
            disabled={isSaving}
            className={`px-6 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center space-x-2 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Concluir Edição</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
