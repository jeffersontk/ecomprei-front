import Link from 'next/link';
import React from 'react';
import {GiAmpleDress, GiEyelashes} from 'react-icons/gi'
import {BsMouseFill} from 'react-icons/bs'
import {FaDumbbell} from 'react-icons/fa'
import {IoWatchSharp}  from 'react-icons/io5'
import {ImSpoonKnife}  from 'react-icons/im'
import { CategoriesList } from './Categories';
import useMediaQuery from '../../hooks/useMediaQuery';

const Categories: React.FC = () => {
  const matches = useMediaQuery('(min-width: 768px)')
  
  return (
    <CategoriesList render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      <li>
        <Link href="/produtos/moda?filtro=todos#productsGrid"><GiAmpleDress size={25}/> Moda</Link>
      </li>
      <li>
        <Link href="/produtos/eletronicos#productsGrid"><BsMouseFill size={25}/> Eletrônicos</Link>
      </li>
      <li>
        <Link href="/produtos/utilidades#productsGrid"><ImSpoonKnife size={25}/> Utilidades</Link>
     
      </li>
      <li>
        <Link href="/produtos/acessorios#productsGrid"><IoWatchSharp size={25}/> Acessórios</Link>
      </li>
      <li>
        <Link href="/produtos/saude#productsGrid"><FaDumbbell size={25}/>Saúde</Link>
      </li>
      <li>
        <Link href="/produtos/beleza#productsGrid"><GiEyelashes size={25}/> Beleza</Link>
      </li>
    </CategoriesList>
  );
}

export default Categories;