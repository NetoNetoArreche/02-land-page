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
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="h-px mt-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    </section>
  )
}
