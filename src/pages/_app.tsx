import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global';
import { Container, Header } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header></Header>
      <Component {...pageProps} />
    </Container>
  )
}
