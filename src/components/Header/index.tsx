import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiSearchAlt} from 'react-icons/bi'
import logo from '../../assets/logo-ecomprei.svg'
import { CartButton, Container, HeaderSearchAndCart, Navigation, SearchContainer, } from './Header';


const Header: React.FC = () => {
  const { asPath, pathname } = useRouter()
  const path = asPath
  console.log('pathname', pathname)

  const isActive = (find: string) => {
    if(find === '/'){
      return 'active'
    }
    if(find === '/produtos'){
      return 'active'
    }
    
    return ''
  }
  return (
    <Container>
      <HeaderSearchAndCart>
        <Link href="/">
          <Image src={logo} alt="É Comprei" />
        </Link>

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
      </HeaderSearchAndCart>
      <Navigation>
        <ul>
          <li>
            <Link href="/" className={isActive('/')}>Inicio</Link>
          </li>
          <li>
            <Link href="/produtos" className={isActive('/produtos')}>Explorar</Link>
          </li>
        </ul>
      </Navigation>
    </Container>
  );
}

export default Header;