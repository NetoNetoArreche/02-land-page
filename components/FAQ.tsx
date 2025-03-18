export default function FAQ() {
  const faqs = [
    {
      question: "Como funciona a comunidade no Circle?",
      answer: "Nossa comunidade no Circle é ativa 24/7, com canais específicos para dúvidas, networking, oportunidades de trabalho e eventos exclusivos. Você terá acesso a mentorias em grupo e poderá interagir diretamente com outros alunos e instrutores."
    },
    {
      question: "Quais são os pré-requisitos?",
      answer: "Conhecimento básico de HTML, CSS e JavaScript é recomendado. Não é necessária experiência prévia com Bolt.new."
    },
    {
      question: "Por quanto tempo tenho acesso ao curso?",
      answer: "Você tem acesso vitalício a todo o material do curso e 1 ano de acesso à comunidade Circle, incluindo atualizações futuras."
    },
    {
      question: "Existe garantia de reembolso?",
      answer: "Sim! Oferecemos garantia de reembolso de 30 dias se você não ficar satisfeito."
    },
    {
      question: "Recebo certificado após a conclusão?",
      answer: "Sim, você receberá um certificado de conclusão após finalizar o curso."
    }
  ];

  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 gradient-text">
          Perguntas Frequentes
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="neon-border bg-black/50 backdrop-blur-sm rounded-xl p-8 hover:scale-[1.02] transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">
                {faq.question}
              </h3>
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}