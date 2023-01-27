import { GetStaticProps } from 'next';
import Head from 'next/head';
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
    <>
      <Head>
        <title>É comprei - Explorar</title>
      </Head>
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
              id={product.id}
              discount={product.discount}
              imgUrl={product.ImageUrl}
              price={product.price}
              title={product.title}
              />
              ))
            }
        </GridCards>
      </Container>
    </>
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