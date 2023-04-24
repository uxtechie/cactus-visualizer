import { PaginateProps } from './types'

export const paginate = <T>(
  { itemList, pageSize, currentPage }: PaginateProps<T>
): T[] => {
  if (pageSize <= 0 || currentPage <= 0) {
    throw new Error('pageSize and currentPage must be greater than 0')
  }

  return itemList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
}
