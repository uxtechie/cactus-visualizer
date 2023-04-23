import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { PointModel, getPointList } from '@Models/point'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { TouchButton } from './components/TouchButton'
import { GenericItemHandler, PointMaterialProxy } from '@Types'
import { PointMaterialLayers } from './components/PointMaterialLayers'

export interface SceneProps {
  selectPointHandler: GenericItemHandler<PointModel>
  selectedPoint?: PointModel
  pointMaterialProxy: PointMaterialProxy
}

const Scene: FC<SceneProps> = ({ selectPointHandler, selectedPoint, pointMaterialProxy }) => {
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
        fill
        style={{
          objectFit: 'contain'
        }}
      />

      {Object.values(pointMaterialProxy).map((materialLayers, index) => (
        <PointMaterialLayers
          key={`${index}-${materialLayers.materialName}`}
          {...materialLayers}
        />))}

      {pointList.map((point, index) => (
        <TouchButton
          key={index}
          point={point} onClickHandler={selectPointHandler}
        />
      ))}
    </>
  )
}

export default Scene
