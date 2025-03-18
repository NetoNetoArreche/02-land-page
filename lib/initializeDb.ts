import { createClient } from '@/lib/supabase-browser'
import { initialContent } from './initialData'

export async function initializeDatabase() {
  const supabase = createClient()

  // Verifica se já existe conteúdo
  const { data: existingContent } = await supabase
    .from('site_content')
    .select('*')
    .limit(1)

  if (!existingContent?.length) {
    // Se não existir conteúdo, insere o conteúdo inicial
    const { error } = await supabase
      .from('site_content')
      .insert([initialContent])

    if (error) {
      console.error('Erro ao inicializar o banco de dados:', error)
      return false
    }
  }

  return true
}
