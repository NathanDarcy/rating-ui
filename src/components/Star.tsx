import type { StarRating } from './Rating'

export type StarProps = {
  star: StarRating
  rating: number
  hover: number
  onSelect: (value: number) => void
  onHover: (action: 'enter' | 'leave', value: number) => void
}

export default function Star({
  star,
  rating,
  hover,
  onSelect,
  onHover,
}: StarProps) {
  return (
    <span
      className={`star ${star.value <= (hover || rating) ? 'active' : ''}`}
      onClick={() => onSelect(star.value)}
      onMouseEnter={() => onHover('enter', star.value)}
      onMouseLeave={() => onHover('leave', star.value)}
      data-testid={`star-${star.value}`}
    >
      {'\u2605'}
    </span>
  )
}
