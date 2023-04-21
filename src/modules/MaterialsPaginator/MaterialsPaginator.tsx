import { FC, useState } from 'react'
import { MaterialModel } from '@Models/material'
import { PointModel } from '@Models/point'
import { IconArrowUp } from '@Icons/IconArrowUp'
import { IconArrowDown } from '@Icons/IconArrowDown'
import { MaterialCard } from './components/MaterialCard'
import { GenericItemHandler } from '@Types'
import { DEFAULT_PAGE_SIZE } from '@Constants/appConfig'

interface MaterialsPaginatorProps {
  pageSize?: number
  selectedPoint?: PointModel
  selectedMaterial?: MaterialModel
  materialList: MaterialModel[]
  selectedMaterialHandler: GenericItemHandler<MaterialModel>
}

const MaterialsPaginator: FC<MaterialsPaginatorProps> = ({
  pageSize = DEFAULT_PAGE_SIZE,
  selectedPoint,
  materialList,
  selectedMaterial,
  selectedMaterialHandler
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const selectedPointMaterials = (selectedPoint != null)
    ? materialList.filter(
      (material) => material.points.includes(selectedPoint.id)
    )
    : []

  const materialsToShow = selectedPointMaterials.slice(
    (currentPage - 1) * pageSize
  )
  return (
    <nav className=''>
      <IconArrowUp
        style={{
          pointerEvents: currentPage === 1 ? 'none' : 'auto'
        }}
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }}
      />
      {materialsToShow.map((material, index) => <MaterialCard
        key={index} material={material}
        onClickHandler={selectedMaterialHandler}
        selected={material.id === selectedMaterial?.id}
                                                />
      )}
      <IconArrowDown
        style={{
          pointerEvents: currentPage >= selectedPointMaterials.length / pageSize ? 'none' : 'auto'
        }}
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }}
      />
    </nav>
  )
}

export default MaterialsPaginator
