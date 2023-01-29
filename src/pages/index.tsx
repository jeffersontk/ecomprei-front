import { Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import SimpleCard from "../components/SimpleCard";
import { getProducts } from "../server/lib/products";
import { stripe } from "../server/lib/stripe";
import { Container, GridCards, SectionHighlighted } from "../styles/pages/home";
import { ProductUpdate } from "../utils/types/productsType";

interface HomeProps {
  products: ProductUpdate[]
}

export default function Home({products}: HomeProps) {
  return (
    <>
      <Head>
        <title>É Comprei</title>
      </Head>
      <Container>
        <Banner />

        <SectionHighlighted render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <Categories />
          <Text py="2rem" fontWeight={600} color={'orange.500'} fontSize="lg">Destaques da semana</Text>
          <GridCards render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
            {
              products &&
              products.map((product:any) => {
                if(product.highlighted){
                 return (
                    <SimpleCard  
                      key={product.id}
                      id={product.id}
                      discount={product.discount}
                      imgUrl={product.ImageUrl}
                      price={product.price}
                      title={product.title}
                      sizes={product.sizes}
                      variantColors={product.variants}
                    />
                  )
                }
              })
            }
          </GridCards>
        </SectionHighlighted>
      </Container>
     </> 
  )
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