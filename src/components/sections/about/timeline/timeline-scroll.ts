// Centrar el hito dentro del selector sin desplazar verticalmente la página.
export function centerTimelineStep(
  panel: HTMLDivElement,
  button: HTMLButtonElement,
  behavior: ScrollBehavior,
) {
  if (panel.scrollWidth <= panel.clientWidth) return
  const panelBounds = panel.getBoundingClientRect()
  const buttonBounds = button.getBoundingClientRect()
  const desired =
    panel.scrollLeft +
    buttonBounds.left +
    buttonBounds.width / 2 -
    (panelBounds.left + panelBounds.width / 2)
  const left = Math.max(
    0,
    Math.min(panel.scrollWidth - panel.clientWidth, desired),
  )
  if (Math.abs(left - panel.scrollLeft) < 1) return
  panel.scrollTo({ left, behavior })
}
