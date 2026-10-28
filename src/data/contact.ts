import { products } from "@/data/products";
import type { ContactMotive, ContactTopic } from "@/types";

export const contactMotives: { value: ContactMotive; label: string }[] = [
    { value: "reunion", label: "Solicitar una reunión" },
    { value: "demo", label: "Pedir una demostración" },
];

export const contactTopics: { value: ContactTopic; label: string }[] = [
    ...products.map((product) => ({ value: product.slug, label: product.name })),
    { value: "gobierno", label: "Sector público" },
    { value: "privado", label: "Sector empresarial" },
];