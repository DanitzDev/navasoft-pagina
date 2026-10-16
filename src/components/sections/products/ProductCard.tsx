import { Card, CardContent, CardImage } from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      interactive
      className="border-primary/15 bg-surface hover:border-primary/40"
    >
      <CardImage src={product.image} alt={`Plataforma ${product.name}`} />

      <CardContent>
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {product.category}
        </span>

        <h3 className="text-2xl font-bold text-ink">{product.name}</h3>
        <p className="text-ink/70">{product.tagline}</p>

        <ul className="flex flex-wrap gap-2">
          {product.features.map((feature) => (
            <li key={feature}>
              <Badge>{feature}</Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <ButtonLink to="/contacto" search={{ motivo: 'demo' }} size="sm">
            Pedir demo
          </ButtonLink>
          <ButtonLink
            to="/productos/$slug"
            params={{ slug: product.slug }}
            variant="secondary"
            size="sm"
          >
            Ver plataforma
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  )
}
