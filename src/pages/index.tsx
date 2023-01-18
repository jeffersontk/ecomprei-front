import Image from "next/image";
import Link from "next/link";
import Banner from "../components/Banner";
import Cards from "../components/Cards";
import Categories from "../components/Categories";
import Layout from "../components/Layout";
import SimpleCard from "../components/SimpleCard";
import useMediaQuery from "../hooks/useMediaQuery";
import { Container, GridCards, SectionHighlighted } from "../styles/pages/home";

export default function Home() {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
/*     <Layout> */
      <Container>
        <Banner />

        <SectionHighlighted render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <Categories />
          <h2>Destaques da semana</h2>
          <GridCards render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
            {/* <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard /> */}
          </GridCards>
        </SectionHighlighted>
      </Container>
/*     </Layout> */
  )
}
