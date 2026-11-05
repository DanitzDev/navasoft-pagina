// Datos aprobados para las dos familias de logos y las citas institucionales.
export type OrganizationLogo = {
  id: string
  name: string
  image: string
  surface?: 'dark'
  relationship?: string
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  role?: string
  organization: string
}
