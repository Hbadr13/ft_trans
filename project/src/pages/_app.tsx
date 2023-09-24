import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/model'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}
