import { Dispatch, FC, SetStateAction } from 'react'
import Image from 'next/image'
import { PointModel } from '@Models/point'
import { TouchButton } from './components/TouchButton'
import { GenericItemHandler, PointMaterialProxy } from '@Types'
import { MaterialLayers } from './components/MaterialLayers'

export interface PlaygroundProps {
  selectPointHandler: GenericItemHandler<PointModel>
  selectedPoint?: PointModel
  loadingPoint?: boolean
  setLoadingPoint: Dispatch<SetStateAction<boolean>>
  pointMaterialProxy: PointMaterialProxy
  pointList: PointModel[]
}

const Playground: FC<PlaygroundProps> = (
  { pointList, selectPointHandler, selectedPoint, setLoadingPoint, pointMaterialProxy, loadingPoint = false }
) => {
  return (
    <>
      <Image
        src='/base.jpeg'
        alt='Modern kitchen'
        priority
        // optimize image performance:
        sizes='(max-width: 1280px) 100vw, 80vw'
        fill
        style={{
          objectFit: 'contain'
        }}
      />

      {Object.values(pointMaterialProxy).map((material, index) => (
        <MaterialLayers
          key={`${index}-${material.name}`}
          material={material}
          setLoadingPoint={setLoadingPoint}
        />))}

      {pointList.map((point, index) => (
        <TouchButton
          key={index}
          point={point}
          loading={loadingPoint && selectedPoint !== undefined && selectedPoint.id === point.id}
          onClickHandler={selectPointHandler}
        />
      ))}
    </>
  )
}

export default Playground
