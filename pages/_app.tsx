import '../styles/global.scss'
import type { AppProps } from 'next/app'

if (process.browser) {
    // Initialize reflow globally
    // https://github.com/MeharGaur/reflow
    import('reflow-breakpoints')
}

function Retort ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default Retort
