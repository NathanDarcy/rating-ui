import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Rating from '../Rating'

function renderComponent(props = {}) {
  render(<Rating {...props} />)
}

function getStars() {
  return screen.getAllByText('\u2605')
}

function getStarByRating(rating: number) {
  return screen.getByTestId(`star-${rating}`)
}

function getSubmitButton() {
  return screen.getByRole('button', { name: /submit/i })
}

function getModal() {
  return screen.queryByText(/thank you/i)
}

describe('Rating', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders default title when no title is passed', () => {
      renderComponent()
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Please Rate Your Experience/i,
        }),
      ).toBeInTheDocument()
    })

    it('renders the custom title when a title is provided', () => {
      renderComponent({ title: 'Custom' })
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Custom/i,
        }),
      ).toBeInTheDocument()
    })

    it('renders 5 stars', () => {
      renderComponent()
      expect(getStars()).toHaveLength(5)
    })

    it('renders the initial feedback message', () => {
      renderComponent()
      expect(screen.getByText('No Rating')).toBeInTheDocument()
    })

    it('disables the submit button when no rating is selected', () => {
      renderComponent()
      expect(getSubmitButton()).toBeDisabled()
    })
  })

  describe('star interactions', () => {
    it('updates rating and feedback when a star is clicked', async () => {
      renderComponent()

      await userEvent.click(getStarByRating(2))

      expect(screen.getByText('Dislike it')).toBeInTheDocument()
      expect(getSubmitButton()).not.toBeDisabled()
    })

    it('resets rating when clicking the same star twice', async () => {
      renderComponent()

      await userEvent.click(getStarByRating(3)) // select 3
      await userEvent.click(getStarByRating(3)) // deselect 3

      expect(screen.getByText('No Rating')).toBeInTheDocument()
      expect(getSubmitButton()).toBeDisabled()
    })

    it('activates stars up to the hovered star', async () => {
      renderComponent()

      await userEvent.hover(getStarByRating(4)) // hover star 4

      const stars = getStars()
      expect(stars[0]).toHaveClass('active')
      expect(stars[1]).toHaveClass('active')
      expect(stars[2]).toHaveClass('active')
      expect(stars[3]).toHaveClass('active')
      expect(stars[4]).not.toHaveClass('active')
    })

    it('clears hover state when unhovered', async () => {
      renderComponent()

      await userEvent.hover(getStarByRating(3))
      await userEvent.unhover(getStarByRating(3))

      getStars().forEach((star) => {
        expect(star).not.toHaveClass('active')
      })
    })
  })

  describe('submit button', () => {
    it('does nothing when submitting with no rating', async () => {
      renderComponent()

      await userEvent.click(getSubmitButton())

      expect(getModal()).not.toBeInTheDocument()
    })

    it('opens the modal when submitting with a rating', async () => {
      renderComponent()

      await userEvent.click(getStarByRating(5)) // select 5
      await userEvent.click(getSubmitButton())

      expect(getModal()).toBeInTheDocument()
      expect(screen.getByText('You selected 5 stars')).toBeInTheDocument()
    })
  })

  describe('modal', () => {
    it('closes the modal and resets state when the modal close button is clicked', async () => {
      renderComponent()

      // select rating
      await userEvent.click(getStarByRating(2)) // select 2
      await userEvent.click(getSubmitButton()) // open modal

      // close modal
      await userEvent.click(screen.getByRole('button', { name: /close/i }))

      // modal closed
      expect(getModal()).not.toBeInTheDocument()

      // rating reset
      expect(screen.getByText('No Rating')).toBeInTheDocument()

      // submit disabled again
      expect(getSubmitButton()).toBeDisabled()

      // stars inactive
      getStars().forEach((star) => {
        expect(star).not.toHaveClass('active')
      })
    })
  })
})
