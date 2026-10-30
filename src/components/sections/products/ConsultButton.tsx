import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { ContactMotive, ContactTopic } from "@/types";

type ConsultButtonProps = {
    topic: ContactTopic;
    motivo?: ContactMotive;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    children?: ReactNode;
};

const defaultLabel: Record<ContactMotive, string> = {
    demo: "Pedir demo",
    reunion: "Solicitar reunión",
};

export function ConsultButton({ motivo = "demo", variant, size, children }: ConsultButtonProps) {
    return (
        <ButtonLink to="/contacto" search={{ motivo }} variant={variant} size={size}>
            {children ?? defaultLabel[motivo]}
        </ButtonLink>
    );
}