import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {BiTrash} from 'react-icons/bi';
import { CartContainer, CartContent, CartProduct, CartResume } from '../../styles/pages/Cart';
import { Divider } from '../../styles/pages/checkout';
import tshirt from '../../assets/tshirt.png'
import Head from 'next/head';
import { CartContext } from '../../context/CartContext';
import { Box, Flex, FormLabel, Select, Text } from '@chakra-ui/react';

export default function Cart () {
  const { cartItems, removeFromCart, getTotalPrice, updateQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)

  const handleDecrement = (itemId: string) => {
    if (quantity > 1) {
      setQuantity(prev => {
        updateQuantity(itemId, prev - 1)
        return prev - 1
      });
    }
  };

  const handleIncrement = (itemId: string) => {
    setQuantity(prev => {
      updateQuantity(itemId, prev + 1)
      return prev + 1
    });
  };

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
            cartItems.map(item => (
              <CartProduct key={item.id}>
                <Image src={item.imgUrl} alt="" width={90} height={90} />
                <div className='details-content'>
                  <div className='details'>
                    <span className='product-name'>{item.title}</span>
                    <span>Uni: {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(item.price)}
                    </span>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="2">
                      {
                        item.sizes.length > 0 &&
                        <Box display="flex" alignItems="flex-start">
                          <FormLabel htmlFor="#" margin={0} mr="1">Tamanho:</FormLabel>
                          <Select height={'6'}>
                            {item.sizes.map(item=> {
                              if(item.size) {
                                return (
                                  <option key={item.id} value={item.size}>{item.size}</option>
                                )
                              }
                            })}
                          </Select>
                        </Box>
                      }
                      {
                        item.variantColors.length > 0 &&
                        <Box display="flex" alignItems="flex-start">
                          <FormLabel htmlFor="#" margin={0} mr="1">Cor:</FormLabel>
                          <Select height={'6'}>
                            {item.variantColors.map(item=> {
                              if(item.variant) {
                                return (
                                  <option key={item.id} value={item.variant}>{item.variant}</option>
                                )
                              }
                            })}
                          </Select>
                        </Box>
                      }
                    </Box>
                  </div>
                  <div className='total'>
                    <button onClick={()=> removeFromCart(item.id)}><BiTrash size={24}/></button>
                    <div className='count'>
                      <button onClick={()=> {
                        handleDecrement(item.id)
                      }}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={()=> {
                        handleIncrement(item.id)
                      }}>+</button>
                    </div>
                  </div>
                </div>
              </CartProduct>
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