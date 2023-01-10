import type { AppProps } from 'next/app'
import Footer from '../components/Footer';
import Header from '../components/Header';
import { globalStyles } from '../styles/global';
import { Container, ContentFooter, FooterContainer, HeaderContainer, MainContainer } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
      <FooterContainer>
        <ContentFooter>
          <Footer />
        </ContentFooter>
      </FooterContainer>
    </Container>
  )
}
