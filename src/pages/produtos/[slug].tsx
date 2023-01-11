import Link from 'next/link';
import React from 'react';
import Cards from '../../components/Cards';
import Categories from '../../components/Categories';
import { GridCards } from '../../styles/pages/home';
import { Container, FilterSection } from '../../styles/pages/produtos';
import { useRouter } from "next/router"

export default function Produtos() {
  const {query, } = useRouter()
  const title = query.slug || 'Moda'
  const subtitle = query.categoria || 'Feminina'
  return (
    <Container>
      <Categories />
      <section>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
      {
      }
      <FilterSection>
        <h2>{String(title).toUpperCase()} {query.categoria && `/ ${String(subtitle).toUpperCase()}`}</h2>
        {
          title === 'moda' &&
          <ul>
            <li className='active'>
              <Link href="/produtos/moda?categoria=feminina">Feminina</Link>
            </li>
            <li>
              <Link href="/produtos/moda?categoria=masculino">Masculina</Link>
            </li>
            <li>
              <Link href="/produtos/moda?categoria=infantil">Infantil</Link>
            </li>
          </ul>
        }
      </FilterSection>
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
  );
}

