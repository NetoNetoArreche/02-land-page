'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function MetaPixelScript() {
  const pixelId = '1848788082579760'
  
  useEffect(() => {
    // Limpa qualquer inicialização anterior
    if (typeof window !== 'undefined') {
      // Remove scripts duplicados
      const existingScripts = document.querySelectorAll('script[src*="fbevents.js"]')
      if (existingScripts.length > 1) {
        existingScripts.forEach((script, index) => {
          if (index > 0) script.remove()
        })
      }
    }
  }, [])
  
  return (
    <>
      <Script
        id="facebook-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Verifica se já existe uma instância do pixel
            if (typeof window.fbq === 'undefined') {
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            }
            
            // Só inicializa se não foi inicializado ainda
            if (!window.fbPixelInitialized) {
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
              window.fbPixelInitialized = true;
            }
          `
        }}
      />
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
