-- Criar o bucket 'tools' se não existir
insert into storage.buckets (id, name, public)
values ('tools', 'tools', true)
on conflict (id) do nothing;

-- Política para permitir leitura pública
create policy "Permitir acesso público de leitura"
on storage.objects for select
using ( bucket_id = 'tools' );

-- Política para permitir upload por usuários autenticados
create policy "Permitir upload por usuários autenticados"
on storage.objects for insert
with check ( bucket_id = 'tools' AND auth.role() = 'authenticated' );

-- Política para permitir atualização por usuários autenticados
create policy "Permitir atualização por usuários autenticados"
on storage.objects for update
using ( bucket_id = 'tools' AND auth.role() = 'authenticated' );

-- Política para permitir deleção por usuários autenticados
create policy "Permitir deleção por usuários autenticados"
on storage.objects for delete
using ( bucket_id = 'tools' AND auth.role() = 'authenticated' );

-- Habilitar RLS na tabela de objetos
alter table storage.objects enable row level security;
