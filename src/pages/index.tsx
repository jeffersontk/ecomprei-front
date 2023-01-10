import Image from "next/image";
import hero from '../assets/hero.png'
import { Banner, Container } from "../styles/pages/home";

export default function Home() {
  return (
    <Container>
      <Banner>
        <Image src={hero} alt="banner é fácil, é rápido, é comprei" title="é fácil, é rápido, é comprei"/>
        <a href="#" title="compre agora">Compre agora</a>
      </Banner>

      <section>

      </section>
    </Container>
  )
}
