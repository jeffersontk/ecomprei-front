import React from 'react';
import Cards from '../../components/Cards';
import Categories from '../../components/Categories';
import Layout from '../../components/Layout';
import SimpleCard from '../../components/SimpleCard';
import useMediaQuery from '../../hooks/useMediaQuery';
import { GridCards } from '../../styles/pages/home';
import { Container, Product, ProductSlider, Title } from '../../styles/pages/produtos';

export default function Produtos() {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <Layout>
      <Container>
        <Categories />

        <ProductSlider visible={{'@initial': 'hidden', '@bp2': 'show'}}>
          <Product className='product1'><a href="#">Comprar</a></Product>
          <Product className='product2'><a href="#">Comprar</a></Product>
          <Product className='product3'><a href="#">Comprar</a></Product>
          <Product className='product4'><a href="#">Comprar</a></Product>
        </ProductSlider>

        <Title>Produtos em Destaques</Title>

        <GridCards render={{"@initial": 'mobile', "@bp2": 'desktop'}}>
          <SimpleCard />
          <SimpleCard />
        </GridCards>
      </Container>
    </Layout>
  );
}