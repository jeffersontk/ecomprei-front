import Link from 'next/link';
import React from 'react';
import { CategoriesList } from './Categories';
const Categories: React.FC = () => {
  return (
    <CategoriesList>
      <li>
        <Link href="/produtos/moda">Moda</Link>
      </li>
      <li>
        <Link href="/produtos/eletronicos">Eletrônicos</Link>
      </li>
      <li>
        <Link href="/produtos/utilidades">Utilidades</Link>
      </li>
      <li>
      <Link href="/produtos/beleza">Beleza</Link>
      </li>
    </CategoriesList>
  );
}

export default Categories;