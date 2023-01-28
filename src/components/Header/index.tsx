import Image from 'next/image';
import Link from 'next/link';
import React, {useContext, useState} from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiSearchAlt} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import {MdOutlineKeyboardArrowRight, MdClose} from 'react-icons/md'
import {GiHamburgerMenu} from 'react-icons/gi'
import logo from '../../assets/logo-ecomprei.svg'
import { BurgerButton, ButtonCloseSearch, ButtonOpenSearch, CartButton, Container, HeaderSearchAndCart, InputContainer, Navigation, SearchContainer, SuggestionContainer, } from './Header';
import useMediaQuery from '../../hooks/useMediaQuery';
import { CartContext } from '../../context/CartContext';


const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<'show' |'hidden'>('hidden')
  const [openSearch, setOpenSearch] = useState<'show' |'hidden'>('hidden')
  const { cartItems } = useContext(CartContext);
  
  return (
    <Container render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      <HeaderSearchAndCart render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
        <div>
          <BurgerButton visible={{'@initial': 'show', '@bp2': 'hidden'}} onClick={()=> setOpenMenu('show')}><GiHamburgerMenu size={30}/></BurgerButton>
          <Link href="/" prefetch={false}>
            <Image src={logo} alt="É Comprei" />
          </Link>
        </div>

        <InputContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}} visible={{"@initial": 'hidden', '@bp2': 'show'}}>
          <input type="text" placeholder='Encontre aqui'/>
          <button>
            <BiSearchAlt/>
          </button>
        </InputContainer>
        <div>
          <ButtonOpenSearch 
            onClick={()=> setOpenSearch('show')}
            visible={{"@initial": 'show', '@bp2': 'hidden'}}
          >
            <BiSearchAlt  size={30}/>
          </ButtonOpenSearch>
            <Link href="/cart">
              <CartButton>
                <AiOutlineShoppingCart />
                {
                  cartItems.length > 0 &&
                    <span>{cartItems.length}</span>
                }
              </CartButton>
            </Link>
        </div>
      </HeaderSearchAndCart>

      <SearchContainer visible={openSearch}>
        <div className='headerSearchContainer'>
          <InputContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
            <input type="text" placeholder='Encontre aqui'/>
            <button>
              <BiSearchAlt />
            </button>
          </InputContainer>
          <ButtonCloseSearch onClick={()=> setOpenSearch('hidden')}>
            <AiOutlineClose  size={30}/>
          </ButtonCloseSearch>
        </div>
        <SuggestionContainer>

        </SuggestionContainer>
      </SearchContainer>
      

      <Navigation render={{'@initial': 'desktop' }} visible={{'@initial': 'hidden', '@bp2': 'show'}}>
        <ul>
          <li>
            <Link href="/" prefetch={false}>Inicio</Link>
          </li>
          <li>
            <Link href="/produtos" prefetch={false}>Explorar</Link>
          </li>
        </ul>
      </Navigation>
      
      <Navigation render={{'@initial': 'mobile', '@bp2': 'desktop'}} visible={openMenu}>
        <button onClick={()=> setOpenMenu('hidden')}><MdClose size={30}/></button>
        <Link href="/">
          <Image src={logo} alt="É Comprei" />
        </Link>
        <h4>Navegação</h4>
        <ul>
          <li onClick={()=> setOpenMenu('hidden')}>
            <Link href="/" prefetch={false}>Inicio</Link>
          </li>
          <li onClick={()=> setOpenMenu('hidden')}>
            <Link href="/produtos" prefetch={false}>Explorar</Link>
          </li>
        </ul>
        <Link href="/produtos" prefetch={false}><h4>Categorias Populares <MdOutlineKeyboardArrowRight size={24}/></h4></Link>
        <ul>
          <li onClick={()=> setOpenMenu('hidden')}>
            <Link href="/produtos/moda?filtro=feminina" prefetch={false}>Roupas femininos</Link>
          </li>
          <li onClick={()=> setOpenMenu('hidden')}>
            <Link href="/produtos/acessorio?filtro=relogios" prefetch={false}>Relógios</Link>
          </li>
          <li onClick={()=> setOpenMenu('hidden')}>
            <Link href="/produtos/moda?filtro=masculinas" prefetch={false}>Roupas masculinas</Link>
          </li>
          <li onClick={()=> setOpenMenu('hidden')}>
            <Link href="/produtos/beleza?filtro=maquiagem" prefetch={false}>Maquiagem</Link>
          </li>
        </ul>
      </Navigation>
    </Container>
  );
}

export default Header;