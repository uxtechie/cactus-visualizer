import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { PointModel, getPointList } from '@Models/point'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { TouchButton } from './components/TouchButton'
import { GenericItemHandler, PointMaterialProxy } from '@Types'
import { MaterialLayers } from './components/MaterialLayers'

export interface SceneProps {
  selectPointHandler: GenericItemHandler<PointModel>
  selectedPoint?: PointModel
  loadingPoint?: boolean
  setLoadingPoint: Dispatch<SetStateAction<boolean>>
  pointMaterialProxy: PointMaterialProxy
}

const Scene: FC<SceneProps> = ({ selectPointHandler, selectedPoint, setLoadingPoint, pointMaterialProxy, loadingPoint = false }) => {
  const [pointList, setPointList] = useState<PointModel[]>([])
  const [error, setError] = useState<AppErrorMessage>()

  useEffect(() => {
    getPointList()
      .then((points) => setPointList(points))
      .catch(() => setError(AppErrorMessage.GetPointsFailed))
  }, [])

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

export default Scene
