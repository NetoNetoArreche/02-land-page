import Link from 'next/link';

export default function Pricing() {
  const features = [
    "Acesso completo ao curso",
    "Templates profissionais de projetos",
    "Mentoria 1-on-1 semanal",
    "Suporte prioritário",
    "Atualizações e suporte por 1 ano",
    "Créditos para cloud",
    "Acesso ao Circle privado",
    "Eventos exclusivos na comunidade",
    "Networking com outros devs",
    "Revisão de código personalizada",
    "Certificado de conclusão",
    "Orientação para carreira"
  ];

  return (
    <section id="pricing" className="py-32 bg-black/40">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 gradient-text">
          Invista no Seu Futuro
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="neon-border bg-black/50 backdrop-blur-sm rounded-2xl p-8">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                Oferta por Tempo Limitado
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mt-6 text-white">Plano Completo</h3>
              <div className="mt-4">
                <p className="text-6xl font-bold gradient-text">
                  R$497
                  <span className="text-lg text-gray-500 font-normal">/ano</span>
                </p>
                <p className="text-gray-400 mt-2">Pagamento único</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="#"
              className="mt-10 block text-center py-4 px-8 rounded-xl font-semibold transition duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
            >
              Começar Agora
            </Link>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Garantia incondicional de 30 dias ou seu dinheiro de volta
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            {[
              { icon: "🔒", text: "Pagamento Seguro" },
              { icon: "⚡", text: "Acesso Imediato" },
              { icon: "💳", text: "Parcelamento em 12x" }
            ].map((item, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}