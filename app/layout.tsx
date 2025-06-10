import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MetaPixelStatus from '@/components/MetaPixelStatus'
import MetaPixelScript from '@/components/MetaPixelScript'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://nocode.design'),
  title: 'Comunidade IACode',
  description: 'Aprenda a criar sites profissionais sem código',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Comunidade IACode - Aprenda a criar sites profissionais sem código" />
        {/* Meta Pixel será carregado via componente React */}
      </head>
      <body className={`${inter.className} bg-black min-h-screen relative`}>
        {/* Carrega o Meta Pixel via componente React */}
        <MetaPixelScript />
        
        <div className="fixed bottom-4 right-4">
          <MetaPixelStatus />
        </div>
        <div className="w-full text-center py-4 text-xs text-gray-500">
          CNPJ: 42.242.938/0001-68
        </div>
        {children}
      </body>
    </html>
  )
}