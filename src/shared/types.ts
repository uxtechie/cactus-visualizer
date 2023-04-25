import type { MaterialModel } from '@Models/material'

export type GenericVoidHandler = () => void
export type GenericItemHandler<T> = (item: T) => void
export interface PointMaterialProxy {
  [pointId: string]: MaterialModel
}

export type SizeOptions = 'sm' | 'md' | 'lg'
