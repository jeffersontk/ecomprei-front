import Link from 'next/link';
import React from 'react';
import Cards from '../../components/Cards';
import Categories from '../../components/Categories';
import { GridCards } from '../../styles/pages/home';
import { Container, FilterSection } from '../../styles/pages/produtos';

const produto: React.FC = () => {
  return (
    <Container>
      <Categories />

      <section>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
      
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