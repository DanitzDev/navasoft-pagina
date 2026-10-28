import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0] ?? "");
    const key = ids.join(",");

    useEffect(() => {
        const elements = key
            .split(",")
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const hit = entries.find((entry) => entry.isIntersecting);
                if (hit) setActive(hit.target.id);
            },
            { rootMargin: "-30% 0px -60% 0px" },
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [key]);

    return active;
}