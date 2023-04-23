import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { PointModel, getPointList } from '@Models/point'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { TouchButton } from './components/TouchButton'
import { GenericItemHandler } from '@Types'
import { MaterialModel } from '@Models/material'

export interface SceneProps {
  selectedPointHandler: GenericItemHandler<PointModel>
  selectedPoint?: PointModel
  selectedMaterial?: MaterialModel
}

const Scene: FC<SceneProps> = ({ selectedPointHandler, selectedMaterial, selectedPoint }) => {
  const [pointList, setPointList] = useState<PointModel[]>([])
  const [error, setError] = useState<AppErrorMessage>()

  useEffect(() => {
    getPointList()
      .then((points) => setPointList(points))
      .catch(() => setError(AppErrorMessage.GetPointsFailed))
  }, [])

  const selectedPointId = selectedPoint?.id
  const selectedMaterialName = selectedMaterial?.name

  const currentLayer = (selectedPointId !== undefined) ? selectedMaterial?.layers[selectedPointId] : undefined

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
      {currentLayer !== undefined && <Image
        className='absolute top-0 left-0'
        src={currentLayer}
        fill
        style={{
          objectFit: 'contain'
        }}
        alt={
          `${selectedMaterialName !== undefined ? selectedMaterialName : ''} material`
}
                                     />}
      {pointList.map((point, index) => (
        <TouchButton
          key={index}
          point={point} onClickHandler={selectedPointHandler}
        />
      ))}
    </>
  )
}

export default Scene
