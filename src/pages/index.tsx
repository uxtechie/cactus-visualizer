import { FC, useEffect, useState } from 'react'
import { getPointList } from '@Services/firebaseClient'
import { AppErrorMessage } from '@Constants/AppErrorMessage'

const Home: FC = () => {
  const [pointList, setPointList] = useState({})
  const [error, setError] = useState<AppErrorMessage | null>(null)

  useEffect(() => {
    getPointList()
      .then((points) => setPointList(points))
      .catch(() => setError(AppErrorMessage.PointsFailed))
  }, [])

  console.log('points', pointList)
  console.log('error', error)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      ESTUDIO CACTUS VISUALIZER TEST
    </div>
  )
}

export default Home
