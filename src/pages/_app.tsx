import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer'
import Header from '../components/Header'
import FooterInformative from '../components/FooterInformative'
import { globalStyles } from '../styles/global'
import {
  Container,
  ContentFooter,
  FooterContainer,
  HeaderContainer,
  MainContainer,
  MainContainerAdmin,
} from '../styles/pages/app'
import { CartProvider } from '../context/CartContext'
import AsideAdminMenu from '../components/molecules/AsideAdminMenu'

globalStyles()

export default function App({ Component, pageProps, router }: AppProps) {
  const isAdminScreens = router.asPath.includes('admin')
  const isAuthScreens = router.asPath.includes('auth')

  if (isAdminScreens) {
    return (
      <ChakraProvider>
        <MainContainerAdmin>
          <AsideAdminMenu />
          <Component
            {...pageProps}
            key={router.asPath}
            onExitComplete={() => window.scrollTo(0, 0)}
          />
        </MainContainerAdmin>
      </ChakraProvider>
    )
  }

  if (isAuthScreens) {
    return (
      <ChakraProvider>
        <>
          <Component
            {...pageProps}
            key={router.asPath}
            onExitComplete={() => window.scrollTo(0, 0)}
          />
        </>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider>
      <CartProvider>
        <AnimatePresence initial={false}>
          <Container>
            <HeaderContainer>
              <Header />
            </HeaderContainer>
            <MainContainer render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
              <Component
                {...pageProps}
                key={router.asPath}
                onExitComplete={() => window.scrollTo(0, 0)}
              />
            </MainContainer>

            <FooterInformative />
            <FooterContainer>
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
