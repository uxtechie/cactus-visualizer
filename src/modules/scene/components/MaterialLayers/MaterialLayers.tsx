import { Dispatch, SetStateAction } from 'react'
import { MaterialModel } from '@Models/material'
import Image from 'next/image'

export interface MaterialLayersProps {
  material: MaterialModel
  setLoadingPoint: Dispatch<SetStateAction<boolean>>
}

const MaterialLayers: React.FC<MaterialLayersProps> = ({ material, setLoadingPoint }) => {
  const { layers, name } = material

  return (
    <>
      {
    Object.values(layers).map((currentLayerUrl, index) => (<Image
      key={`${index}-layer`}
      className='absolute top-0 left-0'
      src={currentLayerUrl}
      fill
      style={{
        objectFit: 'contain'
      }}
      alt={`${name} material - layer ${index}`}
      onLoadingComplete={() => setLoadingPoint(false)}
                                                           />))
  }
    </>
  )
}

export default MaterialLayers
