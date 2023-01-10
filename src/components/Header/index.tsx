import Image from 'next/image';
import React from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiSearchAlt} from 'react-icons/bi'
import logo from '../../assets/logo-ecomprei.svg'
import { CartButton, Container, SearchContainer } from './Header';


const Header: React.FC = () => {
  return (
    <Container>
      <a href="#">
        <Image src={logo} alt="É Comprei" />
      </a>

      <SearchContainer>
        <input type="text" placeholder='Encontre aqui'/>
        <button>
          <BiSearchAlt />
        </button>
      </SearchContainer>

      <CartButton>
        <AiOutlineShoppingCart />
        <span>3</span>
      </CartButton>
    </Container>
  );
}

export default Header;