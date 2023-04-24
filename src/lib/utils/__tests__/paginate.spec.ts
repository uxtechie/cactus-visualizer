import { paginate } from '../collection'
import type { PaginateProps } from '../types'

const fakeItemList = [
  {
    name: 'Item 1'
  },
  {
    name: 'Item 2'
  },
  {
    name: 'Item 3'
  },
  {
    name: 'Item 4'
  },
  {
    name: 'Item 5'
  }
]

const defaultPaginateConfig: PaginateProps<typeof fakeItemList[0]> = {
  itemList: fakeItemList,
  pageSize: 2,
  currentPage: 1
}

describe('paginate', () => {
  it('returns the requested items number from list, page 1', () => {
    expect(paginate(defaultPaginateConfig)).toEqual([
      {
        name: 'Item 1'
      },
      {
        name: 'Item 2'
      }
    ])
  })
  it('returns the requested items number from list, last page', () => {
    expect(paginate({ ...defaultPaginateConfig, currentPage: 3 })
    ).toEqual([
      {
        name: 'Item 5'
      }
    ])
  })
  it('returns empty list if there are not enough items', () => {
    expect(paginate({ ...defaultPaginateConfig, currentPage: 4 })
    ).toEqual([])
  })
  it('throw error if pageSize is less than 1 number', () => {
    expect(() => paginate({ ...defaultPaginateConfig, pageSize: 0 })
    ).toThrow('pageSize and currentPage must be greater than 0')
  })
  it('throw error if current page is less than 1 number', () => {
    expect(() => paginate({ ...defaultPaginateConfig, currentPage: 0 })
    ).toThrow('pageSize and currentPage must be greater than 0')
  })
})
