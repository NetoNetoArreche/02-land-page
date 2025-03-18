'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useTrackingEvents } from '@/hooks/useTrackingEvents'

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
  const { trackSectionView } = useTrackingEvents()

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
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 gradient-text">
          {faqData.title}
        </h2>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.items.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className="neon-border bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer touch-manipulation"
            >
              {/* Question */}
              <div className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-blue-500/10 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-white flex-1 pr-4">
                  {item.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-blue-400 transform transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Answer */}
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
                aria-hidden={openIndex !== index}
              >
                <p className="text-gray-400">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    </section>
  )
}
