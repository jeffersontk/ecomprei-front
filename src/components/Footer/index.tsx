import Image from 'next/image';
import React from 'react';
import { AboutUs, Container, Informative, Section } from './Footer';
import logo from '../../assets/logo-ecomprei-white.svg'
import {FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp} from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <Container>
      <Section>
        <div>
          <a href="#">
            <Image src={logo} alt="É Comprei" />
          </a>
          <AboutUs>
            <h2>Sobre nós</h2>
            <p>Lorem ipsum dolor sit amet consectetur. Sit lorem consequat purus aliquam neque duis. Fermentum odio enim placerat non tristique adipiscing sed. Rutrum viverra arcu mi posuere at vitae imperdiet a. Eget volutpat integer at nisl fusce ornare sed iaculis.</p>
            <p>Lorem ipsum dolor sit amet consectetur. Sit lorem consequat purus aliquam neque duis. Fermentum odio enim placerat non tristique adipiscing sed. Rutrum viverra arcu mi posuere at vitae imperdiet a. Eget volutpat integer at nisl fusce ornare sed iaculis.</p>
          </AboutUs>
        </div>
        <form>
          <h3>Entre em contato</h3>
          <input placeholder='Nome'/>
          <input placeholder='E-mail'/>
          <input placeholder='Telefone'/>
          <textarea placeholder='Deixe sua mensagem' maxLength={150} />
          <button type="submit">Enviar</button>
        </form>
      </Section>
      <Informative>
        <div>Direitos reservados ecomprei.shop</div>
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