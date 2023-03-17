import Image from 'next/image'
import React from 'react'
import {
  Container,
  Informative,
  MenuFooter,
  Sac,
  Section,
  SocialFooter,
} from './Footer'
import logo from '../../assets/logo-ecomprei.svg'
import { FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <Container>
      <Section render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
        <div>
          <Sac>
            <h4>ATENDIMENTO AO CLIENTE</h4>
            <span>
              <strong>SAC</strong> (Serviço de atendimento ao Cliente)
            </span>
            <span>
              <strong>E-mail:</strong> contato@ecomprei.shop
            </span>
            <span>
              <strong>Whatsapp:</strong> +55 (21) 966554433
            </span>
          </Sac>
        </div>
        <MenuFooter>
          <h4>Políticas e duvidas</h4>
          <ul>
            <li>
              <Link href="/sobre">Quem somos</Link>
            </li>
            <li>
              <Link href="/faq">Perguntas frequentes</Link>
            </li>
            <li>
              <Link href="#">Termos de uso e privacidade</Link>
            </li>
          </ul>
        </MenuFooter>
        <SocialFooter render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
          <Image src={logo} alt="É Comprei" />
          <div>
            <Link href="#">
              <FaWhatsapp />
            </Link>
            <Link href="#">
              <FaInstagram />
            </Link>
            <Link href="#">
              <FaTiktok />
            </Link>
            <Link href="#">
              <FaFacebookF />
            </Link>
          </div>
        </SocialFooter>
      </Section>
      <Informative render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
        <div>ⓒ Direitos reservados ecomprei.shop</div>
        <span>
          Preço e condições de pagamento exclusivos para compras neste site
          oficial, podendo variar com o tempo da oferta.
        </span>
      </Informative>
    </Container>
  )
}

export default Footer
