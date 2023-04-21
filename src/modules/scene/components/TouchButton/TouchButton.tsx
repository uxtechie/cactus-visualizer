import { GenericItemHandler } from '@Types'
import { PointModel } from '@Models/point'
import { IconFingerprint } from '@Icons/IconFingerPrint'

export interface TouchButtonProps {
  onClickHandler: GenericItemHandler<PointModel>
  point: PointModel
}

const TouchButton: React.FC<TouchButtonProps> = ({ point, onClickHandler }) => {
  return (
    <div
      style={{
        top: `${point.coordY}%`,
        left: `${point.coordX}%`
      }}
      className='absolute rounded-full w-11 h-11 transition hover:opacity-30'
      onClick={() => onClickHandler(point)}
    >
      <div className='relative w-full h-full flex items-center justify-center'>
        <div
          className='absolute w-full h-full rounded-full outline bg-neutral-800 outline-neutral-800 opacity-40'
        />
        <IconFingerprint
          className='w-full h-full text-white p-1.5 rotate-12 border-2 rounded-full'
        />
      </div>
    </div>
  )
}

export default TouchButton
