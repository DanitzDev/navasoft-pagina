import {
  Boxes,
  Building2,
  Receipt,
  Home,
  Sprout,
  ChevronsRight,
  Smartphone,
  GraduationCap,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ProductSlug } from '@/types'

export const productIcons: Record<ProductSlug, LucideIcon> = {
  acadxia: GraduationCap,
  gridxia: Zap,
  navastay: Building2,
  tracxia: Boxes,
  ordexia: Smartphone,
  factxia: Receipt,
}

export const productAccent: Record<ProductSlug, string> = {
  gridxia: '#d96627',
  navastay: '#d16229',
  tracxia: '#d46424',
  ordexia: '#d36220',
  factxia: "#f47f20",
  acadxia: "#f47f20",
}

// Icono de la marca provisional de cada producto
export const productMarkIcons: Record<ProductSlug, LucideIcon> = {
  gridxia: Zap,
  navastay: Home,
  tracxia: Sprout,
  ordexia: ChevronsRight,
  factxia: Receipt,
  acadxia: GraduationCap,
}
