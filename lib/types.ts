export interface SiteContent {
  hero: {
    title: string
    subtitle: string
    ctaText: string
  }
  benefits: {
    title: string
    items: {
      icon: string
      title: string
      description: string
    }[]
  }
  tools: {
    title: string
    items: {
      name: string
      logo: string
      description: string
    }[]
  }
  curriculum: {
    title: string
    sections: {
      title: string
      items: string[]
    }[]
  }
  projects: {
    title: string
    items: {
      title: string
      description: string
      image: string
      tech: string[]
    }[]
  }
  testimonials: {
    title: string
    items: {
      name: string
      photo: string
      text: string
      role: string
    }[]
  }
  pricing: {
    title: string
    plans: {
      name: string
      price: number
      features: string[]
      ctaText: string
    }[]
  }
  faq: {
    title: string
    items: {
      question: string
      answer: string
    }[]
  }
  finalCta: {
    title: string
    benefits: string[]
    ctaText: string
  }
}
