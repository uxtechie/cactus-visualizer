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

  return (
    <article className='flex border-white'>
      {selected && <p>{name}</p>}
      <button type='button' onClick={() => onClickHandler(material)}>

        <Image
          src={materialPreview}
          alt={`${name} material`}
          width={50}
          height={50}
        />
      </button>
    </article>
  )
}

export default MaterialCard
