-- Habilitar extensão pgcrypto se não estiver habilitada
create extension if not exists pgcrypto;

-- Remover tabela se existir
drop table if exists site_content;

-- Criar tabela de conteúdo do site
create table if not exists site_content (
  id bigint primary key,
  hero jsonb default '{}'::jsonb,
  benefits jsonb default '{
    "title": "Por que fazer parte da Comunidade IAcode?",
    "items": [
      {
        "icon": "🌟",
        "title": "Aprendizado Prático",
        "description": "Criação de plataformas e sites completos com projetos reais."
      },
      {
        "icon": "🚀",
        "title": "Ferramentas Inovadoras",
        "description": "Bolt.new, Framer, Cursor AI e muito mais."
      },
      {
        "icon": "🤝",
        "title": "Suporte Exclusivo",
        "description": "Acesso à comunidade no Circle e code reviews."
      },
      {
        "icon": "🎓",
        "title": "Desenvolvimento Pessoal",
        "description": "Networking com profissionais e eventos ao vivo."
      }
    ]
  }'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Inserir conteúdo inicial se não existir
insert into site_content (id)
values (1)
on conflict (id) do nothing;

-- Habilitar RLS
alter table site_content enable row level security;

-- Política para leitura pública do conteúdo do site
create policy "Conteúdo do site é público"
on site_content for select
using (true);

-- Política para atualização do conteúdo por usuários autenticados
create policy "Usuários autenticados podem atualizar conteúdo"
on site_content for update
using (auth.role() = 'authenticated');

-- Política para inserção do conteúdo por usuários autenticados
create policy "Usuários autenticados podem inserir conteúdo"
on site_content for insert
with check (auth.role() = 'authenticated');

-- Criar bucket para logos se não existir
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

-- Permitir acesso público para visualizar arquivos
create policy "Logos são publicamente acessíveis"
on storage.objects for select
using ( bucket_id = 'logos' );

-- Permitir upload de arquivos para usuários autenticados
create policy "Usuários autenticados podem fazer upload de logos"
on storage.objects for insert
with check (
    bucket_id = 'logos'
    and auth.role() = 'authenticated'
);

-- Permitir atualização de arquivos para usuários autenticados
create policy "Usuários autenticados podem atualizar logos"
on storage.objects for update
with check (
    bucket_id = 'logos'
    and auth.role() = 'authenticated'
);

-- Permitir deleção de arquivos para usuários autenticados
create policy "Usuários autenticados podem deletar logos"
on storage.objects for delete
using (
    bucket_id = 'logos'
    and auth.role() = 'authenticated'
);
