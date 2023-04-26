import { FC, useState } from 'react'
import { GetStaticProps } from 'next'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { PointModel, getPointList } from '@Models/point'
import { MainLayout } from '@Layouts/MainLayout'
import { MaterialsPaginator } from '@Modules/MaterialsPaginator'
import { Playground } from '@Modules/Playground'

interface HomeStaticProps {
  pointList: PointModel[]
  fetchPointsError?: AppErrorMessage
}

const Home: FC<HomeStaticProps> = ({ pointList, fetchPointsError }) => {
  const [selectedPoint, setSelectedPoint] = useState<PointModel>()

  return fetchPointsError
    ? <p>{`error message: ${fetchPointsError}`}</p>
    : (
      <MainLayout
        sideBar={<MaterialsPaginator selectedPoint={selectedPoint} />}
      >
        <Playground
          setSelectedPoint={setSelectedPoint}
          selectedPoint={selectedPoint}
          pointList={pointList}
        />
      </MainLayout>
      )
}

export const getStaticProps: GetStaticProps<HomeStaticProps> = async (
  context
) => {
  const props: HomeStaticProps = {
    pointList: []
  }

  try {
    props.pointList = await getPointList()
  } catch (error) {
    props.fetchPointsError = AppErrorMessage.GetPointsFailed
  }

  return { props, revalidate: 100 }
}

export default Home
