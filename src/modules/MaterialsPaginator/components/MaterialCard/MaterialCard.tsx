import { FC, useState } from 'react'
import Image from 'next/image'
import { MaterialModel } from '@Models/material'
import { GenericItemHandler } from '@Types'

interface MaterialCardProps {
  material: MaterialModel
  selected?: boolean
  onClickHandler: GenericItemHandler<MaterialModel>
}

const MaterialCard: FC<MaterialCardProps> = (
  { material, selected = false, onClickHandler }
) => {
  const [previewLoaded, setPreviewLoaded] = useState(false)

  const { materialPreview, name } = material

  return (
    <li className={`flex flex-1 ${selected ? 'w-full' : 'w-fit'} border-2 bg-neutral-100 border-neutral-100 rounded-[5px]`}>
      {selected && previewLoaded && (
        <span
          className='flex-auto text-neutral-600 text-center place-self-center text-sm lg:text-lg'
        >
          {name}
        </span>
      )}
      <button
        className='flex-none relative w-14 h-14 rounded-[5px] lg:w-20 lg:h-20'
        type='button' onClick={() => onClickHandler(material)}
      >
        <Image
          src={materialPreview}
          alt={`${name} material`}
          // optimize image performance:
          sizes='10vw'
          fill
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
          onLoadingComplete={() => setPreviewLoaded(true)}
        />
      </button>
    </li>
  )
}

export default MaterialCard
