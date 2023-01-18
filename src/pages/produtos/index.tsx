import { GetStaticProps } from 'next';
import { ImageUrl, Product, variantProduct } from 'prisma/prisma-client';
import React, { useEffect } from 'react';
import Categories from '../../components/Categories';
import SimpleCard from '../../components/SimpleCard';
import Slider from '../../components/Slider';
import { getProducts } from '../../server/lib/products';
import { GridCards } from '../../styles/pages/home';
import { Container, Title } from '../../styles/pages/produtos';

export default function Produtos({products}: any) {
  return (
    <Container>
      <Categories />

      <Slider />

      <Title>Produtos em Destaques</Title>

      <GridCards render={{"@initial": 'mobile', "@bp2": 'desktop'}}>
        {
          products &&
          products.map((product:any) => (
            <SimpleCard  
              key={product.id}
              discount={product.discount}
              imgUrl={product.ImageUrl}
              price={product.price}
              title={product.title}
            />
          ))
        }
      </GridCards>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts()

  return {
    props: {
      products
    },
    revalidate: 5
  }
}