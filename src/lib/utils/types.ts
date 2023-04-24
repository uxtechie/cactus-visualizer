export interface PaginateProps<T> {
  itemList: T[]
  pageSize: number
  currentPage: number
}
