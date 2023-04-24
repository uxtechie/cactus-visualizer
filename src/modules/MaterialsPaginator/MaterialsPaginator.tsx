import { FC, useState } from 'react'
import { MaterialModel } from '@Models/material'
import { PointModel } from '@Models/point'
import { MaterialCard } from './components/MaterialCard'
import { DEFAULT_PAGE_SIZE } from 'src/appConfig'
import { GenericItemHandler } from '@Types'
import { Button } from '@Components/Button'

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
    <nav className='flex flex-col w-full h-full place-content-around items-end text-neutral-100 pr-2'>
      <Button
        icon='arrowUp'
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }}
        disabled={currentPage === 1}
      />

      <ul className='flex w-full flex-col items-end space-y-3 pl-3'>
        {materialsToShow.map((material, index) => <MaterialCard
          key={index} material={material}
          onClickHandler={onMaterialClick}
          selected={material.id === selectedMaterial?.id}
                                                  />
        )}
      </ul>

      <Button
        icon='arrowDown'
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }}
        disabled={currentPage >= selectedPointMaterials.length / pageSize}
      />
    </nav>
  )
}

export default MaterialsPaginator
