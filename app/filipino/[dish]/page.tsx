import { filipinoDishes } from '../../data/filipino-dishes'
import DishClient from './DishClient'

interface PageProps {
  params: {
    dish: string
  }
}

export default function Page({ params }: PageProps) {
  const dish = filipinoDishes[params.dish]

  // If dish is not found, pass null to client component which handles the 404 UI
  return <DishClient dish={dish || null} />
}
