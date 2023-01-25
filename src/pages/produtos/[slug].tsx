import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import Categories from '../../components/Categories';
import { GridCards } from '../../styles/pages/home';
import { Container, FilterSection, Product, ProductSlider } from '../../styles/pages/produtos';
import { useRouter } from "next/router"
import SimpleCard from '../../components/SimpleCard';
import Slider from '../../components/Slider';
import { getProductsByCategory } from '../../server/lib/products';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function Produtos({products}: any) {
  const { query } = useRouter()
  const title = query.slug || 'Moda'
  const subtitle = query.filtro || 'Feminina'

  const isActive = (find: string) => {
    if(subtitle.includes(find)){
      return 'active'
    }
    return ''
  }

  const formatTitle = (title:string) => {
    let format = title
    switch (format) {
      case 'utilidades&acessorios':
        return 'Utilidades & Acessórios'.toUpperCase()
      case 'saude&beleza':
        return 'Saúde & Beleza'.toUpperCase()
      default:
        return format.toUpperCase()
    }
  }

  return (
    <Container>
      <Categories />
      <Slider />

      <FilterSection render={{'@initial': 'mobile', '@bp2': 'desktop'}} id="productsGrid">
        <h2>{formatTitle(String(title))} {query.filtro && `/ ${String(subtitle).toUpperCase()}`}</h2>
        {/* {
          title === 'moda' &&
          <ul>
            <li className={isActive('todos')}>
              <Link href="/produtos/moda?filtro=todos">Todos</Link>
            </li>
            <li className={isActive('feminina')}>
              <Link href="/produtos/moda?filtro=feminina">Feminina</Link>
            </li>
            <li className={isActive('masculino')}>
              <Link href="/produtos/moda?filtro=masculino">Masculina</Link>
            </li>
            <li className={isActive('infantil')}>
              <Link href="/produtos/moda?filtro=infantil">Infantil</Link>
            </li>
          </ul>
        } */}
      </FilterSection>
      <GridCards render={{"@initial": 'mobile', "@bp2": 'desktop'}} >
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
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context
  const products = await getProductsByCategory(`${params?.slug}`)

  return {
    props: {
      products
    },
    revalidate: 5
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ["beleza", "eletronicos", "utilidades", "acessorios", "saude", "moda"]
  const paths = categories.map((post) => ({
    params: { slug: post },
  }))

  return { paths, fallback: true }
}