import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import MetaPixelStatus from '@/components/MetaPixelStatus'

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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1848788082579760');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1848788082579760&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${inter.className} bg-black min-h-screen relative`}>
        {children}
        <div className="fixed bottom-4 right-4">
          <MetaPixelStatus />
        </div>
        <div className="w-full text-center py-4 text-xs text-gray-500">
          CNPJ: 42.242.938/0001-68
        </div>
      </body>
    </html>
  )
}