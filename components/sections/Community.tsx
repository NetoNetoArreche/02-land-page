'use client'

export default function Community() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
            A maior comunidade de desenvolvimento com IA do mundo!
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            Quanto mais a comunidade crescer, mais benefícios para você. Queremos reunir desenvolvedores e programadores para oferecer suporte de qualidade, mas, para isso, precisamos da sua ajuda para crescer.
          </p>

          <h3 className="mt-10 text-2xl md:text-3xl font-bold text-blue-400">Comunidade criada com ferramentas de IAcode.</h3>

          <div className="flex justify-center items-center gap-16 mt-8 mb-20 flex-wrap">
            <img src="/bolt-logo.svg" alt="Bolt.new" className="h-16 w-auto drop-shadow-lg" />
            <img src="/supabase.png" alt="Supabase" className="h-16 w-auto drop-shadow-lg rounded-lg bg-black" />
            <img src="/lovable.png" alt="Lovable" className="h-16 w-auto drop-shadow-lg rounded-lg bg-black" />
          </div>

          <div className="relative w-screen left-1/2 -translate-x-1/2 px-12 xl:px-40">
            <div className="relative w-full">
              <img 
                src="/motivacional-header.png" 
                alt="Comunidade IAcode - Motivacional"
                className="w-full rounded-xl border-2 border-blue-400 shadow-[0_0_32px_4px_rgba(59,130,246,0.5)] bg-black/30 align-bottom mb-0 pb-0"
                style={{ marginBottom: 0, display: 'block', paddingBottom: 0 }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-blue-500/80 shadow-[0_0_32px_8px_rgba(59,130,246,0.4)]" />
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500/70 to-transparent rounded-b-xl mt-0" style={{marginTop: 0}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
