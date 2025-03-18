import Image from 'next/image';

export default function Instructor() {
  return (
    <section className="py-32 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="neon-border bg-black/50 backdrop-blur-sm rounded-2xl p-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 relative flex-shrink-0">
                <div className="w-full h-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                  <Image
                    src="/instructor.jpg"
                    alt="João Silva"
                    width={192}
                    height={192}
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-4xl font-bold mb-4 gradient-text">
                  Conheça Seu Instrutor
                </h2>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  João Silva
                </h3>
                <p className="text-blue-400 mb-6">
                  Senior Software Engineer & Tech Lead
                </p>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Com mais de 10 anos de experiência em desenvolvimento web, João já liderou equipes em grandes empresas como Google, Microsoft e startups de sucesso.
                  </p>
                  <p>
                    Especialista em arquitetura de software e desenvolvimento full-stack, ele combina conhecimento técnico profundo com uma didática clara e objetiva.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { label: "Projetos Entregues", value: "200+" },
                    { label: "Alunos Mentorados", value: "1.5k+" },
                    { label: "Anos de Experiência", value: "10+" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold gradient-text">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}