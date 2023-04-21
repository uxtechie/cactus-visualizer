import { firebaseDb } from '@Services/firebaseClient'
import { collection, query, getDocs, Query } from 'firebase/firestore'

export interface PointModel {
  id: string
  coordX: number
  coordY: number
  name: string
}

const pointsRef = collection(firebaseDb, 'points')

export const getPointList = async (): Promise<PointModel[]> => {
  const pointsQuery = query(pointsRef) as Query<PointModel>
  const pointList: PointModel[] = []

  const pointsSnapshot = await getDocs<PointModel>(pointsQuery)

  pointsSnapshot.forEach((point) => {
    const pointData = point.data() as Omit<PointModel, 'id'>

    pointList.push({
      id: point.id,
      ...pointData
    })
  })

  return pointList
}
