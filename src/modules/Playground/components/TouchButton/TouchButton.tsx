import { FC } from 'react'
import { GenericItemHandler } from '@Types'
import { PointModel } from '@Models/point'
import { IconFingerprint } from '@Icons/IconFingerPrint'

interface TouchButtonProps {
  onClickHandler: GenericItemHandler<PointModel>
  point: PointModel
  loading?: boolean
}

const TouchButton: FC<TouchButtonProps> = ({ point, onClickHandler, loading = false }) => {
  return (
    <button
      style={{
        top: `${point.coordY}%`,
        left: `${point.coordX}%`
      }}
      className={`
      absolute -translate-y-4 -translate-x-4 rounded-full w-8 h-8
      transition hover:opacity-30
      lg:-translate-y-5 lg:-translate-x-5 lg:w-10 lg:h-10
      `}
      onClick={() => onClickHandler(point)}
    >
      <span className={`
        ${loading ? 'animate-bounce' : ''}
        relative w-full h-full flex items-center justify-center
      `}>
        <span
          className='absolute w-full h-full rounded-full outline bg-neutral-800 outline-neutral-800 opacity-40'
        />
        <IconFingerprint
          className={`
          w-full h-full text-white p-1 rotate-12 border-2 rounded-full
          lg:p-1.5
          `}
        />
      </span>
    </button>
  )
}

export default TouchButton
