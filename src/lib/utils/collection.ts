import { ComparatorReturnValues } from './enums'
import { ComparatorFn, PaginateProps } from './types'

export const paginate = <T>(
  { itemList, pageSize, currentPage }: PaginateProps<T>
): T[] => {
  if (pageSize <= 0 || currentPage <= 0) {
    throw new Error('pageSize and currentPage must be greater than 0')
  }

  return itemList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
}

export const compareObjectsBy = <T>(propName: keyof T): ComparatorFn<T> => {
  const comparator: ComparatorFn<T> = (first, second) => {
    if (first[propName] < second[propName]) { return ComparatorReturnValues.LESS_THAN }
    if (first[propName] > second[propName]) { return ComparatorReturnValues.GREATER_THAN }

    return ComparatorReturnValues.EQUAL
  }
  return comparator
}

export const arrayMoveElement = <T>(
  { source, fromIndex, toIndex }: { source: T[], fromIndex: number, toIndex: number }
): void => {
  const element = source[fromIndex]
  source.splice(fromIndex, 1)
  source.splice(toIndex, 0, element)
}
