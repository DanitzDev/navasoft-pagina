import type { LucideIcon } from 'lucide-react'

export type Product = {
  slug: ProductSlug
  name: string
  category: string
  tagline: string
  detail?: string
  image?: string
  features: string[]
}

export type Area = {
  slug: 'publico' | 'empresarial' | 'saas' | 'innovation-lab'
  number: string
  navLabel: string
  name: string
  kicker?: string
  description: string
  tags: string[]
  note?: string
  highlights?: string[]
  image: string
  icon: LucideIcon
  page?: 'gobierno' | 'privado' | 'navalav'
}

export type ProductSlug =
  'gridxia' | 'navastay' | 'tracxia' | 'ordexia' | 'factxia'
export type ContactMotive = 'reunion' | 'demo'
export type ContactTopic = ProductSlug | 'gobierno' | 'privado'

export type Capability = {
  icon: LucideIcon
  title: string
  text?: string
  items?: string[]
  span?: 1 | 2 | 3
}

export type Surface = {
  icon: LucideIcon
  name: string
  tagline: string
  items: string[]
  closing?: string
}

export type Benefits = {
  title: string
  items: string[]
  savings?: { title: string; lead: string; items: string[]; closing: string }
}

export type ProductDetail = {
  heroImage?: string
  heroVisual?: 'photo' | 'mockup'
  logo?: string
  kicker?: string
  heroTagline?: string
  mockupDevice?: 'browser' | 'phone'
  mockupMenu?: string[]
  problem?: {
    intro: string
    audience?: string
    pairs: { before?: string; after: string }[]
  }
  capabilities?: Capability[]
  surfacesTitle?: string
  surfaces?: Surface[]
  stepsTitle?: string
  steps?: { title: string; text: string }[]
  benefits?: Benefits
  faqs?: { question: string; answer: string }[]
  ecosystem: { kicker: string; blurb: string }
}
