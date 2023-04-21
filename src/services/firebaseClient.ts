import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebaseConfig'
import { getFirestore, collection, query, getDocs, DocumentData } from 'firebase/firestore'
import { PointModel } from '@Models/point'

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const pointsRef = collection(db, 'points')

// Create a query against the collection.
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
