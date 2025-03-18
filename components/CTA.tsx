import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-blue-900/20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-8 gradient-text">
          Pronto para Começar sua Jornada?
        </h2>
        <p className="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
          Junte-se a milhares de desenvolvedores que já transformaram suas carreiras com Bolt.new
        </p>
        <Link
          href="#pricing"
          className="neon-border bg-black/50 backdrop-blur-sm text-white px-12 py-5 rounded-xl font-semibold text-xl hover:scale-105 transition duration-300 inline-block"
        >
          Matricular Agora
        </Link>
        <p className="mt-10 text-gray-400">
          Garantia de 30 dias • Acesso vitalício • Atualizações regulares
        </p>
      </div>
    </section>
  );
}