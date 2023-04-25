import { FC, useState } from 'react'
import type { AppProps } from 'next/app'
import '@Styles/globals.css'
import { PointMaterialProxyContext } from '@Contexts/PointMaterialProxyContext'
import { PointMaterialProxy } from '@Types'
import { LoadingPointContext } from '@Contexts/LoadingPointContext'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [pointMaterialProxy, setPointMaterialProxy] = useState<PointMaterialProxy>({})
  const [loadingPoint, setLoadingPoint] = useState(false)

  return (
    <PointMaterialProxyContext.Provider value={{
      pointMaterialProxy,
      setPointMaterialProxy
    }}
    >
      <LoadingPointContext.Provider value={{
        loadingPoint,
        setLoadingPoint
      }}
      >
        <Component {...pageProps} />
      </LoadingPointContext.Provider>
    </PointMaterialProxyContext.Provider>
  )
}

export default App
