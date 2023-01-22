import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Banner from "../components/Banner";
import Cards from "../components/Cards";
import Categories from "../components/Categories";
import Layout from "../components/Layout";
import SimpleCard from "../components/SimpleCard";
import useMediaQuery from "../hooks/useMediaQuery";
import { getProducts } from "../server/lib/products";
import { Container, GridCards, SectionHighlighted } from "../styles/pages/home";

export default function Home({products}: any) {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
/*     <Layout> */
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
/*     </Layout> */
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