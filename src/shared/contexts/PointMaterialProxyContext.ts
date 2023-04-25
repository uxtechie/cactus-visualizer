import { PointMaterialProxy } from '@Types'
import { Dispatch, SetStateAction, createContext } from 'react'

interface PointMaterialProxyContextProps {
  pointMaterialProxy: PointMaterialProxy
  setPointMaterialProxy: Dispatch<SetStateAction<PointMaterialProxy>>
}

export const PointMaterialProxyContext = createContext<PointMaterialProxyContextProps>(
  {
    pointMaterialProxy: {},
    setPointMaterialProxy: () => {}
  })
