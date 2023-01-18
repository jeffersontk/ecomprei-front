import Link from 'next/link';
import React from 'react';
import Categories from '../../components/Categories';
import { GridCards } from '../../styles/pages/home';
import { Container, FilterSection, Product, ProductSlider } from '../../styles/pages/produtos';
import { useRouter } from "next/router"
import SimpleCard from '../../components/SimpleCard';
import Slider from '../../components/Slider';


export default function Produtos() {
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
     {/*  <ProductSlider>
        <Product className='product1'><a href="#">Comprar</a></Product>
        <Product className='product2'><a href="#">Comprar</a></Product>
        <Product className='product3'><a href="#">Comprar</a></Product>
        <Product className='product4'><a href="#">Comprar</a></Product>
      </ProductSlider>
 */}
      <Slider />

      <FilterSection render={{'@initial': 'mobile', '@bp2': 'desktop'}} id="productsGrid">
        <h2>{formatTitle(String(title))} {query.filtro && `/ ${String(subtitle).toUpperCase()}`}</h2>
        {
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
        }
      </FilterSection>
      <GridCards render={{"@initial": 'mobile', "@bp2": 'desktop'}} >
     {/*    <SimpleCard />
        <SimpleCard /> */}
      </GridCards>
    </Container>
  );
}

