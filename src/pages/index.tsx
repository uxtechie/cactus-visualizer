import { FC, useEffect, useState } from 'react'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { MaterialModel, getMaterialList } from '@Models/material'
import { Scene } from 'src/modules/scene'
const Home: FC = () => {
  const [materialList, setMaterialList] = useState<MaterialModel[]>([])
  const [error, setError] = useState<AppErrorMessage | null>(null)

  useEffect(() => {
    getMaterialList()
      .then((materials) => setMaterialList(materials))
      .catch(() => setError(AppErrorMessage.GetMaterialsFailed))
  }, [])

  console.log('materials', materialList)
  console.log('error', error)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Scene />
    </div>
  )
}

export default Home
