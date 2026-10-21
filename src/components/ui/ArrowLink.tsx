import type { ReactNode } from "react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

type ArrowLinkProps = Omit<LinkComponentProps<"a">, "className" | "children"> & {
    className?: string;
    children: ReactNode;
};

export function ArrowLink({ className, children, ...props }: ArrowLinkProps) {
    return (
        <Link
            className={cn(
                "group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover",
                className,
            )}
            {...props}
        >
            {children}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
            </span>
        </Link>
    );
}