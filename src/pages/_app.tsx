import { FC, useState } from 'react'
import type { AppProps } from 'next/app'
import '@Styles/globals.css'
import { PointMaterialContext } from '../shared/contexts/PointMaterialContext'
import { PointMaterialProxy } from '@Types'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [pointMaterialProxy, setPointMaterialProxy] = useState<PointMaterialProxy>({});

  return (
    <PointMaterialContext.Provider value={{
      pointMaterialProxy,
      setPointMaterialProxy
    }}>
      <Component {...pageProps} />
    </PointMaterialContext.Provider>
  )
}

export default App
