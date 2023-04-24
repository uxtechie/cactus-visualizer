import { PointModel } from '@Models/point'
import { FC, useState, useEffect } from 'react'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { MaterialModel, getMaterialList } from '@Models/material'
import { Scene } from 'src/modules/Scene'
import { MaterialsPaginator } from 'src/modules/MaterialsPaginator'
import MainLayout, { MainLayoutProps } from 'src/shared/layouts/MainLayout/MainLayout'
import { PointMaterialProxy } from '@Types'

const Home: FC<MainLayoutProps> = () => {
  const [selectedPoint, setSelectedPoint] = useState<PointModel>()
  const [loadingPoint, setLoadingPoint] = useState(false)

  const [materialList, setMaterialList] = useState<MaterialModel[]>([])
  const [pointMaterialProxy, setPointMaterialProxy] = useState<PointMaterialProxy>({})

  const [error, setError] = useState<AppErrorMessage>()

  useEffect(() => {
    getMaterialList()
      .then((materials) => setMaterialList(materials))
      .catch(() => setError(AppErrorMessage.GetMaterialsFailed))
  }, [])

  const selectMaterialHandler = (material: MaterialModel): void => {
    if (selectedPoint === undefined) {
      throw new Error('No point selected')
    }

    setPointMaterialProxy({
      ...pointMaterialProxy,
      [selectedPoint.id]: material
    })

    setLoadingPoint(true)
  }

  return (
    <MainLayout
      sideBar={<MaterialsPaginator
        selectedPoint={selectedPoint}
        selectMaterialHandler={selectMaterialHandler}
        materialList={materialList}
               />}
    >
      <Scene
        selectPointHandler={setSelectedPoint}
        selectedPoint={selectedPoint}
        loadingPoint={loadingPoint}
        setLoadingPoint={setLoadingPoint}
        pointMaterialProxy={pointMaterialProxy}
      />
    </MainLayout>
  )
}

export default Home
