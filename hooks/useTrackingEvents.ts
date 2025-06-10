'use client'

import { useEffect, useRef } from 'react'

export function useTrackingEvents() {
  // Mantém uma referência vazia apenas para compatibilidade com código existente
  const firedEvents = useRef<Set<string>>(new Set())

  // Função simplificada que não faz nada além de manter compatibilidade
  const trackSectionView = (section: string) => {
    // Não faz nada - removido rastreamento de eventos
    console.log(`Rastreamento desativado para seção: ${section}`)
  }

  // Não adiciona nenhum listener de eventos
  // O PageView é disparado automaticamente pelo Meta Pixel na inicialização

  return { trackSectionView }
}
