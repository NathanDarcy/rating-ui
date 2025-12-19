import Button from './Button'

export type ModalProps = {
  isOpen: boolean
  rating: number
  onClose: () => void
}

export default function Modal({ isOpen, onClose, rating }: ModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Thank You!</h3>
        <p>
          You selected {rating} star{rating > 1 && 's'}
        </p>
        <Button className="close-btn" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
