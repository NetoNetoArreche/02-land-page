'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  items: FAQItem[];
}

interface FAQCustomizationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const supabase = createClient()

export default function FAQCustomizationSidebar({ isOpen, onClose }: FAQCustomizationSidebarProps) {
  const [editingContent, setEditingContent] = useState<FAQData>({
    title: '',
    items: []
  });
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchContent();
    }
  }, [isOpen]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('faq')
        .single();

      if (error) throw error;

      if (data?.faq) {
        setEditingContent(data.faq);
      }
    } catch (error) {
      console.error('Erro ao buscar FAQ:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setEditingContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index: number, field: 'question' | 'answer', value: string) => {
    setEditingContent(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addNewItem = () => {
    setEditingContent(prev => ({
      ...prev,
      items: [...prev.items, { question: '', answer: '' }]
    }));
  };

  const removeItem = (index: number) => {
    setEditingContent(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('site_content')
        .update({ faq: editingContent })
        .eq('id', 1);

      if (error) throw error;

      alert('FAQ atualizado com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao salvar FAQ:', error);
      alert('Erro ao salvar FAQ');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="relative ml-auto w-full max-w-2xl bg-slate-900 shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Editar FAQ</h2>
              <p className="text-slate-400">Personalize as perguntas e respostas</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {previewMode ? 'Editar' : 'Preview'}
              </button>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!previewMode ? (
            <div className="space-y-8">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título da Seção
                </label>
                <input
                  type="text"
                  value={editingContent.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full bg-white/5 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
                  placeholder="Digite o título da seção..."
                  disabled={loading}
                />
              </div>

              {/* Items do FAQ */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Perguntas e Respostas
                  </label>
                  <button
                    onClick={addNewItem}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    + Adicionar Item
                  </button>
                </div>

                <div className="space-y-6">
                  {editingContent.items.map((item, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-medium">Item {index + 1}</h4>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Pergunta
                          </label>
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) => handleItemChange(index, 'question', e.target.value)}
                            className="w-full bg-white/5 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
                            placeholder="Digite a pergunta..."
                            disabled={loading}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Resposta
                          </label>
                          <textarea
                            value={item.answer}
                            onChange={(e) => handleItemChange(index, 'answer', e.target.value)}
                            className="w-full bg-white/5 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
                            rows={3}
                            placeholder="Digite a resposta..."
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-4 pt-6 border-t border-slate-700">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
              
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  {editingContent.title}
                </h2>
                
                <div className="space-y-4">
                  {editingContent.items.map((item, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <h4 className="text-white font-semibold">{item.question}</h4>
                      </div>
                      <p className="text-slate-300 pl-9">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
