import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wqwhpbmfgtgievdifrbu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxd2hwYm1mZ3RnaWV2ZGlmcmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MTk2MjksImV4cCI6MjA0NzM5NTYyOX0.V3lUcKL5FczQjFGD5H6C9bJhPglBWmuCLbpoYI1IyME'

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
      sections: data.curriculum.sections.map((section) => {
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
