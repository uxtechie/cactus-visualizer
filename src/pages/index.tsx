import { PointModel } from '@Models/point'
import { FC, useState, useEffect } from 'react'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { MaterialModel, getMaterialList } from '@Models/material'
import { Scene } from 'src/modules/Scene'
import { MaterialsPaginator } from 'src/modules/MaterialsPaginator'
import MainLayout, { MainLayoutProps } from 'src/shared/layouts/MainLayout/MainLayout'

const Home: FC<MainLayoutProps> = () => {
  const [selectedPoint, setSelectedPoint] = useState<PointModel | undefined>()
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialModel | undefined>()

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
    <MainLayout
      sideBar={<MaterialsPaginator
        selectedPoint={selectedPoint}
        selectedMaterial={selectedMaterial}
        selectedMaterialHandler={setSelectedMaterial}
        materialList={materialList}
               />}
    >
      <Scene selectedPointHandler={setSelectedPoint} selectedMaterial={selectedMaterial} />
    </MainLayout>
  )
}

export default Home
