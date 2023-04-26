import { MATERIALS_PAGE_SIZE } from '@/src/appConfig'
import { DEFAULT_INITIAL_PAGE } from '@Constants/index'
import { AppErrorMessage } from '@Constants/AppErrorMessage'
import { MaterialModel } from '@Models/material'
import { paginate } from '@Utils/collection'
import type { PaginateState } from '@Utils/types'

export enum MaterialsPaginatorActionType {
  INCREMENT_PAGE = 'INCREMENT_PAGE',
  DECREMENT_PAGE = 'DECREMENT_PAGE',
  INIT_PAGINATOR = 'INIT_PAGINATOR',
  SET_FETCH_ERROR = 'SET_FETCH_ERROR',
  RESET = 'RESET'
}

interface MaterialsPaginatorAction {
  type: MaterialsPaginatorActionType
  newMaterialList?: MaterialModel[]
}

interface MaterialsPaginatorPros {
  currentPage: number
  materialList: MaterialModel[]
  fetchMaterialsError?: AppErrorMessage
}

type MaterialsPaginatorState = Readonly<MaterialsPaginatorPros> & PaginateState<MaterialModel>

export const MATERIALS_PAGINATOR_INITIAL_STATE: MaterialsPaginatorState = Object.freeze({
  currentPage: DEFAULT_INITIAL_PAGE,
  materialList: [],
  currentPageItems: [],
  previousPageAvailable: false,
  nextPageAvailable: false
})

export const materialsPaginatorReducer = (
  state: MaterialsPaginatorState,
  action: MaterialsPaginatorAction
): Readonly<MaterialsPaginatorState> => {
  const {
    newMaterialList = []
  } = action

  const { currentPage, materialList } = state

  switch (action.type) {
    case MaterialsPaginatorActionType.INCREMENT_PAGE:
      return {
        ...state,
        currentPage: currentPage + 1,
        ...paginate<MaterialModel>({
          itemList: materialList,
          pageSize: MATERIALS_PAGE_SIZE,
          currentPage: currentPage + 1
        })
      }

    case MaterialsPaginatorActionType.DECREMENT_PAGE:
      return {
        ...state,
        currentPage: currentPage - 1,
        ...paginate({
          itemList: materialList,
          pageSize: MATERIALS_PAGE_SIZE,
          currentPage: currentPage - 1
        })
      }

    case MaterialsPaginatorActionType.INIT_PAGINATOR:
      return {
        ...MATERIALS_PAGINATOR_INITIAL_STATE,
        materialList: newMaterialList,
        ...paginate({
          itemList: newMaterialList,
          pageSize: MATERIALS_PAGE_SIZE,
          currentPage: DEFAULT_INITIAL_PAGE
        })
      }

    case MaterialsPaginatorActionType.SET_FETCH_ERROR:
      return {
        ...state,
        fetchMaterialsError: AppErrorMessage.FETCH_MATERIALS_FAILED
      }

    case MaterialsPaginatorActionType.RESET:
      return MATERIALS_PAGINATOR_INITIAL_STATE

    default:
      return state
  }
}
