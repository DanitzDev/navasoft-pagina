import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AccordionItem } from "@/components/ui/Accordion";

type Faq = { question: string; answer: string };

export function FaqSection({ faqs }: { faqs: Faq[] }) {
    return (
        <section id="preguntas" className="scroll-mt-40 py-20">
            <Container size="md">
                <SectionTitle title="Preguntas frecuentes" />
                <div className="mt-8 space-y-3">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.question} question={faq.question}>
                            {faq.answer}
                        </AccordionItem>
                    ))}
                </div>
            </Container>
        </section>
    );
}