import { ComparatorReturnValues } from './enums'

export interface PaginateProps<T> {
  itemList: T[]
  pageSize: number
  currentPage: number
}

export type ComparatorFn<T> = (first: T, second: T) => ComparatorReturnValues
