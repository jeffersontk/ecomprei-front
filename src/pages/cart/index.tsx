import React, { useContext, useEffect, useState } from 'react';
import { CartContainer, CartContent, CartResume } from '../../styles/pages/Cart';
import { Divider } from '../../styles/pages/checkout';

import Head from 'next/head';
import { CartContext } from '../../context/CartContext';
import { Box, Text, useToast } from '@chakra-ui/react';
import CartCard from '../../components/molecules/Cards/CartCard';
import axios from 'axios';
import { findMyDiscount } from '../../utils/findDiscount';
import { stripe } from '../../server/lib/stripe';

export default function Cart () {
  const { cartItems,  getTotalPrice} = useContext(CartContext);
  const toast = useToast()

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalDiscountInPercentage, setTotalDiscountInPercentage] = useState(0)
  const [totalToPay, setTotalToPay] = useState(0)


  useEffect(()=> {
    const {totalPrice,totalDiscount, totalToPay, totalDiscountInPercentage } = getTotalPrice(cartItems)

    setTotalPrice(totalPrice)
    setTotalDiscount(totalDiscount)
    setTotalDiscountInPercentage(totalDiscountInPercentage)
    setTotalToPay(totalToPay)

  }, [cartItems, getTotalPrice])

  const handleCheckoutSession = async () => {
    try {
      const listItemByCart = cartItems.map(item => {
        return {
          price: item.priceDefaultId,
          quantity: item.quantity,
        }
      })

      const response = await axios.post('/api/checkout', {listItemByCart, totalDiscountInPercentage})

      const {checkoutUrl} = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      toast({
        title: 'Error inesperado',
        description: "Produto não encontrado no provedor de pagamento",
        status: 'error',
        duration: 5000,
      })
    }
  }

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
                discount={item.discount}
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
              }).format(totalPrice)}</strong>
            </div>
            <div className='textContent'>
              <span>Desconto</span>
              <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(totalDiscount)}</strong>
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
              }).format(totalToPay)}</strong>
            </div>
            <button onClick={handleCheckoutSession}>Pagar agora</button>
          </CartResume>
        }
      </CartContainer>
    </>
  )
}