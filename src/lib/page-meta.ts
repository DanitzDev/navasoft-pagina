const siteOrigin = 'https://navasoft.es'
const siteName = 'Navasoft Soluciones'

export function pageMeta({
  title,
  description,
  path,
  image = '/images/hero-trust.jpeg',
}: {
  title: string
  description: string
  path: string
  image?: string
}) {
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: new URL(path, siteOrigin).href },
      { property: 'og:image', content: new URL(image, siteOrigin).href },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }
}
