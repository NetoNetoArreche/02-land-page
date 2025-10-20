'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface CustomizationSidebarProps {
  isOpen: boolean
  onClose: () => void
  content: any
  onSave: (content: any) => Promise<void>
}

export default function CustomizationSidebar({
  isOpen,
  onClose,
  content,
  onSave
}: CustomizationSidebarProps) {
  const [localContent, setLocalContent] = useState(content)
  const [isSaving, setIsSaving] = useState(false)
  const [keepAspectRatio, setKeepAspectRatio] = useState(true)
  const [originalAspectRatio, setOriginalAspectRatio] = useState(0)
  const [neonEffect, setNeonEffect] = useState(true)

  useEffect(() => {
    setLocalContent(content)
  }, [content])

  // Função para salvar sem fechar o sidebar
  const handleContentChange = async (newContent: any) => {
    try {
      setLocalContent(newContent)
      await onSave(newContent)
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  // Função para salvar e fechar o sidebar (apenas quando o botão "Concluir Edição" é clicado)
  const handleSaveAndClose = async () => {
    try {
      await onSave(localContent)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const handleLogoUpload = async (file: File) => {
    try {
      setIsSaving(true)
      console.log('Iniciando upload da logo...')
      
      const supabase = createClient()

      // Upload do arquivo
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`
      console.log('Nome do arquivo:', fileName)
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('logos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('Erro no upload:', uploadError)
        throw uploadError
      }

      console.log('Upload concluído:', uploadData)

      // Obter URL pública
      const { data: { publicUrl } } = supabase
        .storage
        .from('logos')
        .getPublicUrl(fileName)

      console.log('URL pública:', publicUrl)

      // Atualizar estado e salvar
      const newContent = {
        ...localContent,
        logo: {
          url: publicUrl,
          width: 200,
          height: 80,
          marginBottom: 40,
          neonEffect: neonEffect
        }
      }

      console.log('Novo conteúdo com logo:', newContent)
      handleContentChange(newContent)
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Função para calcular o aspect ratio quando a imagem carregar
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement
    const ratio = img.naturalWidth / img.naturalHeight
    setOriginalAspectRatio(ratio)
    console.log('Aspect ratio original:', ratio)
  }

  // Função para ajustar dimensões mantendo proporção
  const adjustDimensions = (width: number, height: number, fromWidth: boolean) => {
    if (!keepAspectRatio || originalAspectRatio === 0) return { width, height }

    if (fromWidth) {
      // Ajustar altura baseado na largura
      return {
        width,
        height: Math.round(width / originalAspectRatio)
      }
    } else {
      // Ajustar largura baseado na altura
      return {
        width: Math.round(height * originalAspectRatio),
        height
      }
    }
  }

  // Função para alternar efeito neon
  const toggleNeonEffect = (enabled: boolean) => {
    setNeonEffect(enabled)
    const newContent = {
      ...localContent,
      logo: {
        ...localContent.logo,
        neonEffect: enabled
      }
    }
    handleContentChange(newContent)
  }

  return (
    <div className={`fixed top-0 right-0 h-full w-96 bg-black/95 border-l border-blue-500/30 transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
        <h2 className="text-lg font-semibold text-white">Personalizar Landing Page</h2>
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
        {/* Logo Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium text-white">Logo</h3>
            {localContent.logo?.url && (
              <button
                onClick={() => {
                  const newContent = {
                    ...localContent,
                    logo: undefined
                  }
                  handleContentChange(newContent)
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Remover Logo
              </button>
            )}
          </div>

          {/* Upload Area */}
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  if (file.size > 1024 * 1024) {
                    alert('A imagem deve ter no máximo 1MB')
                    return
                  }
                  if (!file.type.startsWith('image/')) {
                    alert('O arquivo deve ser uma imagem')
                    return
                  }
                  handleLogoUpload(file)
                }
              }}
              disabled={isSaving}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-500/30 rounded-xl bg-black/30 cursor-pointer group-hover:border-blue-500/50 transition-colors"
            >
              {localContent.logo?.url ? (
                <div className="relative w-full h-full p-4">
                  <img
                    src={localContent.logo.url}
                    alt="Logo Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.error('Erro ao carregar preview:', e)
                    }}
                    onLoad={handleImageLoad}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-sm text-white">Clique para trocar a logo</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                  <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm">Clique para fazer upload da logo</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG ou GIF até 1MB</span>
                </div>
              )}
            </label>
            {isSaving && (
              <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Logo Settings */}
          {localContent.logo?.url && (
            <div className="space-y-4">
              {/* Aspect Ratio Toggle */}
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                <label htmlFor="keepAspectRatio" className="text-sm text-white">
                  Manter Proporção
                </label>
                <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="keepAspectRatio"
                    checked={keepAspectRatio}
                    onChange={(e) => setKeepAspectRatio(e.target.checked)}
                    className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                  />
                  <div className={`w-10 h-6 bg-black/50 rounded-full p-1 transition-colors duration-200 ease-in-out ${keepAspectRatio ? 'bg-blue-500' : ''}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${keepAspectRatio ? 'translate-x-4' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Neon Effect Toggle */}
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                <label htmlFor="neonEffect" className="text-sm text-white">
                  Efeito Neon
                </label>
                <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="neonEffect"
                    checked={neonEffect}
                    onChange={(e) => toggleNeonEffect(e.target.checked)}
                    className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                  />
                  <div className={`w-10 h-6 bg-black/50 rounded-full p-1 transition-colors duration-200 ease-in-out ${neonEffect ? 'bg-blue-500' : ''}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${neonEffect ? 'translate-x-4' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs text-gray-400">Largura</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={localContent.logo.width || 200}
                      onChange={(e) => {
                        const width = Number(e.target.value)
                        const dimensions = adjustDimensions(
                          width,
                          localContent.logo?.height || 80,
                          true
                        )
                        handleContentChange({
                          ...localContent,
                          logo: {
                            ...localContent.logo,
                            ...dimensions
                          }
                        })
                      }}
                      className="w-full pl-3 pr-12 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400 text-sm">
                      px
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs text-gray-400">Altura</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={localContent.logo.height || 80}
                      onChange={(e) => {
                        const height = Number(e.target.value)
                        const dimensions = adjustDimensions(
                          localContent.logo?.width || 200,
                          height,
                          false
                        )
                        handleContentChange({
                          ...localContent,
                          logo: {
                            ...localContent.logo,
                            ...dimensions
                          }
                        })
                      }}
                      className="w-full pl-3 pr-12 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400 text-sm">
                      px
                    </div>
                  </div>
                </div>
              </div>

              {/* Margin Bottom */}
              <div className="space-y-2">
                <label className="block text-xs text-gray-400">Espaçamento Inferior</label>
                <div className="relative">
                  <input
                    type="number"
                    value={localContent.logo.marginBottom || 40}
                    onChange={(e) => {
                      handleContentChange({
                        ...localContent,
                        logo: {
                          ...localContent.logo,
                          marginBottom: Number(e.target.value)
                        }
                      })
                    }}
                    className="w-full pl-3 pr-12 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400 text-sm">
                    px
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* CTA Link Section */}
        <section className="space-y-4">
          <h3 className="text-md font-medium text-white">Link do Botão Começar Agora</h3>
          <div className="space-y-2">
            <input
              type="text"
              value={localContent.ctaLink || ''}
              onChange={(e) => {
                const newContent = {
                  ...localContent,
                  ctaLink: e.target.value
                }
                handleContentChange(newContent)
              }}
              className="w-full px-4 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Ex: #signup, /checkout"
            />
            <p className="text-xs text-gray-400">
              Use # para links internos (ex: #signup) ou URL completa para links externos
            </p>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium text-white">Por que fazer parte?</h3>
          </div>

          {/* Section Title */}
          <div className="space-y-2">
            <label className="block text-xs text-gray-400">Título da Seção</label>
            <input
              type="text"
              value={localContent.whyJoin?.title || 'Por que fazer parte da Comunidade Vibe Coding?'}
              onChange={(e) => {
                const newContent = {
                  ...localContent,
                  whyJoin: {
                    ...localContent.whyJoin,
                    title: e.target.value
                  }
                }
                handleContentChange(newContent)
              }}
              className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs text-gray-400">Benefícios</label>
              <button
                onClick={() => {
                  const newContent = {
                    ...localContent,
                    whyJoin: {
                      ...localContent.whyJoin,
                      benefits: [
                        ...(localContent.whyJoin?.benefits || []),
                        {
                          title: 'Novo Benefício',
                          description: 'Descrição do benefício',
                          icon: '✨'
                        }
                      ]
                    }
                  }
                  handleContentChange(newContent)
                }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                + Adicionar Benefício
              </button>
            </div>

            {/* Benefits Items */}
            <div className="space-y-4">
              {localContent.whyJoin?.benefits?.map((benefit: any, index: number) => (
                <div key={index} className="p-4 bg-black/30 rounded-lg border border-blue-500/20 space-y-3">
                  {/* Benefit Icon */}
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-400">Ícone</label>
                    <input
                      type="text"
                      value={benefit.icon}
                      onChange={(e) => {
                        const newBenefits = [...(localContent.whyJoin?.benefits || [])]
                        newBenefits[index] = {
                          ...benefit,
                          icon: e.target.value
                        }
                        const newContent = {
                          ...localContent,
                          whyJoin: {
                            ...localContent.whyJoin,
                            benefits: newBenefits
                          }
                        }
                        handleContentChange(newContent)
                      }}
                      className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="✨"
                    />
                  </div>

                  {/* Benefit Title */}
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-400">Título</label>
                    <input
                      type="text"
                      value={benefit.title}
                      onChange={(e) => {
                        const newBenefits = [...(localContent.whyJoin?.benefits || [])]
                        newBenefits[index] = {
                          ...benefit,
                          title: e.target.value
                        }
                        const newContent = {
                          ...localContent,
                          whyJoin: {
                            ...localContent.whyJoin,
                            benefits: newBenefits
                          }
                        }
                        handleContentChange(newContent)
                      }}
                      className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Benefit Description */}
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-400">Descrição</label>
                    <textarea
                      value={benefit.description}
                      onChange={(e) => {
                        const newBenefits = [...(localContent.whyJoin?.benefits || [])]
                        newBenefits[index] = {
                          ...benefit,
                          description: e.target.value
                        }
                        const newContent = {
                          ...localContent,
                          whyJoin: {
                            ...localContent.whyJoin,
                            benefits: newBenefits
                          }
                        }
                        handleContentChange(newContent)
                      }}
                      rows={3}
                      className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Remove Benefit Button */}
                  <button
                    onClick={() => {
                      const newBenefits = [...(localContent.whyJoin?.benefits || [])]
                      newBenefits.splice(index, 1)
                      const newContent = {
                        ...localContent,
                        whyJoin: {
                          ...localContent.whyJoin,
                          benefits: newBenefits
                        }
                      }
                      handleContentChange(newContent)
                    }}
                    className="w-full px-3 py-2 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Remover Benefício
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Título</label>
          <textarea
            value={localContent.title}
            onChange={(e) => {
              const newContent = {
                ...localContent,
                title: e.target.value
              }
              handleContentChange(newContent)
            }}
            className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Subtítulo</label>
          <textarea
            value={localContent.subtitle}
            onChange={(e) => {
              const newContent = {
                ...localContent,
                subtitle: e.target.value
              }
              handleContentChange(newContent)
            }}
            className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* CTA Text */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Texto do CTA</label>
          <input
            type="text"
            value={localContent.ctaText}
            onChange={(e) => {
              const newContent = {
                ...localContent,
                ctaText: e.target.value
              }
              handleContentChange(newContent)
            }}
            className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Alignment */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Alinhamento</label>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  alignment: 'left'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.alignment === 'left'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Esquerda
            </button>
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  alignment: 'center'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.alignment === 'center'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Centro
            </button>
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  alignment: 'right'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.alignment === 'right'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Direita
            </button>
          </div>
        </div>

        {/* Elements Alignment */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Alinhamento dos Elementos</label>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  elementsAlignment: 'left'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.elementsAlignment === 'left'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Esquerda
            </button>
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  elementsAlignment: 'center'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.elementsAlignment === 'center'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Centro
            </button>
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  elementsAlignment: 'right'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.elementsAlignment === 'right'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Direita
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Tags</label>
          <div className="space-y-2">
            {localContent.tags?.map((tag: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => {
                    const newTags = [...(localContent.tags || [])]
                    newTags[index] = e.target.value
                    const newContent = {
                      ...localContent,
                      tags: newTags
                    }
                    handleContentChange(newContent)
                  }}
                  className="flex-1 px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => {
                    const newTags = [...(localContent.tags || [])]
                    newTags.splice(index, 1)
                    const newContent = {
                      ...localContent,
                      tags: newTags
                    }
                    handleContentChange(newContent)
                  }}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newTags = [...(localContent.tags || []), "Nova Tag"]
                const newContent = {
                  ...localContent,
                  tags: newTags
                }
                handleContentChange(newContent)
              }}
              className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-gray-300 hover:text-white hover:border-blue-400 transition-colors"
            >
              + Adicionar Tag
            </button>
          </div>
        </div>

        {/* Title Size */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Tamanho do Título</label>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  titleSize: 'small'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.titleSize === 'small'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Pequeno
            </button>
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  titleSize: 'medium'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.titleSize === 'medium'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Médio
            </button>
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  titleSize: 'large'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.titleSize === 'large'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Grande
            </button>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Cor do Título</label>
          <input
            type="color"
            value={localContent.titleColor}
            onChange={(e) => {
              const newContent = {
                ...localContent,
                titleColor: e.target.value
              }
              handleContentChange(newContent)
            }}
            className="w-full h-10 bg-black/50 border border-blue-500/30 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Cor do Subtítulo</label>
          <input
            type="color"
            value={localContent.subtitleColor}
            onChange={(e) => {
              const newContent = {
                ...localContent,
                subtitleColor: e.target.value
              }
              handleContentChange(newContent)
            }}
            className="w-full h-10 bg-black/50 border border-blue-500/30 rounded-lg cursor-pointer"
          />
        </div>

        {/* CTA Style */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Estilo do CTA</label>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  ctaStyle: 'solid'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.ctaStyle === 'solid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Sólido
            </button>
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  ctaStyle: 'outline'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.ctaStyle === 'outline'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Contorno
            </button>
            <button
              onClick={() => {
                const newContent = {
                  ...localContent,
                  ctaStyle: 'gradient'
                }
                handleContentChange(newContent)
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                localContent.ctaStyle === 'gradient'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              Gradiente
            </button>
          </div>
        </div>

        {/* Oferta Especial */}
        <div className="space-y-4 p-4 bg-black/30 rounded-lg border border-blue-500/20">
          <label className="block text-sm font-medium text-gray-300">Oferta Especial</label>
          
          {/* Título da Oferta */}
          <div className="space-y-2">
            <label className="block text-xs text-gray-400">Título</label>
            <input
              type="text"
              value={localContent.offer?.title || ''}
              onChange={(e) => {
                const newContent = {
                  ...localContent,
                  offer: {
                    ...localContent.offer,
                    title: e.target.value
                  }
                }
                handleContentChange(newContent)
              }}
              className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Descrição da Oferta */}
          <div className="space-y-2">
            <label className="block text-xs text-gray-400">Descrição</label>
            <input
              type="text"
              value={localContent.offer?.description || ''}
              onChange={(e) => {
                const newContent = {
                  ...localContent,
                  offer: {
                    ...localContent.offer,
                    description: e.target.value
                  }
                }
                handleContentChange(newContent)
              }}
              className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Cards Flutuantes */}
        <div className="space-y-4 p-4 bg-black/30 rounded-lg border border-blue-500/20">
          <label className="block text-sm font-medium text-gray-300">Cards Flutuantes</label>
          <p className="text-xs text-gray-400 mb-4">Arraste os cards na tela para posicioná-los</p>
          
          <div className="space-y-4">
            {localContent.floatingCards?.map((card: any, index: number) => (
              <div key={index} className="space-y-2 p-3 bg-black/30 rounded-lg">
                {/* Código */}
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400">Código</label>
                  <input
                    type="text"
                    value={card.code}
                    onChange={(e) => {
                      const newCards = [...(localContent.floatingCards || [])]
                      newCards[index] = { ...card, code: e.target.value }
                      const newContent = {
                        ...localContent,
                        floatingCards: newCards
                      }
                      handleContentChange(newContent)
                    }}
                    className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Cor */}
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400">Cor</label>
                  <select
                    value={card.color}
                    onChange={(e) => {
                      const newCards = [...(localContent.floatingCards || [])]
                      newCards[index] = { ...card, color: e.target.value }
                      const newContent = {
                        ...localContent,
                        floatingCards: newCards
                      }
                      handleContentChange(newContent)
                    }}
                    className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="text-blue-400">Azul</option>
                    <option value="text-purple-400">Roxo</option>
                    <option value="text-pink-400">Rosa</option>
                    <option value="text-green-400">Verde</option>
                    <option value="text-yellow-400">Amarelo</option>
                  </select>
                </div>

                {/* Rotação */}
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400">Rotação (graus)</label>
                  <input
                    type="number"
                    value={card.rotation}
                    onChange={(e) => {
                      const newCards = [...(localContent.floatingCards || [])]
                      newCards[index] = { ...card, rotation: Number(e.target.value) }
                      const newContent = {
                        ...localContent,
                        floatingCards: newCards
                      }
                      handleContentChange(newContent)
                    }}
                    className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Botão Remover */}
                <button
                  onClick={() => {
                    const newCards = [...(localContent.floatingCards || [])]
                    newCards.splice(index, 1)
                    const newContent = {
                      ...localContent,
                      floatingCards: newCards
                    }
                    handleContentChange(newContent)
                  }}
                  className="w-full px-3 py-2 mt-2 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Remover Card
                </button>
              </div>
            ))}

            {/* Botão Adicionar */}
            <button
              onClick={() => {
                const newCards = [...(localContent.floatingCards || []), {
                  code: 'new.code()',
                  color: 'text-blue-400',
                  position: { x: 50, y: 50 },
                  rotation: 0
                }]
                const newContent = {
                  ...localContent,
                  floatingCards: newCards
                }
                handleContentChange(newContent)
              }}
              className="w-full px-3 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-gray-300 hover:text-white hover:border-blue-400 transition-colors"
            >
              + Adicionar Card
            </button>
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
