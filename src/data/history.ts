// Solo se incorporarán acontecimientos confirmados por la empresa.
export type HistoryMilestone = {
  id: string
  year: number
  title: string
  description: string
  image?: { src: string; alt: string }
}

export const history: HistoryMilestone[] = []
