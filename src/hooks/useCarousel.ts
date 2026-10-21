import { useEffect, useState } from "react";

export function useCarousel(length: number, interval = 3000) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || length < 2) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const timer = setTimeout(() => setIndex((i) => (i + 1) % length), interval);
        return () => clearTimeout(timer);
    }, [index, paused, length, interval]);

    return { index, goTo: setIndex, setPaused };
}