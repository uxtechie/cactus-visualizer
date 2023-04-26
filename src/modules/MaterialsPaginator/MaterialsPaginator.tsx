import { FC, useEffect, useContext, useReducer } from 'react'
import { PointModel } from '@Models/point'
import { MaterialModel, getMaterialList } from '@Models/material'
import { MaterialCard } from './components/MaterialCard'
import { PointMaterialProxy } from '@Types'
import { Button } from '@Components/Button'
import { compareObjectsBy, arrayMoveElement } from '@Utils/collection'
import { PointMaterialProxyContext } from '@Contexts/PointMaterialProxyContext'
import { LoadingPointContext } from '@Contexts/LoadingPointContext'
import { MATERIALS_PAGINATOR_INITIAL_STATE, MaterialsPaginatorActionType, materialsPaginatorReducer } from './materialsPaginatorReducer'

interface MaterialsPaginatorProps {
  selectedPoint?: PointModel
}

const MaterialsPaginator: FC<MaterialsPaginatorProps> = ({
  selectedPoint
}) => {
  const [
    {
      fetchMaterialsError,
      currentPageItems,
      previousPageAvailable,
      nextPageAvailable
    },
    dispatch
  ] = useReducer(materialsPaginatorReducer, MATERIALS_PAGINATOR_INITIAL_STATE)

  const { pointMaterialProxy, setPointMaterialProxy } = useContext(PointMaterialProxyContext)
  const { setLoadingPoint } = useContext(LoadingPointContext)

  const selectedMaterialId = _getSelectedMaterialId(pointMaterialProxy, selectedPoint)

  useEffect(() => {
    console.log('inside')
    if (selectedPoint === undefined) {
      return
    }

    getMaterialList(selectedPoint.id)
      .then((materialList) => {
        materialList.sort(compareObjectsBy('name'))
        _moveSelectedMaterialFirst(materialList, selectedMaterialId)

        dispatch({ type: MaterialsPaginatorActionType.INIT_PAGINATOR, newMaterialList: materialList })
      })
      .catch(() => dispatch({ type: MaterialsPaginatorActionType.SET_FETCH_ERROR }))
  }, [selectedPoint])

  console.log('paginator', currentPageItems)

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

  return true
    ? <p>{`error message: ${fetchMaterialsError}`}</p>
    : (
      <nav className='flex flex-col w-full h-full place-content-around items-end text-white pr-2'>
        <Button
          icon='arrowUp'
          onClick={() => dispatch({ type: MaterialsPaginatorActionType.DECREMENT_PAGE })}
          disabled={!previousPageAvailable}
          pulse={previousPageAvailable}
        />

        <ul className='flex w-full flex-col items-end space-y-3 pl-3'>
          {currentPageItems.map((material, index) => <MaterialCard
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
          onClick={() => dispatch({ type: MaterialsPaginatorActionType.INCREMENT_PAGE })}
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
