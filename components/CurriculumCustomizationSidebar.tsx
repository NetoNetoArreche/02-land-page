'use client'

import { useState, useEffect } from 'react'

interface CurriculumCustomizationSidebarProps {
  isOpen: boolean
  onClose: () => void
  content: any
  onSave: (content: any) => Promise<void>
}

export default function CurriculumCustomizationSidebar({
  isOpen,
  onClose,
  content,
  onSave
}: CurriculumCustomizationSidebarProps) {
  const [localContent, setLocalContent] = useState(content)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setLocalContent(content)
  }, [content])

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

  const updateTitle = (newTitle: string) => {
    setLocalContent({
      ...localContent,
      title: newTitle
    })
  }

  const updateSectionTitle = (sectionIndex: number, newTitle: string) => {
    const newSections = [...localContent.sections]
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      title: newTitle
    }
    setLocalContent({
      ...localContent,
      sections: newSections
    })
  }

  const updateSectionItem = (sectionIndex: number, itemIndex: number, newItem: string) => {
    const newSections = [...localContent.sections]
    const newItems = [...newSections[sectionIndex].items]
    newItems[itemIndex] = newItem
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      items: newItems
    }
    setLocalContent({
      ...localContent,
      sections: newSections
    })
  }

  const addSectionItem = (sectionIndex: number) => {
    const newSections = [...localContent.sections]
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      items: [...newSections[sectionIndex].items, 'Nova Ferramenta']
    }
    setLocalContent({
      ...localContent,
      sections: newSections
    })
  }

  const removeSectionItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...localContent.sections]
    const newItems = newSections[sectionIndex].items.filter((_: any, i: number) => i !== itemIndex)
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      items: newItems
    }
    setLocalContent({
      ...localContent,
      sections: newSections
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Editar Seção Curriculum
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {/* Título Principal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título Principal
                </label>
                <input
                  type="text"
                  value={localContent.title}
                  onChange={(e) => updateTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Título da seção"
                />
              </div>

              {/* Seções */}
              {localContent.sections?.map((section: any, sectionIndex: number) => (
                <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm font-bold">
                      {(sectionIndex + 1).toString().padStart(2, '0')}
                    </span>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Título da seção"
                    />
                  </div>

                  {/* Items da seção */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Ferramentas/Tecnologias
                    </label>
                    {section.items?.map((item: string, itemIndex: number) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateSectionItem(sectionIndex, itemIndex, e.target.value)}
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Nome da ferramenta"
                        />
                        <button
                          onClick={() => removeSectionItem(sectionIndex, itemIndex)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addSectionItem(sectionIndex)}
                      className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-300 hover:text-blue-500 transition-colors"
                    >
                      + Adicionar Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAndClose}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
