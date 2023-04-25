import { Dispatch, SetStateAction, createContext } from 'react'

interface LoadingPointContextProps {
  loadingPoint: boolean
  setLoadingPoint: Dispatch<SetStateAction<boolean>>
}

export const LoadingPointContext = createContext<LoadingPointContextProps>(
  {
    loadingPoint: false,
    setLoadingPoint: () => {}
  })
