const siteOrigin = 'https://navasoft.es'
const siteName = 'Navasoft Soluciones'
const defaultShareImage = '/images/brand/navasoft-social-v2.png'

export function pageMeta({
  title,
  description,
  path,
  image = defaultShareImage,
  imageAlt,
}: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
}) {
  const canonicalUrl = new URL(path, siteOrigin).href
  const imageUrl = new URL(image, siteOrigin).href
  const resolvedImageAlt =
    imageAlt ??
    (image === defaultShareImage
      ? 'Logotipo de Navasoft Soluciones sobre fondo azul oscuro.'
      : `Imagen representativa de ${siteName}.`)

  return {
    links: [{ rel: 'canonical', href: canonicalUrl }],
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:alt', content: resolvedImageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: resolvedImageAlt },
    ],
  }
}
