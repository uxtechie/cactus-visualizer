import { ComparatorReturnValues } from './enums'

export interface PaginateProps<T> {
  itemList: T[]
  pageSize: number
  currentPage: number
}

export interface PaginateState<T> {
  currentPageItems: T[]
  previousPageAvailable: boolean
  nextPageAvailable: boolean
}

export type ComparatorFn<T> = (first: T, second: T) => ComparatorReturnValues
