import { Html, Head, Main, NextScript } from 'next/document'
import { FC } from 'react'

const Document: FC = () => {
  // body background
  const backgroundClass = `
  bg-cover bg-[url('/base.jpeg')]
  `

  return (
    <Html lang='en'>
      <Head />
      <body className={backgroundClass}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
