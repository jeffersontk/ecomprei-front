import Link from 'next/link';
import React from 'react';
import Cards from '../../components/Cards';
import Categories from '../../components/Categories';
import { GridCards } from '../../styles/pages/home';
import { Container, FilterSection, ProductSlider, Title } from '../../styles/pages/produtos';

const produto: React.FC = () => {
  return (
    <Container>
      <Categories />

      <ProductSlider>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </ProductSlider>

      <Title>Produtos em Destaques</Title>

      <GridCards>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </GridCards>
    </Container>
  );
}

export default produto;