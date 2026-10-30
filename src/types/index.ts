import type { LucideIcon } from 'lucide-react'

export type Product = {
  slug: string
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
