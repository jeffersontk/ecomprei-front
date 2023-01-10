import Image from 'next/image';
import React from 'react';
import { Container, Informative, MenuFooter, Sac, Section } from './Footer';
import logo from '../../assets/logo-ecomprei.svg'
import {FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp} from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <Container>
      <Section>
        <div>
          <a href="#">
            <Image src={logo} alt="É Comprei" />
          </a>
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
              <a href="#">Quem somos</a>
            </li>
            <li>
              <a href="#">Troca e devoluções</a>
            </li>
            <li>
              <a href="#">Informações de entrega</a>
            </li>
            <li>
              <a href="#">Termos de uso e privacidade</a>
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
          <a href="#">
            <FaWhatsapp />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTiktok />
          </a>
          <a href="#">
            <FaFacebookF />
          </a>
        </div>
      </Informative>
    </Container>
  )
}

export default Footer;