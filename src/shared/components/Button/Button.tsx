import { iconsProxy } from '@Icons/proxy'
import { SizeOptions } from '@Types'
import { FC, MouseEventHandler } from 'react'

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
  icon?: keyof typeof iconsProxy
  size?: SizeOptions
}

const sizeHeightProxy: Record<SizeOptions, string> = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10'
}

const sizeWidthProxy: Record<SizeOptions, string> = {
  sm: 'w-18',
  md: 'w-24',
  lg: 'w-32'
}

const Button: FC<ButtonProps> = ({ onClick, disabled = false, size = 'md', icon = undefined, className = '' }) => {
  const IconComponent = icon !== undefined ? iconsProxy[icon] : null

  return (
    <button
      className={`${className} ${sizeHeightProxy[size]} ${sizeWidthProxy[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {(IconComponent != null) && <IconComponent height='auto' width='auto' />}
    </button>
  )
}

export default Button
