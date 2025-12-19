import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal, { type ModalProps } from '../Modal'

const mockOnClose = vi.fn()

function renderComponent(overrides: Partial<ModalProps> = {}) {
  const { isOpen = true, rating = 0, onClose = mockOnClose } = overrides

  render(<Modal isOpen={isOpen} rating={rating} onClose={onClose} />)
}

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should not render anything if the modal is closed', () => {
      renderComponent({ isOpen: false })
      expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/you selected/i)).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /close/i }),
      ).not.toBeInTheDocument()
    })

    it('should render the modal when open', () => {
      renderComponent({ isOpen: true, rating: 3 })
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
      expect(screen.getByText('You selected 3 stars')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    })

    it('should render singular "star" when rating is 1', () => {
      renderComponent({ rating: 1 })
      expect(screen.getByText('You selected 1 star')).toBeInTheDocument()
    })

    it('should render plural "stars" when rating is greater than 1', () => {
      renderComponent({ rating: 4 })
      expect(screen.getByText('You selected 4 stars')).toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('should call onClose when the close button is clicked', async () => {
      renderComponent({ isOpen: true })
      await userEvent.click(screen.getByRole('button', { name: /close/i }))
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })
})
