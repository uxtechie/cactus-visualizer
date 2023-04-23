import { MaterialModel } from '@Models/material'
import Image from 'next/image'

export interface PointMaterialLayersProps {
  material: MaterialModel
}

const PointMaterialLayers: React.FC<PointMaterialLayersProps> = ({ material }) => {
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
                                                           />))
  }
    </>
  )
}

export default PointMaterialLayers
