import React from 'react';
import Cards from '../../components/Cards';
import Categories from '../../components/Categories';
import Layout from '../../components/Layout';
import { GridCards } from '../../styles/pages/home';
import { Container, Product, ProductSlider, Title } from '../../styles/pages/produtos';

const produto: React.FC = () => {
  return (
    <Layout>
      <Container>
        <Categories />

        <ProductSlider>
          <Product className='product1'><a href="#">Comprar</a></Product>
          <Product className='product2'><a href="#">Comprar</a></Product>
          <Product className='product3'><a href="#">Comprar</a></Product>
          <Product className='product4'><a href="#">Comprar</a></Product>
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
    </Layout>
  );
}

export default produto;