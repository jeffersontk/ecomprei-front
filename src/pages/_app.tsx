import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import {RiSecurePaymentFill, RiMailSendLine} from 'react-icons/ri'
import {FaShippingFast} from 'react-icons/fa'
import Footer from '../components/Footer';
import Header from '../components/Header';
import { globalStyles } from '../styles/global';
import { Container, ContentFooter, FooterContainer, HeaderContainer, InformativeContainer, MainContainer } from '../styles/pages/app';
import useMediaQuery from '../hooks/useMediaQuery';

globalStyles();

export default function App({ Component, pageProps, router }: AppProps) {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <AnimatePresence mode='sync' initial={false}>
      <Container>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <MainContainer render={{"@initial": 'mobile', "@bp2": "desktop"}}>
          <Component {...pageProps} key={router.asPath} onExitComplete={() => window.scrollTo(0, 0)}/>
        </MainContainer>

        <InformativeContainer render={{"@initial": 'mobile', "@bp2": "desktop"}}> 
          <div className='informative'>
            <RiSecurePaymentFill  size={75}/>
            <div className='informativeText'>
              <strong>Compra Segura</strong>
              <span>Ambiente seguro para pagamentos online</span>
            </div>
          </div>
          <div className='informative'>
            <FaShippingFast  size={75}/>
            <div className='informativeText'>
              <strong>Frete Grátis</strong>
              <span>Envio rápido e acompanhado com código de rastreio</span>
            </div>
          </div>
          <div className='informative'>
            <RiMailSendLine  size={75}/>
            <div className='informativeText'>
              <strong>Atendimento Rápido</strong>
              <span>Nossa equipe fará o atendimento o mais rápido possível</span>
            </div>
          </div>
        </InformativeContainer>
        <FooterContainer>
          <ContentFooter>
            <Footer />
          </ContentFooter>
        </FooterContainer>
      </Container>
    </AnimatePresence>
  )
}
