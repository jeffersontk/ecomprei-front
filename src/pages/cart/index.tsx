import Image from 'next/image';
import React from 'react';
import {BiTrash} from 'react-icons/bi';
import { CartContainer, CartContent, CartProduct, CartResume } from '../../styles/pages/Cart';
import { Divider } from '../../styles/pages/checkout';
import tshirt from '../../assets/tshirt.png'

// import { Container } from './styles';

export default function Cart () {
  return (
    <CartContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      <CartContent>
        <h2>Meu carrinho</h2>
        <Divider />
        <CartProduct>
          <Image src={tshirt} alt=""/>
          <div className='details-content'>
            <div className='details'>
              <span className='product-name'>nome do produto</span>
              <span>Uni: R$ 25,00</span>
              <span>Cor: Preto</span>
              <span>Tamanho: M</span>
            </div>
            <div className='total'>
              <span><BiTrash size={24}/></span>
              <div className='count'>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
          </div>
        </CartProduct>
        <CartProduct>
          <Image src={tshirt} alt=""/>
          <div className='details-content'>
            <div className='details'>
              <span className='product-name'>nome do produto</span>
              <span>Uni: R$ 25,00</span>
              <span>Cor: Preto</span>
              <span>Tamanho: M</span>
            </div>
            <div className='total'>
              <span><BiTrash size={24}/></span>
              <div className='count'>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
          </div>
        </CartProduct>
        <CartProduct>
          <Image src={tshirt} alt=""/>
          <div className='details-content'>
            <div className='details'>
              <span className='product-name'>nome do produto</span>
              <span>Uni: R$ 25,00</span>
              <span>Cor: Preto</span>
              <span>Tamanho: M</span>
            </div>
            <div className='total'>
              <span><BiTrash size={24}/></span>
              <div className='count'>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
          </div>
        </CartProduct>
      </CartContent>
      <CartResume>
        <h2>Resumo do pedido</h2>
        <Divider />
        <div className='textContent'>
          <span>Subtotal</span>
          <strong>R$ 35,00</strong>
        </div>
        <div className='textContent'>
          <span>Frete</span>
          <strong>Grátis</strong>
        </div>
        <Divider />
        <div className='textContent'>
          <span>Total</span>
          <strong>R$ 35,00</strong>
        </div>
        <button>Pagar agora</button>
      </CartResume>
    </CartContainer>
  )
}