export default function Testimonials() {
  const testimonials = [
    {
      name: "Pedro Silva",
      role: "Desenvolvedor Frontend",
      content: "O curso transformou completamente minha forma de desenvolver. A didática é excelente e os projetos práticos são extremamente relevantes para o mercado atual.",
      image: "/avatars/dev1.png",
      company: "Nubank"
    },
    {
      name: "Ana Santos",
      role: "Full Stack Developer",
      content: "O melhor investimento que fiz na minha carreira. A combinação de Bolt.new com outras ferramentas modernas me permitiu criar aplicações complexas em tempo recorde.",
      image: "/avatars/dev2.png",
      company: "iFood"
    },
    {
      name: "Lucas Oliveira",
      role: "Tech Lead",
      content: "A qualidade do material e o suporte da comunidade são excepcionais. Consegui implementar os conhecimentos imediatamente no meu trabalho.",
      image: "/avatars/dev3.png",
      company: "Stone"
    }
  ];

  return (
    <section className="py-32 bg-black/40">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 gradient-text">
          O Que Dizem Nossos Alunos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="relative neon-border bg-black/50 backdrop-blur-sm p-8 rounded-xl hover:scale-105 transition duration-300"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <div className="w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold">
                      {testimonial.name[0]}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-gray-600 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-blue-400 mt-1">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block neon-border bg-black/50 backdrop-blur-sm px-8 py-4 rounded-xl">
            <p className="text-xl text-gray-300">
              <span className="text-blue-400 font-semibold">+1000</span> alunos já transformaram suas carreiras
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}