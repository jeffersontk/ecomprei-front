import Link from 'next/link';
import React from 'react';
import { CategoriesList } from './Categories';
const Categories: React.FC = () => {
  return (
    <CategoriesList>
      <li>
        <Link href="/produtos/moda?filtro=todos">Moda</Link>
      </li>
      <li>
        <Link href="/produtos/eletronicos">Eletrônicos</Link>
      </li>
      <li>
        <Link href="/produtos/utilidades&acessorios">Utilidades & Acessórios</Link>
      </li>
      <li>
      <Link href="/produtos/saude&beleza">Saúde & Beleza</Link>
      </li>
    </CategoriesList>
  );
}

export default Categories;