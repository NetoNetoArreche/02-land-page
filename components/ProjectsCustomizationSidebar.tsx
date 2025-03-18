'use client'

import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { createClient } from '@/lib/supabase-browser'
import { useAuth } from '@/hooks/useAuth'

interface ProjectsCustomizationSidebarProps {
  isOpen: boolean
  onClose: () => void
  content: any
  onPreview: (content: any) => void
  onSave: () => Promise<void>
}

export default function ProjectsCustomizationSidebar({
  isOpen,
  onClose,
  content,
  onPreview,
  onSave
}: ProjectsCustomizationSidebarProps) {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const [editingContent, setEditingContent] = useState(content)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Atualiza o conteúdo local quando o conteúdo pai muda
  useEffect(() => {
    setEditingContent(content)
  }, [content])

  const handleChange = (field: string, value: any, projectIndex?: number) => {
    let newContent = { ...editingContent }
    
    if (typeof projectIndex === 'number') {
      // Editando um projeto específico
      newContent.items = [...editingContent.items]
      newContent.items[projectIndex] = {
        ...editingContent.items[projectIndex],
        [field]: value
      }
    } else {
      // Editando o título principal
      newContent = {
        ...editingContent,
        [field]: value
      }
    }

    setEditingContent(newContent)
    onPreview(newContent)
  }

  const handleSaveChanges = async () => {
    try {
      setLoading(true)
      await onSave()
      onClose()
    } catch (error) {
      console.error('Erro ao salvar:', error)
      setUploadError('Erro ao salvar as alterações')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (projectIndex: number, file: File) => {
    try {
      // Verificar autenticação
      if (!session) {
        console.error('Sem sessão:', session)
        setUploadError('Você precisa estar autenticado para fazer upload de imagens')
        return
      }

      // Verificar tamanho do arquivo (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('A imagem deve ter no máximo 5MB')
        return
      }

      setLoading(true)
      setUploadError(null)
      console.log('Iniciando upload da imagem...')
      console.log('Usuário autenticado:', session.user.email)
      
      const supabase = createClient()
      
      // Upload da imagem
      const fileName = `project-${projectIndex}-${Date.now()}-${file.name}`
      console.log('Fazendo upload para:', fileName)
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('projects')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Erro no upload:', uploadError)
        setUploadError('Erro ao fazer upload da imagem: ' + uploadError.message)
        return
      }

      console.log('Upload bem sucedido:', uploadData)

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(fileName)

      console.log('URL pública gerada:', publicUrl)

      // Atualizar URL no conteúdo
      handleChange('image', publicUrl, projectIndex)
    } catch (error: any) {
      console.error('Erro detalhado ao fazer upload:', error)
      setUploadError(error?.message || 'Erro ao fazer upload da imagem')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTech = (projectIndex: number) => {
    const newContent = { ...editingContent }
    newContent.items[projectIndex].tech.push('Nova Tecnologia')
    handleChange('tech', newContent.items[projectIndex].tech, projectIndex)
  }

  const handleAddProject = () => {
    const newContent = { ...editingContent }
    const newProject = {
      title: "Novo Projeto",
      description: "Descrição do novo projeto",
      image: "/projects/default.jpg",
      tech: ["Tecnologia 1"],
      isRecording: false
    }
    newContent.items = [...newContent.items, newProject]
    setEditingContent(newContent)
    onPreview(newContent)
  }

  const handleDeleteProject = (projectIndex: number) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      const newContent = { ...editingContent }
      newContent.items = newContent.items.filter((_, index) => index !== projectIndex)
      setEditingContent(newContent)
      onPreview(newContent)
    }
  }

  const handleRemoveTech = (projectIndex: number, techIndex: number) => {
    const newContent = { ...editingContent }
    newContent.items[projectIndex].tech.splice(techIndex, 1)
    handleChange('tech', newContent.items[projectIndex].tech, projectIndex)
  }

  if (!editingContent) return null

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-black/90 backdrop-blur-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold text-white">Customizar Projetos</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={loading}
              >
                <IoClose size={24} />
              </button>
            </div>

            {uploadError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm break-words">
                {uploadError}
              </div>
            )}

            {/* Título Principal */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Título da Seção
              </label>
              <input
                type="text"
                value={editingContent.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full bg-white/5 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
                disabled={loading}
              />
            </div>

            {/* Lista de Projetos */}
            {editingContent.items?.map((project: any, index: number) => (
              <div key={index} className="mb-8 pb-8 border-b border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">
                    Projeto {index + 1}
                  </h4>
                  <button
                    onClick={() => handleDeleteProject(index)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-500/10"
                    disabled={loading}
                    title="Excluir projeto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Título do Projeto */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={project.title || ''}
                    onChange={(e) => handleChange('title', e.target.value, index)}
                    className="w-full bg-white/5 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
                    disabled={loading}
                  />
                </div>

                {/* Descrição */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={project.description || ''}
                    onChange={(e) => handleChange('description', e.target.value, index)}
                    className="w-full bg-white/5 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
                    rows={3}
                    disabled={loading}
                  />
                </div>

                {/* Tag de Gravação */}
                <div className="mb-4">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                    <input
                      type="checkbox"
                      checked={project.isRecording || false}
                      onChange={(e) => handleChange('isRecording', e.target.checked, index)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      disabled={loading}
                    />
                    <span>Em Gravação</span>
                  </label>
                </div>

                {/* Imagem */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Imagem
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        console.log('Arquivo selecionado:', file.name, 'Tamanho:', file.size)
                        handleImageUpload(index, file)
                      }
                    }}
                    className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-white/10 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10"
                    disabled={loading}
                  />
                  {project.image && (
                    <div className="mt-2">
                      <div className="text-sm text-gray-400 mb-2 break-words">
                        Imagem atual: {project.image}
                      </div>
                      <img 
                        src={project.image} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg border border-white/10"
                      />
                    </div>
                  )}
                </div>

                {/* Tecnologias */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tecnologias
                  </label>
                  <div className="space-y-2">
                    {project.tech?.map((tech: string, techIndex: number) => (
                      <div key={techIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tech || ''}
                          onChange={(e) => {
                            const newTech = [...project.tech]
                            newTech[techIndex] = e.target.value
                            handleChange('tech', newTech, index)
                          }}
                          className="flex-1 bg-white/5 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none border border-white/10 min-w-0"
                          disabled={loading}
                        />
                        <button
                          onClick={() => handleRemoveTech(index, techIndex)}
                          className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                          disabled={loading}
                        >
                          <IoClose size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleAddTech(index)}
                    className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    disabled={loading}
                  >
                    + Adicionar Tecnologia
                  </button>
                </div>
              </div>
            ))}

            {/* Botão Adicionar Novo Projeto */}
            <button
              onClick={handleAddProject}
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Adicionar Novo Projeto
            </button>

          </div>
        </div>

        {/* Botão Salvar */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  )
}
