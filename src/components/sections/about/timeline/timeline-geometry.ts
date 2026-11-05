// El SVG usa un ancho de 1000 unidades; los botones se centran en celdas iguales.
const VIEWBOX_WIDTH = 1000

export type TimelineVariant = 'straight' | 'wave'

export function createTimelinePath(
  count: number,
  variant: TimelineVariant = 'wave',
) {
  const points = Array.from({ length: count }, (_, index) => ({
    x: ((index + 0.5) / count) * VIEWBOX_WIDTH,
    y: variant === 'wave' && index % 2 ? 85 : 50,
  }))
  return points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`
      if (variant === 'straight') return `L ${point.x} ${point.y}`
      const previous = points[index - 1]
      const middle = (previous.x + point.x) / 2
      return `C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`
    })
    .join(' ')
}

export function getTimelineProgress(selectedIndex: number, count: number) {
  if (count <= 1) return { progress: 0, clipWidth: 0 }

  const index = Math.max(0, Math.min(count - 1, selectedIndex))
  const progress = index / (count - 1)
  // Al finalizar se descubre todo el SVG, incluidos los extremos redondeados.
  const clipWidth =
    index === count - 1
      ? VIEWBOX_WIDTH
      : index === 0
        ? 0
        : ((index + 0.5) / count) * VIEWBOX_WIDTH

  return { progress, clipWidth }
}
