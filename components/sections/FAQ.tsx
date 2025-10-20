'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase-browser'
import { useTrackingEvents } from '@/hooks/useTrackingEvents'
import { useAuth } from '@/hooks/useAuth'
import FAQCustomizationSidebar from '@/components/FAQCustomizationSidebar'

interface FAQData {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
}

const supabase = createClient()

export default function FAQ() {
  const [faqData, setFaqData] = useState<FAQData | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const { trackSectionView } = useTrackingEvents()
  const { isAdmin } = useAuth()

  useEffect(() => {
    trackSectionView('FAQ')
  }, [])

  useEffect(() => {
    const fetchFAQ = async () => {
      const { data: siteContent, error } = await supabase
        .from('site_content')
        .select('faq')
        .single();

      if (error) {
        console.error('Error fetching FAQ:', error);
        return;
      }

      if (siteContent?.faq) {
        setFaqData(siteContent.faq);
      }
    };

    fetchFAQ();
  }, []);

  if (!faqData) return null;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-6 py-2 mb-6"
          >
            <span className="text-blue-400 font-semibold text-sm">❓ FAQ</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {faqData.title}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Tire suas dúvidas mais frequentes sobre nossa plataforma
          </p>
        </motion.div>

        {/* FAQ Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {faqData.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl">
                  
                  {/* Question Button */}
                  <motion.button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors duration-300"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white pr-4">
                        {item.question}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6">
                          <div className="pl-12 border-l-2 border-blue-500/30">
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="text-slate-300 leading-relaxed"
                            >
                              {item.answer}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl border border-blue-500/20 p-8 sm:p-12">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para te ajudar! Entre em contato conosco e tire todas as suas dúvidas.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/5511988207977?text=Olá! Tenho algumas dúvidas sobre a Comunidade Vibe Coding.', '_blank')}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              💬 Falar com Suporte
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Botão de Edição - Apenas para Admin */}
      {isAdmin && (
        <button
          onClick={() => setIsCustomizing(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
          title="Editar FAQ"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}

      {/* Sidebar de Customização - Apenas para Admin */}
      {isAdmin && (
        <FAQCustomizationSidebar
          isOpen={isCustomizing}
          onClose={() => {
            setIsCustomizing(false);
            // Recarregar dados após fechar o sidebar
            const fetchFAQ = async () => {
              const { data: siteContent, error } = await supabase
                .from('site_content')
                .select('faq')
                .single();

              if (error) {
                console.error('Error fetching FAQ:', error);
                return;
              }

              if (siteContent?.faq) {
                setFaqData(siteContent.faq);
              }
            };
            fetchFAQ();
          }}
        />
      )}
    </section>
  )
}
