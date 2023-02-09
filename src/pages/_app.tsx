import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer';
import Header from '../components/Header';
import FooterInformative from '../components/FooterInformative';
import { globalStyles } from '../styles/global';
import { Container, ContentFooter, FooterContainer, HeaderContainer, MainContainer } from '../styles/pages/app';
import { CartProvider } from '../context/CartContext';

globalStyles();

export default function App({ Component, pageProps, router }: AppProps) {
  const isAdmin = router.asPath === '/admin'

  return (
    <ChakraProvider>
      <CartProvider>
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
          <Analytics />
        </AnimatePresence>        
      </CartProvider>
    </ChakraProvider>
  )
}
