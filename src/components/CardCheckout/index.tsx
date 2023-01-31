import Image from 'next/image';
import React, { use, useContext, useEffect, useState } from 'react';
import { ButtonAddToCart, ButtonCheckout, CardCheckoutContainer, ContentSelects, DetailPrice, DetailProduct, Divider, ImageContainer, NewPrice, OldPrice, PriceInfo, TotalPrice } from '../../styles/pages/checkout';

import {BsCartCheck, BsCartPlus} from 'react-icons/bs'
import { calculateDiscount } from '../../utils/calc';
import { sizeType, variantType } from '../../utils/types/productsType';
import { Box, FormLabel, Select } from '@chakra-ui/react';
import { CartContext } from '../../context/CartContext';
import { sortBySize } from '../../utils/sortBySize';

interface CardCheckoutProps {
  id: string
  title: string
  sizes: sizeType[]
  colors: variantType[]
  price: number
  discount: number
  shipping: string | number
  productImage: string
}

const CardCheckout: React.FC<CardCheckoutProps> = ({
  colors,
  discount,
  id,
  price,
  shipping,
  sizes,
  title,
  productImage
}) => {
  const { addToCart } = useContext(CartContext);
  const [colorSelect, setColorSelect] = useState(colors[0]?.variant ?? '')
  const [sizeSelect, setSizeSelect] = useState(sizes[0]?.size ?? '')
  
  const sortSizes = sortBySize(sizes)

  return (
    <CardCheckoutContainer  id="checkout" render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <ImageContainer>
            <Image src={productImage} alt="" width={137} height={154}/>
          </ImageContainer>
          <DetailProduct>
            <h3>{title}</h3>
            <ContentSelects>
              {
                sortSizes.length > 0 &&
                <Box display="flex" alignItems="center">
                  <FormLabel htmlFor="#">Tamanho:</FormLabel>
                  <Select height={'6'} value={sizeSelect} onChange={(e)=> setSizeSelect(e.target.value)}>
                    {sortSizes.map(item=> (
                      <option key={item.id} value={item.size}>{item.size}</option>
                    ))}
                  </Select>
                </Box>
              }
              {
                colors.length > 0 && 
                <Box display="flex" alignItems="center">
                  <FormLabel htmlFor="#">Cor:</FormLabel>
                  <Select height={30} value={colorSelect} onChange={(e)=> setColorSelect(e.target.value)}>
                    {colors.map(item=> (
                      <option key={item.id} value={item.variant}>{item.variant}</option>
                    ))}
                  </Select>
                </Box>
              }
            </ContentSelects>
          </DetailProduct>
          <Divider />
          <DetailPrice>
            <div>
              <span>Subtotal</span>
              <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(price)}</strong>
            </div>
            <div>
              <span>Desconto</span>
              <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(calculateDiscount(price, discount))}</strong>
            </div>
            <div>
              <span>Frete</span>
              <strong>{shipping}</strong>
            </div>
          </DetailPrice>
          <Divider />
          <TotalPrice>
            <strong>Total</strong>
            <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(price - calculateDiscount(price, discount))}</strong>
          </TotalPrice>
          
          <ButtonCheckout>Comprar</ButtonCheckout>
          <ButtonAddToCart 
            onClick={()=> {
              addToCart({id, title, price, variantColors: colors, sizes: sortBySize(sizes), imgUrl: productImage, quantity: 1, colorSelect, sizeSelect})
            }}>
              <BsCartPlus size={20} />
              Adicionar ao carrinho
            </ButtonAddToCart>
        </CardCheckoutContainer>
  );
}

export default CardCheckout;