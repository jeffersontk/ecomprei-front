import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer';
import Header from '../components/Header';
import { globalStyles } from '../styles/global';
import { Container, ContentFooter, FooterContainer, HeaderContainer, MainContainer } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode='sync' initial={false}>
      <Container>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <MainContainer>
          <Component {...pageProps} key={router.asPath} onExitComplete={() => window.scrollTo(0, 0)}/>
        </MainContainer>
        <FooterContainer>
          <ContentFooter>
            <Footer />
          </ContentFooter>
        </FooterContainer>
      </Container>
    </AnimatePresence>
  )
}
