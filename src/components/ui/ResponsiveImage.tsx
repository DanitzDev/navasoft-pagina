import type { ImgHTMLAttributes } from 'react'
import manifest from '@/data/image-manifest.json'

type Entry = { width: number; height: number; widths: number[] }
const entries = manifest as Partial<Record<string, Entry>>

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'srcSet' | 'sizes'
> & {
  src: string // la ruta del original, por ejemplo /images/hero-trust.jpeg
  alt: string
  sizes: string // cuánto ocupa la imagen en pantalla; ayuda al navegador a elegir la versión
  priority?: boolean // true solo para la imagen principal de la página
}

export function ResponsiveImage({
  src,
  alt,
  sizes,
  priority = false,
  ...rest
}: ResponsiveImageProps) {
  const base = src.replace(/\.(jpe?g|png|webp|avif)$/i, '')
  const entry = entries[base]

  const image = (
    <img
      src={src}
      alt={alt}
      width={entry?.width}
      height={entry?.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  )

  // Sin versiones generadas, se comporta como una imagen normal
  if (!entry) return image

  return (
    <picture className="contents">
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={entry.widths
          .map((width) => `${base}-${width}.webp ${width}w`)
          .join(', ')}
      />
      {image}
    </picture>
  )
}
