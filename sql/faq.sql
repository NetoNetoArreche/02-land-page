-- Atualiza o conteúdo do FAQ dentro do campo content na tabela site_content
UPDATE site_content
SET content = jsonb_set(
  COALESCE(content, '{}'::jsonb),
  '{faq}',
  jsonb_build_object(
    'title', 'Dúvidas? Nós Respondemos',
    'items', jsonb_build_array(
      jsonb_build_object(
        'question', 'Preciso saber programar?',
        'answer', 'Não! O curso é focado em ferramentas no-code e low-code, ideal para iniciantes.'
      ),
      jsonb_build_object(
        'question', 'Quanto tempo tenho acesso?',
        'answer', 'Você tem acesso por um ano completo ao curso e à comunidade, com a oportunidade de renovar.'
      ),
      jsonb_build_object(
        'question', 'Tem certificado?',
        'answer', 'Não! Mas em breve teremos'
      ),
      jsonb_build_object(
        'question', 'Como funciona o suporte?',
        'answer', 'Temos um Circle exclusivo com suporte da comunidade e mentores.'
      )
    )
  )
)
WHERE id = 1;
