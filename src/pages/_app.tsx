import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer';
import Header from '../components/Header';
import FooterInformative from '../components/FooterInformative';
import { globalStyles } from '../styles/global';
import { Container, ContentFooter, FooterContainer, HeaderContainer, MainContainer } from '../styles/pages/app';


globalStyles();

export default function App({ Component, pageProps, router }: AppProps) {
  const isAdmin = router.asPath === '/admin'

  return (
    <AnimatePresence initial={false}>
      <Container>
        <HeaderContainer visible={isAdmin ? 'hidden' : 'show'}>
          <Header />
        </HeaderContainer>
        <MainContainer render={{"@initial": 'mobile', "@bp2": "desktop"}}>
          <Component {...pageProps} key={router.asPath} onExitComplete={() => window.scrollTo(0, 0)}/>
        </MainContainer>

        <FooterInformative isAdmin={isAdmin} />
        <FooterContainer visible={isAdmin ? 'hidden' : 'show'}>
          <ContentFooter>
            <Footer />
          </ContentFooter>
        </FooterContainer>
      </Container>
    </AnimatePresence>
  )
}
