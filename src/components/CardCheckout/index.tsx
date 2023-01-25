import Image from 'next/image';
import React from 'react';
import { ButtonAddToCart, ButtonCheckout, CardCheckoutContainer, ContentSelects, DetailPrice, DetailProduct, Divider, ImageContainer, NewPrice, OldPrice, PriceInfo, TotalPrice } from '../../styles/pages/checkout';

import {BsCartPlus} from 'react-icons/bs'
import { calculateDiscount } from '../../utils/calc';
import { sizeType, variantType } from '../../utils/types/productsType';
import { Box, FormLabel, Select } from '@chakra-ui/react';

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
  return (
    <CardCheckoutContainer  id="checkout" render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <ImageContainer>
            <Image src={productImage} alt="" width={137} height={154}/>
          </ImageContainer>
          <DetailProduct>
            <h3>{title}</h3>
            <ContentSelects>
              {
                sizes.length > 0 &&
                <Box display="flex" alignItems="center">
                  <FormLabel htmlFor="#">Tamanho:</FormLabel>
                  <Select height={'6'}>
                    {sizes.map(item=> (
                      <option key={item.id} value={item.size}>{item.size}</option>
                    ))}
                  </Select>
                </Box>
              }
              {
                colors.length > 0 && 
                <Box display="flex" alignItems="center">
                  <FormLabel htmlFor="#">Cor:</FormLabel>
                  <Select height={30}>
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
          <ButtonAddToCart><BsCartPlus size={20} />Adicionar ao carrinho</ButtonAddToCart>
        </CardCheckoutContainer>
  );
}

export default CardCheckout;