-- Create the site_content table
create table public.site_content (
  id bigint primary key generated always as identity,
  hero jsonb not null default '{
    "title": "Desenvolva o Futuro com Tecnologia de Ponta",
    "subtitle": "Domine o desenvolvimento moderno",
    "ctaText": "Garantir Minha Vaga"
  }',
  benefits jsonb not null default '{
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
  }',
  tools jsonb not null default '[]',
  features jsonb not null default '[]',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.site_content enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.site_content
  for select using (true);

create policy "Enable insert for authenticated users only" on public.site_content
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.site_content
  for update using (auth.role() = 'authenticated');

-- Create initial content
insert into public.site_content (hero, tools, features)
values (
  '{
    "title": "Desenvolva o Futuro com Tecnologia de Ponta",
    "subtitle": "Domine o desenvolvimento moderno",
    "ctaText": "Garantir Minha Vaga"
  }',
  '[
    {"name": "Bolt.new", "logo": "/tools/bolt.svg"},
    {"name": "Windsurf Editor", "logo": "/tools/windsurf.svg"},
    {"name": "Cursor AI", "logo": "/tools/cursor.svg"},
    {"name": "GPTEngineers", "logo": "/tools/gpt.svg"},
    {"name": "Framer", "logo": "/tools/framer.svg"}
  ]',
  '[
    {
      "title": "Domínio Completo das Ferramentas",
      "description": "Domine as ferramentas mais modernas de desenvolvimento",
      "icon": "🛠️"
    },
    {
      "title": "Desenvolvimento Full-Stack",
      "description": "Construa aplicações completas com bancos de dados modernos",
      "icon": "⚡"
    },
    {
      "title": "Comunidade Ativa",
      "description": "Conecte-se com outros devs e receba ajuda em tempo real",
      "icon": "💬"
    }
  ]'
);
