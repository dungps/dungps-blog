import "../styles/app.scss"
import type {AppContext, AppProps} from 'next/app'
import App from "next/app";

const idDev: boolean = process.env.NODE_ENV !== 'production'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const url = idDev ? 'http://localhost:3000' : 'https://www.dungps.com'

  const res = await fetch(`${url}/api/bootstrap`)
  const data = await res.json()

  appProps.pageProps['bootstrap'] = data.data

  return { ...appProps }
}

export default MyApp
