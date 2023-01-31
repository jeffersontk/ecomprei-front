import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {BiTrash} from 'react-icons/bi';
import { CartContainer, CartContent, CartProduct, CartResume } from '../../styles/pages/Cart';
import { Divider } from '../../styles/pages/checkout';

import Head from 'next/head';
import { CartContext } from '../../context/CartContext';
import { Box, FormLabel, Select, Text } from '@chakra-ui/react';
import CartCard from '../../components/molecules/Cards/CartCard';

export default function Cart () {
  const { cartItems,  getTotalPrice} = useContext(CartContext);

  const [total, setTotal] = useState(0)

  useEffect(()=> {
    let newPriceTotal = getTotalPrice(cartItems)
    setTotal(newPriceTotal)
  }, [cartItems, getTotalPrice])

  return (
    <>
      <Head>
        <title>É Comprei - Carrinho</title>
      </Head>
      <CartContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
        <CartContent>
          <h2>Meu carrinho</h2>
          <Divider />
          {
            cartItems.length === 0 ?
              <Box>
                <Text>Carrinho vazio</Text>
              </Box>
            :
            cartItems.map((item, index) => (
              <CartCard
                key={index}
                colors={item.variantColors}
                id={item.id}
                imgUrl={item.imgUrl}
                index={index}
                price={item.price}
                sizes={item.sizes}
                title={item.title}
                colorSelect={item.colorSelect}
                sizeSelect={item.sizeSelect}
              />
            ))
          }
        </CartContent>
        {
           cartItems.length !== 0 &&
          <CartResume>
            <h2>Resumo do pedido</h2>
            <Divider />
            <div className='textContent'>
              <span>Subtotal</span>
              <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(total)}</strong>
            </div>
            <div className='textContent'>
              <span>Frete</span>
              <strong>Grátis</strong>
            </div>
            <Divider />
            <div className='textContent'>
              <span>Total</span>
              <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(total)}</strong>
            </div>
            <button>Pagar agora</button>
          </CartResume>
        }
      </CartContainer>
    </>
  )
}