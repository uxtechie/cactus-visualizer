import { FC, useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { PointModel, getPointList } from '@Models/point'
import { MaterialModel, getMaterialList } from '@Models/material'

import { Scene } from 'src/modules/Scene'
import { MaterialsPaginator } from 'src/modules/MaterialsPaginator'
import MainLayout, { MainLayoutProps } from 'src/shared/layouts/MainLayout/MainLayout'
import { PointMaterialProxy } from '@Types'
import { compareObjectsBy } from '@Utils/collection'

interface HomeStaticProps {
  pointList: PointModel[]
  error?: AppErrorMessage
}

const Home: FC<MainLayoutProps & HomeStaticProps> = ({ pointList, error: pointError }) => {
  const [selectedPoint, setSelectedPoint] = useState<PointModel>()
  const [loadingPoint, setLoadingPoint] = useState(false)

  const [materialList, setMaterialList] = useState<MaterialModel[]>([])
  const [pointMaterialProxy, setPointMaterialProxy] = useState<PointMaterialProxy>({})

  const [error, setError] = useState<AppErrorMessage | undefined>(pointError)

  useEffect(() => {
    if (selectedPoint === undefined) {
      return
    }

    getMaterialList(selectedPoint.id)
      .then((materialList) => {
        const sortedMaterials = materialList.sort(compareObjectsBy('name'))
        setMaterialList(sortedMaterials)
      })
      .catch(() => setError(AppErrorMessage.GetMaterialsFailed))
  }, [selectedPoint])

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

  return error
    ? <p>{`error message: ${error}`}</p>
    : (
      <MainLayout
        sideBar={<MaterialsPaginator
          selectedPoint={selectedPoint}
          selectMaterialHandler={selectMaterialHandler}
          pointMaterialProxy={pointMaterialProxy}
          materialList={materialList}
                 />}
      >
        <Scene
          selectPointHandler={setSelectedPoint}
          selectedPoint={selectedPoint}
          loadingPoint={loadingPoint}
          setLoadingPoint={setLoadingPoint}
          pointList={pointList}
          pointMaterialProxy={pointMaterialProxy}
        />
      </MainLayout>
      )
}

export const getStaticProps: GetStaticProps<HomeStaticProps> = async (context) => {
  const props: HomeStaticProps = {
    pointList: []
  }

  try {
    props.pointList = await getPointList()
  } catch (error) {
    props.error = AppErrorMessage.GetPointsFailed
  }

  return { props, revalidate: 100 }
}

export default Home
