import { useCallback, useEffect, useState } from "react";

export function useCarousel(length: number, interval = 3000, enabled = true) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
    const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);

    // Si el carrusel sale de la pantalla, se limpia cualquier pausa pegada
    useEffect(() => {
        if (!enabled) setPaused(false);
    }, [enabled]);

    useEffect(() => {
        if (!enabled || paused || length < 2) return;
        const timer = setTimeout(next, interval);
        return () => clearTimeout(timer);
    }, [index, paused, enabled, length, interval, next]);

    return { index, goTo: setIndex, next, prev, setPaused };
}