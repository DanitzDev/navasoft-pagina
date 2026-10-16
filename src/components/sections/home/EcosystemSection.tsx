import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProductCard } from '@/components/sections/products/ProductCard'
import { products } from '@/data/products'

export function EcosystemSection() {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle
          eyebrow="Nuestro ecosistema"
          title="Cinco plataformas, una misma visión."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  )
}
