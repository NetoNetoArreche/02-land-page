'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function MetaPixelScript() {
  // Usamos um ID único para evitar duplicação
  const pixelId = '1848788082579760'
  
  // Função para limpar qualquer instância anterior do pixel
  useEffect(() => {
    // Limpa qualquer inicialização anterior do pixel
    if (typeof window !== 'undefined') {
      // Remove os scripts do Facebook Pixel
      const scripts = document.querySelectorAll('script[src*="facebook"]')
      scripts.forEach(script => {
        if (script.id !== 'facebook-pixel-script') {
          script.remove()
        }
      })
      
      // Limpa as funções do pixel
      if (window.fbq) {
        console.log('Removendo instância anterior do Meta Pixel')
        // @ts-ignore
        delete window.fbq
        // @ts-ignore
        delete window._fbq
      }
    }
  }, [])
  
  // Função que será executada quando o script for carregado
  const onLoad = () => {
    console.log('Script do Meta Pixel carregado com sucesso')
  }

  return (
    <>
      {/* Carrega o script do Meta Pixel usando o componente Script do Next.js */}
      <Script
        id="facebook-pixel-script"
        strategy="afterInteractive"
        onLoad={onLoad}
      >
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
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
