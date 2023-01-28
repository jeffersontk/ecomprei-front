import { GetStaticProps } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import SimpleCard from "../components/SimpleCard";
import { getProducts } from "../server/lib/products";
import { stripe } from "../server/lib/stripe";
import { Container, GridCards, SectionHighlighted } from "../styles/pages/home";

export default function Home({products}: any) {
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
                  sizes={product.sizes}
                  variantColors={product.variants}
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