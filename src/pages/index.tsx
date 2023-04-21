import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { PointModel, getPointList } from '@Models/point'
import { MaterialModel, getMaterialList } from '@Models/material'
import baseImage from '@Images/base.jpeg'
const Home: FC = () => {
  const [pointList, setPointList] = useState<PointModel[]>([])
  const [materialList, setMaterialList] = useState<MaterialModel[]>([])
  const [error, setError] = useState<AppErrorMessage | null>(null)

  useEffect(() => {
    getPointList()
      .then((points) => setPointList(points))
      .catch(() => setError(AppErrorMessage.GetPointsFailed))

    getMaterialList()
      .then((materials) => setMaterialList(materials))
      .catch(() => setError(AppErrorMessage.GetMaterialsFailed))
  }, [])

  console.log('points', pointList)
  console.log('materials', materialList)
  console.log('error', error)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Image
        src={baseImage}
        alt='Modern kitchen'
        priority
      />
    </div>
  )
}

export default Home
