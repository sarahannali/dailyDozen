import '../styles.css'
import AppLayout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}