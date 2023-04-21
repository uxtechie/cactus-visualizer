import { FC } from 'react'
import type { AppProps } from 'next/app'
import '@Styles/globals.css'
import { MainLayout } from 'src/shared/layouts/MainLayout'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default App
