import { firebaseDb } from '@Services/firebaseClient'
import { collection, query, getDocs, Query, orderBy } from 'firebase/firestore'

export interface MaterialModel {
  id: string
  layers: Record<string, string>
  materialPreview: string
  name: string
  points: string[]
}

const materialsRef = collection(firebaseDb, 'materials')

export const getMaterialList = async (): Promise<MaterialModel[]> => {
  const materialsQuery = query(materialsRef, orderBy('name')) as Query<MaterialModel>
  const materialList: MaterialModel[] = []

  const materialsSnapshot = await getDocs<MaterialModel>(materialsQuery)

  materialsSnapshot.forEach((material) => {
    const materialData = material.data() as Omit<MaterialModel, 'id'>

    materialList.push({
      id: material.id,
      ...materialData
    })
  })

  return materialList
}
