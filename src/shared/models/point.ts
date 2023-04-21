import { firebaseDb } from '@Services/firebaseClient'
import { collection, query, getDocs } from 'firebase/firestore'

export interface PointModel {
  id: string
  coordX: number
  coordY: number
  name: string
}

const pointsRef = collection(firebaseDb, 'points')

const pointsQuery = query(pointsRef)

export const getPointList = async (): Promise<PointModel[]> => {
  const pointList: PointModel[] = []

  const pointsSnapshot = await getDocs(pointsQuery)

  pointsSnapshot.forEach((point) => {
    const pointData = point.data() as Omit<PointModel, 'id'>

    pointList.push({
      id: point.id,
      ...pointData
    })
  })

  return pointList
}
