import { FC } from 'react'
import Image from 'next/image'
import { MaterialModel } from '@Models/material'
import { GenericItemHandler } from '@Types'

export interface MaterialCardProps {
  material: MaterialModel
  selected?: boolean
  onClickHandler: GenericItemHandler<MaterialModel>
}

const MaterialCard: FC<MaterialCardProps> = ({ material, selected = false, onClickHandler }) => {
  const { materialPreview, name } = material

  console.log(material.name)
  console.log('selected', selected)

  return (
    <li className={`flex flex-1 ${selected ? 'w-full' : 'w-fit'} border-2 bg-neutral-100 border-neutral-100 rounded-[5px]`}>
      {selected && <span
        className='flex-auto text-neutral-600 text-center place-self-center text-sm lg:text-lg'
                   >
        {name}
                   </span>}
      <button
        className='flex-none relative w-14 h-14 rounded-[5px] lg:w-20 lg:h-20'
        type='button' onClick={() => onClickHandler(material)}
      >
        <Image
          src={materialPreview}
          alt={`${name} material`}
          fill
        />
      </button>
    </li>
  )
}

export default MaterialCard
