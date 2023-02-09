import { Box, Text } from '@chakra-ui/react';
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
        <Slider />

        <Categories />

        <Box px="1rem">
        <Text py="2rem" fontWeight={600} color={'orange.500'} fontSize="lg">Produtos em Destaques</Text>
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
                sizes={product.sizes}
                variantColors={product.variants}
                priceDefaultId={product.default_price?.id}
              />
              ))
            }
        </GridCards>
        </Box>
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