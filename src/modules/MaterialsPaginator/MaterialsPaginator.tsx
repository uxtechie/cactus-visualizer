import { FC, useState, useEffect } from 'react'
import { PointModel } from '@Models/point'
import { MaterialModel, getMaterialList } from '@Models/material'
import { MaterialCard } from './components/MaterialCard'
import { DEFAULT_PAGE_SIZE } from '@/src/appConfig'
import { GenericItemHandler, PointMaterialProxy } from '@Types'
import { Button } from '@Components/Button'
import { paginate } from '@Utils/collection'
import { compareObjectsBy } from '@Utils/collection'
import { AppErrorMessage } from '@Constants/AppErrorMessage'

interface MaterialsPaginatorProps {
  pageSize?: number
  selectedPoint?: PointModel
  pointMaterialProxy: PointMaterialProxy
  selectMaterialHandler: GenericItemHandler<MaterialModel>
}

const DEFAULT_INITIAL_PAGE = 1

const MaterialsPaginator: FC<MaterialsPaginatorProps> = ({
  pageSize = DEFAULT_PAGE_SIZE,
  selectedPoint,
  selectMaterialHandler,
  pointMaterialProxy
}) => {
  const [materialList, setMaterialList] = useState<MaterialModel[]>([])
  const [fetchMaterialsError, setError] = useState<AppErrorMessage | undefined>()

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

  const [currentPage, setCurrentPage] = useState(_getInitialPage(
    pointMaterialProxy, materialList, pageSize, selectedPoint))

  useEffect(() => {
    setCurrentPage(_getInitialPage(pointMaterialProxy, materialList, pageSize, selectedPoint))
  }, [selectedPoint])

  const currentPageMaterialItems = paginate({
    itemList: materialList,
    pageSize,
    currentPage
  })

  const previousPageAvailable = currentPage > 1

  const nextPageAvailable = currentPage < Math.ceil(materialList.length / pageSize)

  return fetchMaterialsError ?
    <p>{`error message: ${fetchMaterialsError}`}</p>
   : (
    <nav className='flex flex-col w-full h-full place-content-around items-end text-neutral-500 pr-2'>
      <Button
        icon='arrowUp'
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }}
        disabled={!previousPageAvailable}
        pulse={previousPageAvailable}
      />

      <ul className='flex w-full flex-col items-end space-y-3 pl-3'>
        {currentPageMaterialItems.map((material, index) => <MaterialCard
          key={index} material={material}
          onClickHandler={selectMaterialHandler}
          selected={
            material.id === _getSelectedMaterialId(pointMaterialProxy, selectedPoint)
          }
                                                           />
        )}
      </ul>

      <Button
        icon='arrowDown'
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }}
        disabled={!nextPageAvailable}
      />
    </nav>
  )
}

export default MaterialsPaginator

// private helpers
const _getInitialPage = (
  pointMaterialProxy: PointMaterialProxy,
  materialList: MaterialModel[],
  pageSize: number,
  selectedPoint?: PointModel
): number => {
  const selectedMaterialId = _getSelectedMaterialId(pointMaterialProxy, selectedPoint)

  if (selectedMaterialId === undefined) {
    return DEFAULT_INITIAL_PAGE
  }

  const selectedMaterialIndex = materialList.findIndex(
    (material) => material.id === selectedMaterialId
  )

  if (selectedMaterialIndex === -1) {
    return DEFAULT_INITIAL_PAGE
  }

  return Math.ceil(selectedMaterialIndex + 1 / pageSize)
}

const _getSelectedMaterialId = (
  pointMaterialProxy: PointMaterialProxy,
  selectedPoint?: PointModel
): string | undefined => {
  if (selectedPoint === undefined) {
    return undefined
  }

  const selectedMaterial = pointMaterialProxy[selectedPoint.id]

  return selectedMaterial !== undefined ? selectedMaterial.id : undefined
}
