import { FC, useState, useEffect, useContext } from 'react'
import { PointModel } from '@Models/point'
import { MaterialModel, getMaterialList } from '@Models/material'
import { MaterialCard } from './components/MaterialCard'
import { DEFAULT_PAGE_SIZE } from '@/src/appConfig'
import { PointMaterialProxy } from '@Types'
import { Button } from '@Components/Button'
import { paginate, compareObjectsBy, arrayMoveElement } from '@Utils/collection'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { PointMaterialProxyContext } from '@Contexts/PointMaterialProxyContext'
import { LoadingPointContext } from '@Contexts/LoadingPointContext'

interface MaterialsPaginatorProps {
  pageSize?: number
  selectedPoint?: PointModel
}

const DEFAULT_INITIAL_PAGE = 1

const MaterialsPaginator: FC<MaterialsPaginatorProps> = ({
  pageSize = DEFAULT_PAGE_SIZE,
  selectedPoint
}) => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_INITIAL_PAGE)

  const { pointMaterialProxy, setPointMaterialProxy } = useContext(PointMaterialProxyContext)
  const { setLoadingPoint } = useContext(LoadingPointContext)

  const [materialList, setMaterialList] = useState<MaterialModel[]>([])
  const [fetchMaterialsError, setError] = useState<AppErrorMessage | undefined>()

  const selectedMaterialId = _getSelectedMaterialId(pointMaterialProxy, selectedPoint)

  useEffect(() => {
    if (selectedPoint === undefined) {
      return
    }

    getMaterialList(selectedPoint.id)
      .then((materialList) => {
        materialList.sort(compareObjectsBy('name'))
        _moveSelectedMaterialFirst(materialList, selectedMaterialId)

        setCurrentPage(DEFAULT_INITIAL_PAGE)
        setMaterialList(materialList)
      })
      .catch(() => setError(AppErrorMessage.GetMaterialsFailed))
  }, [selectedPoint])

  const currentPageMaterialList = paginate({
    itemList: materialList,
    pageSize,
    currentPage
  })

  const previousPageAvailable = currentPage > 1

  const nextPageAvailable = currentPage < Math.ceil(materialList.length / pageSize)

  const selectMaterialHandler = (newSelectedMaterial: MaterialModel): void => {
    if (selectedPoint === undefined) {
      throw new Error('No point selected')
    }

    // nothing changes
    if (newSelectedMaterial.id === selectedMaterialId) {
      return
    }

    setLoadingPoint(true)

    setPointMaterialProxy({
      ...pointMaterialProxy,
      [selectedPoint.id]: newSelectedMaterial
    })
  }

  return fetchMaterialsError
    ? <p>{`error message: ${fetchMaterialsError}`}</p>
    : (
      <nav className='flex flex-col w-full h-full place-content-around items-end text-white pr-2'>
        <Button
          icon='arrowUp'
          onClick={() => {
            setCurrentPage(currentPage - 1)
          }}
          disabled={!previousPageAvailable}
          pulse={previousPageAvailable}
        />

        <ul className='flex w-full flex-col items-end space-y-3 pl-3'>
          {currentPageMaterialList.map((material, index) => <MaterialCard
            key={index} material={material}
            onClickHandler={selectMaterialHandler}
            selected={
            material.id === selectedMaterialId
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
          pulse={nextPageAvailable}
        />
      </nav>
      )
}

export default MaterialsPaginator

// private helpers
const _moveSelectedMaterialFirst = (
  materialList: MaterialModel[],
  selectedMaterialId?: string
): void => {
  if (selectedMaterialId === undefined) {
    return
  }

  const selectedMaterialIndex = materialList.findIndex(
    (material) => material.id === selectedMaterialId
  )

  arrayMoveElement({
    source: materialList,
    fromIndex: selectedMaterialIndex,
    toIndex: 0
  })
}

const _getSelectedMaterialId = (
  pointMaterialProxy: PointMaterialProxy,
  selectedPoint?: PointModel
): string | undefined => {
  if (selectedPoint === undefined) {
    return undefined
  }

  const selectedMaterial = pointMaterialProxy[selectedPoint.id]

  return selectedMaterial?.id
}
