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
  selectedMaterial?: MaterialModel
}

const Scene: FC<SceneProps> = ({ selectedPointHandler, selectedMaterial }) => {
  const [pointList, setPointList] = useState<PointModel[]>([])
  const [error, setError] = useState<AppErrorMessage | null>(null)

  useEffect(() => {
    getPointList()
      .then((points) => setPointList(points))
      .catch(() => setError(AppErrorMessage.GetPointsFailed))
  }, [])

  console.log('points', pointList)
  console.log('error', error)

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
    </article>
  )
}

export default Scene
