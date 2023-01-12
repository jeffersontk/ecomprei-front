import Link from 'next/link';
import React from 'react';
import {GiAmpleDress} from 'react-icons/gi'
import {BsMouseFill} from 'react-icons/bs'
import {FaDumbbell} from 'react-icons/fa'
import {IoWatchSharp}  from 'react-icons/io5'
import { CategoriesList } from './Categories';

const Categories: React.FC = () => {
  return (
    <CategoriesList>
      <li>
        <Link href="/produtos/moda?filtro=todos"><GiAmpleDress size={25}/> Moda</Link>
      </li>
      <li>
        <Link href="/produtos/eletronicos"><BsMouseFill size={25}/> Eletrônicos</Link>
      </li>
      <li>
        <Link href="/produtos/utilidades&acessorios"><IoWatchSharp size={25}/> Utilidades & Acessórios</Link>
      </li>
      <li>
      <Link href="/produtos/saude&beleza"><FaDumbbell size={25}/>Saúde & Beleza</Link>
      </li>
    </CategoriesList>
  );
}

export default Categories;