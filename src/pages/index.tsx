import Image from "next/image";
import hero from '../assets/hero.png'
import Cards from "../components/Cards";
import Categories from "../components/Categories";
import { Banner, Container, GridCards, SectionHighlighted } from "../styles/pages/home";

export default function Home() {
  return (
    <Container>
      <Banner>
        <Image src={hero} alt="banner é fácil, é rápido, é comprei" title="é fácil, é rápido, é comprei"/>
        <a href="/produtos" title="compre agora">Compre agora</a>
      </Banner>

      <SectionHighlighted>
        <Categories />
        <h2>Destaques da semana</h2>
        <GridCards>
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </GridCards>
      </SectionHighlighted>
    </Container>
  )
}
