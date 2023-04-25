import { insecuredFirebaseDb } from '@Services/firebaseClient'
import { collection, query, getDocs, Query, where } from 'firebase/firestore'

export interface MaterialModel {
  id: string
  layers: Record<string, string>
  materialPreview: string
  name: string
  points: string[]
}

const materialsRef = collection(insecuredFirebaseDb, 'materials')

export const getMaterialList = async (pointId: string): Promise<MaterialModel[]> => {
  const materialsQuery = query(
    materialsRef,
    where('points', 'array-contains', pointId)
  ) as Query<MaterialModel>

  const materialsSnapshot = await getDocs<MaterialModel>(materialsQuery)

  const materialList: MaterialModel[] = []

  materialsSnapshot.forEach((material) => {
    const materialData = material.data() as Omit<MaterialModel, 'id'>

    materialList.push({
      id: material.id,
      ...materialData
    })
  })

  return materialList
}
