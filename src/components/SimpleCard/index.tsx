import React, {useContext} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {BsCartCheck, BsCartPlus} from 'react-icons/bs'
import { CardContainer, ContentText } from './SimpleCard';
import { CardDiscount, CartButton, ContentImage, Price, RealPrice } from '../Cards/Cards';
import discountBanner from '../../assets/discount-banner.webp'
import { CartContext } from '../../context/CartContext';
import { sizeProduct, variantProduct } from 'prisma/prisma-client';
import {sortBySize} from '../../utils/sortBySize'

interface CardProps {
  id: string,
  price: number
  title: string
  discount: number,
  imgUrl: string,
  sizes: sizeProduct[]
  variantColors: variantProduct[]
  priceDefaultId: string
}

const SimpleCard: React.FC<CardProps> = ({id, discount = 0, imgUrl, price, title, sizes, variantColors, priceDefaultId}) => {
  const { addToCart, cartItems } = useContext(CartContext);
  
  function calcularDesconto(precoTotal: number, porcentagemDesconto: number): number {
    let result = precoTotal - (precoTotal * (porcentagemDesconto / 100))
    return +result
  }

  const isProductIncludeInCart = cartItems.find(item => item.id === id)
  const sizeSort = sortBySize(sizes)

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
              addToCart({id, title, price, variantColors, sizes: sizeSort, imgUrl, quantity: 1, priceDefaultId, discount})
            }}
          > 
            <BsCartPlus />
          </CartButton>
          <Link href={`/checkout/${id}`} prefetch={false}>
            <Image 
              src={imgUrl} 
              alt={title} 
              className='productImage' 
              width={256} 
              height={256}
            />
          </Link>
        </ContentImage>
        <Link href={`/checkout/${id}`} prefetch={false}>
        <ContentText render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <h4>{title}</h4>
          <div className='prices'>
            {
              discount ?
              <Price>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(calcularDesconto(price, discount))}</Price>
              : <Price>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(price)}</Price>
            }
            {
              discount ?
              <RealPrice>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(price)}</RealPrice>
              : <div />
            }
          </div>
        </ContentText>
      </Link>
    </CardContainer>
  );
}

export default SimpleCard;