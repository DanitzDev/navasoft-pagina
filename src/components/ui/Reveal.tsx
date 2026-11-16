import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = { children: ReactNode; delay?: number; className?: string };

export function Reveal({ children, delay = 0, className }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // solo la primera vez
                }
            },
            { threshold: 0.15 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={cn(
                "transition duration-700 ease-out motion-reduce:transition-none",
                visible ? "translate-y-0 opacity-100" : "motion-safe:translate-y-6 motion-safe:opacity-0",
                className,
            )}
        >
            {children}
        </div>
    );
}