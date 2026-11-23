import { lazy, Suspense } from 'react'
import type { CSSProperties } from 'react'
import { ProductHero } from '@/components/sections/products/detail/ProductHero'
import { ProductSideNav } from '@/components/sections/products/detail/ProductSideNav'
import type { SubnavItem } from '@/components/sections/products/detail/ProductSideNav'
import { productAccent } from '@/data/product-meta'
import { productDetails } from '@/data/product-details'
import type { Product } from '@/types'

const ProblemSection = lazy(() =>
  import('@/components/sections/products/detail/ProblemSection').then((m) => ({
    default: m.ProblemSection,
  })),
)
const CapabilitiesSection = lazy(() =>
  import('@/components/sections/products/detail/CapabilitiesSection').then(
    (m) => ({ default: m.CapabilitiesSection }),
  ),
)
const SurfacesSection = lazy(() =>
  import('@/components/sections/products/detail/SurfacesSection').then((m) => ({
    default: m.SurfacesSection,
  })),
)
const StepsSection = lazy(() =>
  import('@/components/sections/products/detail/StepsSection').then((m) => ({
    default: m.StepsSection,
  })),
)
const BenefitsSection = lazy(() =>
  import('@/components/sections/products/detail/BenefitsSection').then((m) => ({
    default: m.BenefitsSection,
  })),
)
const FaqSection = lazy(() =>
  import('@/components/sections/products/detail/FaqSection').then((m) => ({
    default: m.FaqSection,
  })),
)
const EcosystemRest = lazy(() =>
  import('@/components/sections/products/detail/EcosystemRest').then((m) => ({
    default: m.EcosystemRest,
  })),
)
const ProductCta = lazy(() =>
  import('@/components/sections/products/detail/ProductCta').then((m) => ({
    default: m.ProductCta,
  })),
)

export function ProductDetailPage({ product }: { product: Product }) {
  const detail = productDetails[product.slug]

  const items: (SubnavItem | false | undefined)[] = [
    detail.problem && { id: 'problema', label: 'Problema' },
    detail.capabilities && { id: 'capacidades', label: 'Capacidades' },
    detail.surfaces && { id: 'plataforma', label: 'Plataforma' },
    detail.steps && { id: 'como-funciona', label: 'Cómo funciona' },
    detail.benefits && { id: 'beneficios', label: 'Beneficios' },
    detail.faqs && { id: 'preguntas', label: 'Preguntas' },
    { id: 'demo', label: 'Demo' },
  ]
  const subnav = items.filter((item): item is SubnavItem => Boolean(item))

  return (
    <div
      style={{ '--product': productAccent[product.slug] } as CSSProperties}
      className="product-detail-page bg-night text-white"
    >
      <ProductHero product={product} detail={detail} />
      <ProductSideNav items={subnav} />
      <Suspense fallback={null}>
        {detail.problem && (
          <ProblemSection name={product.name} problem={detail.problem} />
        )}
        {detail.capabilities && (
          <CapabilitiesSection
            name={product.name}
            capabilities={detail.capabilities}
          />
        )}
        {detail.surfaces && (
          <SurfacesSection
            title={detail.surfacesTitle ?? 'Plataforma'}
            surfaces={detail.surfaces}
          />
        )}
        {detail.steps && (
          <StepsSection
            name={product.name}
            steps={detail.steps}
            title={detail.stepsTitle}
          />
        )}
        {detail.benefits && <BenefitsSection benefits={detail.benefits} />}
        {detail.faqs && <FaqSection faqs={detail.faqs} />}
        <EcosystemRest current={product.slug} />
        <ProductCta name={product.name} slug={product.slug} />
      </Suspense>
    </div>
  )
}
