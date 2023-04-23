import type { PointMaterialLayersProps } from 'src/modules/Scene/components/PointMaterialLayers/PointMaterialLayers'

export type GenericVoidHandler = () => void
export type GenericItemHandler<T> = (item: T) => void
export interface PointMaterialProxy {
  [pointId: string]: PointMaterialLayersProps
}
