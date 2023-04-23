import { FC, useState } from 'react'
import { MaterialModel } from '@Models/material'
import { PointModel } from '@Models/point'
import { IconArrowUp } from '@Icons/IconArrowUp'
import { IconArrowDown } from '@Icons/IconArrowDown'
import { MaterialCard } from './components/MaterialCard'
import { DEFAULT_PAGE_SIZE } from 'src/appConfig'
import { GenericItemHandler } from '@Types'

interface MaterialsPaginatorProps {
  pageSize?: number
  selectedPoint?: PointModel
  materialList: MaterialModel[]
  selectMaterialHandler: GenericItemHandler<MaterialModel>
}

const INITIAL_PAGE = 1

const MaterialsPaginator: FC<MaterialsPaginatorProps> = ({
  pageSize = DEFAULT_PAGE_SIZE,
  selectedPoint,
  materialList,
  selectMaterialHandler
}) => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialModel>()

  const selectedPointMaterials = (selectedPoint !== undefined)
    ? materialList.filter(
      (material) => material.points.includes(selectedPoint.id)
    )
    : []

  const materialsToShow = selectedPointMaterials.slice(
    (currentPage - 1) * pageSize
  )

  const onMaterialClick = (material: MaterialModel): void => {
    selectMaterialHandler(material)
    setSelectedMaterial(material)
  }

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
        onClickHandler={onMaterialClick}
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
