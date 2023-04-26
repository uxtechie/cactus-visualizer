import { useContext } from 'react'
import Image from 'next/image'
import { LoadingPointContext } from '@Contexts/LoadingPointContext'
import { MaterialModel } from '@Models/material'

interface MaterialLayersProps {
  material: MaterialModel
}

const MaterialLayers: React.FC<MaterialLayersProps> = ({ material }) => {
  const { setLoadingPoint } = useContext(LoadingPointContext)

  const { layers, name } = material

  return (
    <>
      {
    Object.values(layers).map((currentLayerUrl, index) => (<Image
      key={`${index}-layer`}
      className='absolute top-0 left-0'
      src={currentLayerUrl}
      // optimize image performance:
      sizes='(max-width: 1280px) 100vw, 80vw'
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
