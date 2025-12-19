import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button, { type ButtonProps } from '../Button'

const mockOnClick = vi.fn()
function renderComponent(overrides: Partial<ButtonProps> = {}) {
  const {
    disabled = false,
    onClick = mockOnClick,
    className = '',
    children = 'Test',
  } = overrides

  render(
    <Button disabled={disabled} onClick={onClick} className={className}>
      {children}
    </Button>
  )
}

function getButton() {
  return screen.getByRole('button')
}

describe('Button', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('rendering', () => {
    it('renders children in the button element', () => {
      renderComponent()
      expect(getButton()).toHaveTextContent('Test')
    })

    it('applies className when provided', () => {
      renderComponent({ className: 'test-class' })
      expect(getButton()).toHaveClass('test-class')
    })

    it('does not apply any className when none are provided', () => {
      renderComponent()
      expect(getButton()).not.toHaveClass('test-class')
    })
  })

  describe('interactions', () => {
    it('calls onClick when user clicks the button and a click function was provided', async () => {
      renderComponent({ onClick: mockOnClick })
      await userEvent.click(getButton())
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('disables the button when the disabled prop is set', () => {
      renderComponent({ disabled: true })
      expect(getButton()).toBeDisabled()
    })

    it('does not disable the button when the disabled prop is not passed', () => {
      renderComponent()
      expect(getButton()).not.toBeDisabled()
    })

    it('does not disable the button when the disabled prop is false', () => {
      renderComponent({ disabled: false })
      expect(getButton()).not.toBeDisabled()
    })

    it('does not execute the provided onClick method if the button is disabled', async () => {
      renderComponent({ disabled: true, onClick: mockOnClick })
      await userEvent.click(getButton())
      expect(mockOnClick).not.toHaveBeenCalled()
    })
  })
})
