import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default  function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <link href='https://fonts.googleapis.com/css?family=Josefin Sans' rel='stylesheet'></link>
    <div className='fontjo'>
      <Component {...pageProps} />
    </div>
  </>
  )
}
