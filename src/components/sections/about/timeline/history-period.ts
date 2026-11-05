import type { HistoryMilestone } from '../../../../data/history'

// Compartir la etiqueta mantiene el mismo período en el selector, el detalle y su nombre accesible.
export function formatHistoryPeriod({
  year,
  endYear,
}: Pick<HistoryMilestone, 'year' | 'endYear'>) {
  return endYear !== undefined && endYear !== year
    ? `${year}–${endYear}`
    : String(year)
}
