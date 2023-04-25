import { iconsProxy } from '@Icons/proxy'
import { SizeOptions } from '@Types'
import { FC, MouseEventHandler } from 'react'

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
  icon?: keyof typeof iconsProxy
  size?: SizeOptions
  pulse?: boolean
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

const Button: FC<ButtonProps> = (
  { onClick, disabled = false, size = 'md', icon = undefined, pulse = false, className = '' }
) => {
  const IconComponent = icon !== undefined ? iconsProxy[icon] : null

  return (
    <button
      className={`${className} ${sizeHeightProxy[size]} ${sizeWidthProxy[size]} disabled:opacity-25`}
      onClick={onClick}
      disabled={disabled}
    >
      {(IconComponent != null) && <IconComponent
        className={`${!disabled && pulse ? 'animate-bounce' : ''}`}
        height='100%'
        width='100%'
                                  />}
    </button>
  )
}

export default Button
