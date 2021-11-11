import React from 'react'
import Theme from '@codeday/topo/Theme'
import type {AppProps} from 'next/app'

export default function Home ({ Component, pageProps }: AppProps) {
  return (
    <Theme brandColor="red" cookies={pageProps.cookies}>
      <Component {...pageProps}/>
    </Theme>
  )
}
