import Image from 'next/image';
import React from 'react';
import { Container, Informative, MenuFooter, Sac, Section } from './Footer';
import logo from '../../assets/logo-ecomprei.svg'
import {FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp} from 'react-icons/fa'
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <Container>
      <Section>
        <div>
          <Image src={logo} alt="É Comprei" />
      
          <Sac>
            <h4>ATENDIMENTO AO CLIENTE</h4>
            <span><strong>SAC</strong> (Serviço de atendimento ao Cliente)</span>
            <span><strong>E-mail:</strong> contato@ecomprei.shop</span>
            <span><strong>Whatsapp:</strong> +55 (21) 966554433</span>
          </Sac>
        </div>
        <MenuFooter>
          <h4>Políticas e duvidas</h4>
          <ul>
            <li>
              <Link href="/sobre">Quem somos</Link>
            </li>
            <li>
              <Link href="#">Troca e devoluções</Link>
            </li>
            <li>
              <Link href="#">Informações de entrega</Link>
            </li>
            <li>
              <Link href="#">Termos de uso e privacidade</Link>
            </li>
          </ul>
        </MenuFooter>
        <form>
          <span>Assine nossa newsletter e receba <br/> as melhores ofertas de GRAÇA!</span>
          <input placeholder='Seu e-mail'/>
          <button type="submit">Enviar</button>
        </form>
      </Section>
      <Informative>
        <div>ⓒ Direitos reservados ecomprei.shop</div>
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
      </Informative>
    </Container>
  )
}

export default Footer;