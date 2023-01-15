import React from 'react';
import Cards from '../../components/Cards';
import Categories from '../../components/Categories';
import Layout from '../../components/Layout';
import SimpleCard from '../../components/SimpleCard';
import Slider from '../../components/Slider';
import useMediaQuery from '../../hooks/useMediaQuery';
import { GridCards } from '../../styles/pages/home';
import { Container, Product, ProductSlider, Title } from '../../styles/pages/produtos';

export default function Produtos() {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
/*     <Layout> */
      <Container>
        <Categories />

        <Slider />

        <Title>Produtos em Destaques</Title>

        <GridCards render={{"@initial": 'mobile', "@bp2": 'desktop'}}>
          <SimpleCard />
          <SimpleCard />
        </GridCards>
      </Container>
/*     </Layout> */
  );
}