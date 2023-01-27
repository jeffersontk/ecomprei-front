import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Banner from "../components/Banner";
import Cards from "../components/Cards";
import Categories from "../components/Categories";
import Layout from "../components/Layout";
import SimpleCard from "../components/SimpleCard";
import useMediaQuery from "../hooks/useMediaQuery";
import { getProducts } from "../server/lib/products";
import { stripe } from "../server/lib/stripe";
import { Container, GridCards, SectionHighlighted } from "../styles/pages/home";

export default function Home({products}: any) {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <>
      <Head>
        <title>É Comprei</title>
      </Head>
      <Container>
        <Banner />

        <SectionHighlighted render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <Categories />
          <h2>Destaques da semana</h2>
          <GridCards render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
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
        </SectionHighlighted>
      </Container>
     </> 
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts()
  const response = await stripe.products.list()
  
  return {
    props: {
      products
    },
    revalidate: 5
  }
}