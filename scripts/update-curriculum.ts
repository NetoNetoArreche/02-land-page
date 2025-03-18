import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key são necessários')
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateCurriculum() {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Erro ao buscar conteúdo:', error)
    return
  }

  // Atualiza a seção de Comunidade & Suporte
  const updatedContent = {
    ...data,
    curriculum: {
      ...data.curriculum,
      sections: data.curriculum.sections.map((section: any) => {
        if (section.title === "Comunidade & Suporte") {
          return {
            ...section,
            items: [
              "Circle Exclusivo",
              "Eventos ao Vivo",
              "Networking"
            ]
          }
        }
        return section
      })
    }
  }

  const { error: updateError } = await supabase
    .from('site_content')
    .update(updatedContent)
    .eq('id', 1)

  if (updateError) {
    console.error('Erro ao atualizar conteúdo:', updateError)
    return
  }

  console.log('Currículo atualizado com sucesso!')
}

updateCurriculum()
