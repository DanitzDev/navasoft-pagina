import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type IconBoxProps = {
    icon: LucideIcon;
    accent?: boolean;
    size?: "sm" | "md";
    className?: string;
};

export function IconBox({ icon: Icon, accent = false, size = "md", className }: IconBoxProps) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "flex shrink-0 items-center justify-center",
                size === "md" ? "size-10 rounded-xl" : "size-8 rounded-lg",
                accent ? "bg-accent text-white" : "bg-field text-accent",
                className,
            )}
        >
            <Icon className={size === "md" ? "size-5" : "size-4"} />
        </span>
    );
}