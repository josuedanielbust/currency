import '../styles/globals.css'
import React from 'react'

const CurrencyApp = ({
  Component,
  ...props
}: {
  Component: any
}) => {
  const { pageProps } = props as any
  return <Component {...pageProps} />
}

export default CurrencyApp
