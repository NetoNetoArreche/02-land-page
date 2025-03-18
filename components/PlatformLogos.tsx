import Image from 'next/image';

export default function PlatformLogos() {
  const platforms = [
    {
      name: "Bolt.new",
      logo: "/bolt-logo.svg",
      description: "Desenvolvimento web em tempo real"
    },
    {
      name: "Windsurf Editor",
      logo: "/windsurf-logo.svg",
      description: "Editor de código inteligente"
    },
    {
      name: "Cursor",
      logo: "/cursor-logo.svg",
      description: "IDE com IA integrada"
    }
  ];

  return (
    <section className="py-20 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {platforms.map((platform) => (
            <div 
              key={platform.name}
              className="flex flex-col items-center text-center p-6 neon-border bg-black/50 backdrop-blur-sm rounded-xl hover:scale-105 transition duration-300"
            >
              <div className="w-24 h-24 relative mb-4">
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {platform.name}
              </h3>
              <p className="text-gray-400">
                {platform.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}