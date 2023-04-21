import { GenericIdHandler } from '@Types'
import FingerPrintIcon from '@Icons/finger-print-outline.svg'
import { PointModel } from '@Models/point'

export interface TouchButtonProps {
  onClickHandler: GenericIdHandler
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
      onClick={() => onClickHandler(point.id)}
    >
      <div className='relative w-full h-full flex items-center justify-center'>
        <div
          className='absolute w-full h-full rounded-full outline bg-neutral-800 outline-neutral-800 opacity-40'
        />
        <img
          className='absolute w-full h-full p-1.5 rotate-12 border-2 rounded-full'
          src={FingerPrintIcon.src} alt={point.name}
        />
      </div>
    </div>
  )
}

export default TouchButton
