type BrandLogoProps = {
  priority?: boolean
}

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/images/brand/navasoft-white-94.webp 94w, /images/brand/navasoft-white-188.webp 188w, /images/brand/navasoft-white-282.webp 282w"
        sizes="94px"
      />
      <img
        src="/images/brand/navasoft-white.png"
        width={94}
        height={44}
        alt="Navasoft Soluciones"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
