import type { ReactNode } from 'react'

export type ButtonProps = {
  disabled?: boolean
  onClick?: () => void
  className?: string
  children: ReactNode
}

export default function Button({
  onClick,
  disabled = false,
  className,
  children,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
