import { render, screen } from '@testing-library/react'
import Star, { type StarProps } from '../Star'
import type { StarRating } from '../Rating'
import userEvent from '@testing-library/user-event'

const mockOnSelect = vi.fn()
const mockOnHover = vi.fn()

const starUnderTest: StarRating = {
  id: 3,
  value: 3,
}

const starUnicodeCharacter = '\u2605'

function renderComponent(overrides: Partial<StarProps> = {}) {
  const {
    star = starUnderTest,
    rating = 0,
    hover = 0,
    onSelect = mockOnSelect,
    onHover = mockOnHover,
  } = overrides

  render(
    <Star
      star={star}
      rating={rating}
      hover={hover}
      onSelect={onSelect}
      onHover={onHover}
    />,
  )
}

function getStarSpan(): HTMLElement {
  return screen.getByText(starUnicodeCharacter)
}

describe('Star', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders a star character', () => {
      renderComponent()
      expect(getStarSpan()).toHaveClass('star')
    })

    it('should be active when this star is hovered', () => {
      renderComponent({ hover: starUnderTest.value })
      const starSpan = getStarSpan()
      expect(starSpan).toHaveClass('star')
      expect(starSpan).toHaveClass('active')
    })

    it('should be active when this star is selected', () => {
      renderComponent({ rating: starUnderTest.value })
      const starSpan = getStarSpan()
      expect(starSpan).toHaveClass('star')
      expect(starSpan).toHaveClass('active')
    })

    it('should be active when hovered over a star with a higher rating than this star', () => {
      renderComponent({ hover: starUnderTest.value + 1 })
      const starSpan = getStarSpan()
      expect(starSpan).toHaveClass('star')
      expect(starSpan).toHaveClass('active')
    })

    it('should be active when the selected star has higher rating than this star', () => {
      renderComponent({ rating: starUnderTest.value + 1 })
      const starSpan = getStarSpan()
      expect(starSpan).toHaveClass('star')
      expect(starSpan).toHaveClass('active')
    })

    it('should not be active when hovered over a star with lower rating than this star', () => {
      renderComponent({ hover: starUnderTest.value - 1 })
      const starSpan = getStarSpan()
      expect(starSpan).toHaveClass('star')
      expect(starSpan).not.toHaveClass('active')
    })

    it('should not be active when the selected star has a lower rating than this star', () => {
      renderComponent({ rating: starUnderTest.value - 1 })
      const starSpan = getStarSpan()
      expect(starSpan).toHaveClass('star')
      expect(starSpan).not.toHaveClass('active')
    })
  })

  describe('interaction', () => {
    it('calls onSelect with the selected star value when clicked', async () => {
      renderComponent()
      await userEvent.click(getStarSpan())
      expect(mockOnSelect).toHaveBeenCalledWith(starUnderTest.value)
    })

    it('calls onHover with "enter" and the hovered star value when hovered', async () => {
      renderComponent()
      await userEvent.hover(getStarSpan())
      expect(mockOnHover).toHaveBeenCalledExactlyOnceWith(
        'enter',
        starUnderTest.value,
      )
    })

    it('calls onHover with "leave" and the hovered star value when unhovered', async () => {
      renderComponent()
      await userEvent.unhover(getStarSpan())
      expect(mockOnHover).toHaveBeenCalledExactlyOnceWith(
        'leave',
        starUnderTest.value,
      )
    })
  })
})
