'use client'

import Image from 'next/image'
import { useRealtimeContent } from '@/hooks/useRealtimeContent'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase-browser'
import EditableSection from '../EditableSection'

const defaultTestimonials = {
  title: "O Que Nossos Alunos Estão Dizendo",
  items: [
    {
      name: "João Silva",
      photo: "https://avatars.githubusercontent.com/u/1?v=4",
      text: "Cara quando vi seus vídeos no YouTube fique louco, pois estava criando um app no Bubble, mas depois que conheci o Bolt.new tudo mudou. é incrível!",
      role: "Designer UI/UX"
    },
    {
      name: "Marcos Pedro",
      photo: "https://avatars.githubusercontent.com/u/2?v=4",
      text: "Comprei hoje e só de olhar as aulas e os vídeos no YouTube, ja valeu o investimento! Estou criando meu aplicativo Delivery",
      role: "Motoboy"
    },
    {
      name: "Pedro Costa",
      photo: "https://avatars.githubusercontent.com/u/3?v=4",
      text: "Não tem como ficar aprendendo FlutterFlow depois de ver essas ferramentas. Primeiro curso de Bolt.new e Windsurf do mundo! Parabéns!",
      role: "Desenvolvedor No-Code"
    },
    {
      name: "Carlos Eduardo",
      photo: "https://avatars.githubusercontent.com/u/4?v=4",
      text: "Estava ficando doido com uma ideia de aplicativo e não sabia como fazer, depois que vi essas ferramentas.. se é doido agora vai!!",
      role: "Logista"
    },
    {
      name: "Lucas Mendes",
      photo: "https://avatars.githubusercontent.com/u/5?v=4",
      text: "Na primeira aula já aprendi mais sobre no-code do que em vários tutoriais que vi antes. Conteúdo direto e prático!",
      role: "Freelancer No-Code"
    },
    {
      name: "Marcos Pereira",
      photo: "https://avatars.githubusercontent.com/u/6?v=4",
      text: "Conheci essas ferramentas e fiquei impressionado. Só com os seus vídeos do YouTube aprendi de mais e quero fazer parte dessa Comunidade",
      role: "Comerciante"
    }
  ]
}

export default function Testimonials() {
  const { content } = useRealtimeContent()
  const { isAdmin } = useAuth()

  const handleSave = async (path: string, value: string) => {
    if (!content) return

    try {
      const supabase = createClient()
      const [section, index, field] = path.split('.')
      
      let newContent: any = { ...content }
      
      if (index) {
        newContent[section].items = [...content[section].items]
        newContent[section].items[parseInt(index)][field] = value
      } else {
        newContent[section] = {
          ...content[section],
          [field]: value
        }
      }

      const { error } = await supabase
        .from('site_content')
        .update(newContent)
        .eq('id', content.id)

      if (error) throw error
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const testimonials = content?.testimonials || defaultTestimonials

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
      {/* Efeito de Gradiente de Fundo */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Título da Seção */}
        <div className="flex flex-col items-center gap-4 mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center gradient-text">
            {testimonials.title}
          </h2>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Aspas Decorativas */}
              <div className="absolute -top-3 -left-2 text-5xl text-blue-500/10 font-serif">"</div>
              
              {/* Conteúdo do Depoimento */}
              <div className="relative">
                {/* Avatar e Informações */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                    <div className="absolute inset-[2px] bg-gray-900 rounded-full" />
                    <div className="absolute inset-[3px] rounded-full overflow-hidden">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div>
                    {isAdmin ? (
                      <EditableSection
                        path={`testimonials.${index}.name`}
                        content={testimonial.name}
                        onSave={handleSave}
                        className="text-lg font-semibold text-white"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </h3>
                    )}
                    
                    {isAdmin ? (
                      <EditableSection
                        path={`testimonials.${index}.role`}
                        content={testimonial.role}
                        onSave={handleSave}
                        className="text-sm text-blue-400"
                      />
                    ) : (
                      <p className="text-sm text-blue-400">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>

                {/* Texto do Depoimento */}
                {isAdmin ? (
                  <EditableSection
                    path={`testimonials.${index}.text`}
                    content={testimonial.text}
                    onSave={handleSave}
                    className="text-gray-300 leading-relaxed"
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">
                    {testimonial.text}
                  </p>
                )}
              </div>

              {/* Efeito de Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </section>
  )
}
