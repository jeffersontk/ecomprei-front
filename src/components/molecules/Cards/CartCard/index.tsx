import { Box, FormLabel, Select, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { variantProduct } from 'prisma/prisma-client';
import React, { useContext, useState } from 'react';
import { BiTrash } from 'react-icons/bi'
import { CartContext } from '../../../../context/CartContext';
import { CartProduct } from '../../../../styles/pages/Cart'
import { sizeType, } from '../../../../utils/types/productsType'

interface CartCardProps {
  id: string
  imgUrl: string
  title: string
  price: number
  discount: number
  sizes: sizeType[]
  sizeSelect?: string
  colors: variantProduct[]
  colorSelect?: string
  index: number
}

export default function CartCard({
  imgUrl,
  title,
  price,
  discount,
  sizes,
  colors,
  id,
  index,
  sizeSelect,
  colorSelect
}: CartCardProps) {
  const { removeFromCart,  updateQuantity } = useContext(CartContext);
  const [newColorSelect, setNewColorSelect] = useState('')
  const [newSizeSelect, setNewSizeSelect] = useState('')
  const [quantity, setQuantity] = useState(1)

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

  function calcularDesconto(precoTotal: number, porcentagemDesconto: number): number {
    let result = precoTotal - (precoTotal * (porcentagemDesconto / 100))
    return +result
  }

  return (
    <CartProduct>
      <Image src={imgUrl} alt="" width={90} height={90} />
      <div className='details-content'>
        <div className='details'>
          <span className='product-name'>{title}</span>
          <span className='product-price'>Uni: {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(calcularDesconto(price, discount))}~
            <span className='discount'>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(price)}
            </span>
            <span className='quantityDiscount'>OFF{discount}</span>
          </span>
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap="2">
            {
              sizes && 
              sizes.length > 0 &&
              <Box display="flex" alignItems="flex-start">
                <FormLabel htmlFor="#" margin={0} mr="1">Tamanho:</FormLabel>
                <Select height={'6'} value={newSizeSelect.length === 0 ? sizeSelect : newSizeSelect} onChange={(e)=> setNewSizeSelect(e.target.value)}>
                  {sizes.map(item=> {
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
              colors &&
              colors.length > 0 &&
              <Box display="flex" alignItems="flex-start">
                <FormLabel htmlFor="#" margin={0} mr="1">Cor:</FormLabel>
                <Select height={'6'} value={newColorSelect.length === 0 ? colorSelect : newColorSelect} onChange={(e)=> setNewColorSelect(e.target.value)}>
                  {colors.map(item=> {
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
          <button onClick={()=> removeFromCart(index)}><BiTrash size={24}/></button>
          <div className='count'>
            <button onClick={()=> {
              handleDecrement(id)
            }}>-</button>
            <span>{quantity}</span>
            <button onClick={()=> {
              handleIncrement(id)
            }}>+</button>
          </div>
        </div>
      </div>
    </CartProduct>
  )
}
