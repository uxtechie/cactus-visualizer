import { GenericItemHandler } from '@Types'
import { PointModel } from '@Models/point'
import { IconFingerprint } from '@Icons/IconFingerPrint'

interface TouchButtonProps {
  onClickHandler: GenericItemHandler<PointModel>
  point: PointModel
}

const TouchButton: React.FC<TouchButtonProps> = ({ point, onClickHandler }) => {
  return (
    <button
      style={{
        top: `${point.coordY}%`,
        left: `${point.coordX}%`
      }}
      className='absolute -translate-y-5 -translate-x-5 rounded-full w-10 h-10 transition hover:opacity-30'
      onClick={() => onClickHandler(point)}
    >
      <span className='relative w-full h-full flex items-center justify-center'>
        <span
          className='absolute w-full h-full rounded-full outline bg-neutral-800 outline-neutral-800 opacity-40'
        />
        <IconFingerprint
          className='w-full h-full text-white p-1.5 rotate-12 border-2 rounded-full'
        />
      </span>
    </button>
  )
}

export default TouchButton
