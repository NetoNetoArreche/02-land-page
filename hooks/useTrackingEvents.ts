'use client'

import { useEffect, useRef } from 'react'

export function useTrackingEvents() {
  const firedEvents = useRef<Set<string>>(new Set())

  const trackSectionView = (section: string) => {
    const eventName = `View${section}`
    if (!firedEvents.current.has(eventName)) {
      // Removido evento do Facebook
      firedEvents.current.add(eventName)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const winHeight = window.innerHeight
        const docHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100

        if (scrollPercent >= 25 && !firedEvents.current.has('ScrollDepth25')) {
          firedEvents.current.add('ScrollDepth25')
          console.log('ScrollDepth25 registrado')
        }
        if (scrollPercent >= 50 && !firedEvents.current.has('ScrollDepth50')) {
          firedEvents.current.add('ScrollDepth50')
          console.log('ScrollDepth50 registrado')
        }
        if (scrollPercent >= 75 && !firedEvents.current.has('ScrollDepth75')) {
          firedEvents.current.add('ScrollDepth75')
          console.log('ScrollDepth75 registrado')
        }
      })
    }

    // Time on page tracking
    const timeoutId = setTimeout(() => {
      if (!firedEvents.current.has('TimeOnPage30')) {
        firedEvents.current.add('TimeOnPage30')
        console.log('TimeOnPage30 registrado')
      }
    }, 30000)

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  return { trackSectionView }
}
