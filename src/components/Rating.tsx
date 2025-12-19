import { useState } from 'react'
import Star from './Star'
import Modal from './Modal'
import Button from './Button'

type RatingProps = {
  title?: string
  feedbackMessages?: string[]
}

export type StarRating = {
  id: number
  value: number
}

export default function Rating({
  title = 'Please Rate Your Experience',
  feedbackMessages = [
    'No Rating',
    'Hate it',
    'Dislike it',
    'It is OK',
    'Like it',
    'Love it',
  ],
}: RatingProps) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const starRatings: StarRating[] = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ]

  function handleSelect(value: number) {
    // if rating is already selected, reset to 0
    if (rating === value) {
      setRating(0)
      return
    }
    setRating(value)
  }

  function handleHover(action: 'enter' | 'leave', value: number) {
    if (action === 'enter') {
      setHover(value)
      return
    }

    setHover(0)
  }

  function handleSubmit() {
    console.log('Submitted rating:', submitted, rating)
    if (rating === 0) {
      return
    }
    setSubmitted(true)
  }

  function closeModal() {
    setSubmitted(false)
    setRating(0)
    setHover(0)
  }

  return (
    <div className="rating-container">
      <h2>{title}</h2>
      <div className="stars">
        {starRatings.map((star) => (
          <Star
            key={star.id}
            star={star}
            rating={rating}
            hover={hover}
            onSelect={handleSelect}
            onHover={handleHover}
          />
        ))}
      </div>
      <p className="feedback">{feedbackMessages[rating]}</p>

      <Button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={rating === 0}
      >
        Submit
      </Button>

      <Modal isOpen={submitted} onClose={closeModal} rating={rating} />
    </div>
  )
}
