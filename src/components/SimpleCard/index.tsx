import React, {useContext, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {BsCartCheck, BsCartPlus} from 'react-icons/bs'
import tshirt from '../../assets/tshirt.png';
import { CardContainer, ContentText } from './SimpleCard';
import { CardDiscount, CartButton, ContentImage, Price, RealPrice } from '../Cards/Cards';
import discountBanner from '../../assets/discount-banner.png'
import { CartContext } from '../../context/CartContext';
import { sizeProduct, variantProduct } from 'prisma/prisma-client';

interface CardProps {
  id: string,
  price: number
  title: string
  discount: number | null,
  imgUrl: string,
  sizes: sizeProduct[]
  variantColors: variantProduct[]
}

const SimpleCard: React.FC<CardProps> = ({id, discount, imgUrl, price, title, sizes, variantColors}) => {
  const { addToCart, cartItems } = useContext(CartContext);
  
  function calcularDesconto(precoTotal: number, porcentagemDesconto: number) {
    let result = precoTotal - (precoTotal * (porcentagemDesconto / 100))
    return result.toPrecision(3)
  }

  const isProductIncludeInCart = cartItems.find(item => item.id === id)

  return (
    <CardContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
        <ContentImage>
          {
            discount ?
            <CardDiscount>
              <Image src={discountBanner} alt="" priority/>
              <span>{discount}% OFF</span>
            </CardDiscount>
            : <div/>
          }
          <CartButton 
            title={isProductIncludeInCart ? "já está no carrinho" : "adicionar ao carrinho"}
            onClick={()=> {
              addToCart({id, title, price, variantColors, sizes, imgUrl, quantity: 1})
            }}
          > 
            {
              isProductIncludeInCart 
              ? <BsCartCheck />
              : <BsCartPlus />
            }
          </CartButton>
          <Link href={`/checkout/${id}`} prefetch={false}>
            <Image src={imgUrl} alt="" className='productImage'  width={200} height={200} />
          </Link>
        </ContentImage>
        <Link href={`/checkout/${id}`} prefetch={false}>
        <ContentText render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <h4>{title}</h4>
          <div>
            {
              discount ?
              <Price>R$ {calcularDesconto(price, discount)}</Price>
              : <Price>R$ {price}</Price>
            }
            {
              discount ?
              <RealPrice>R$ {price}</RealPrice>
              : <div />
            }
          </div>
        </ContentText>
      </Link>
    </CardContainer>
  );
}

export default SimpleCard;