import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {BsCartPlus} from 'react-icons/bs'
import tshirt from '../../assets/tshirt.png';
import { CardContainer, ContentText } from './SimpleCard';
import { CardDiscount, CartButton, ContentImage, Price, RealPrice } from '../Cards/Cards';
import discountBanner from '../../assets/discount-banner.png'

interface CardProps {
  id: string,
  price: number
  title: string
  discount: number | null,
  imgUrl: string
}

const SimpleCard: React.FC<CardProps> = ({id, discount, imgUrl, price, title}) => {

  function calcularDesconto(precoTotal: number, porcentagemDesconto: number) {
    let result = precoTotal - (precoTotal * (porcentagemDesconto / 100))
    return result.toPrecision(3)
  }

  return (
    <CardContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      <Link href={`/checkout/${id}`} prefetch={false}>
        <ContentImage>
          {
            discount &&
            <CardDiscount>
              <Image src={discountBanner} alt="" priority/>
              <span>{discount}% OFF</span>
            </CardDiscount>
          }
          <CartButton title="adicionar ao carrinho">
            <BsCartPlus />
          </CartButton>
          <Image src={imgUrl} alt="" className='productImage'  width={200} height={200} />
        </ContentImage>
        <ContentText render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <h4>{title}</h4>
          <div>
            {
              discount ?
              <Price>R$ {calcularDesconto(price, discount)}</Price>
              : <Price>R$ {price}</Price>
            }
            {
              discount &&
              <RealPrice>R$ {price}</RealPrice>
            }
          </div>
        </ContentText>
      </Link>
    </CardContainer>
  );
}

export default SimpleCard;