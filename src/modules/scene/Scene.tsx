import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import baseImage from '@Images/base.jpeg'
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

  console.log('points', pointList)
  console.log('error', error)

  const selectedPointId = selectedPoint?.id
  const selectedMaterialName = selectedMaterial?.name

  const currentLayer = (selectedPointId !== undefined) ? selectedMaterial?.layers[selectedPointId] : undefined

  return (
    <article className='absolute'>
      <Image
        src={baseImage}
        alt='Modern kitchen'
        priority
      />
      {pointList.map((point, index) => (
        <TouchButton
          key={index}
          point={point} onClickHandler={selectedPointHandler}
        />
      ))}
      {currentLayer !== undefined && <Image
        src={currentLayer}
        height={100}
        width={1000}
        alt={
          `${selectedMaterialName !== undefined ? selectedMaterialName : ''} material`
}
                                     />}
    </article>
  )
}

export default Scene
