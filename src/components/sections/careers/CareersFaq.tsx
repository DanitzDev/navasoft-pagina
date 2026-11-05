import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AccordionItem } from '@/components/ui/Accordion'
import { careersCopy, careersFaqs } from '@/data/opportunities'

export function CareersFaq() {
  return (
    <section id="preguntas" className="scroll-mt-28 py-20">
      <Container size="md">
        <SectionTitle title={careersCopy.faq.title} />
        <div className="mt-8 space-y-3">
          {careersFaqs.map((faq) => (
            <AccordionItem key={faq.question} question={faq.question}>
              {faq.answer}
            </AccordionItem>
          ))}
        </div>
      </Container>
    </section>
  )
}
