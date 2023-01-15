import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {BsCartPlus} from 'react-icons/bs'
import tshirt from '../../assets/tshirt.png';
import { CardContainer, ContentText } from './SimpleCard';
import { CardDiscount, CartButton, ContentImage, Price, RealPrice } from '../Cards/Cards';
import discountBanner from '../../assets/discount-banner.png'

const SimpleCard: React.FC = () => {
  return (
    <CardContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      <Link href="/checkout/12322sac">
        <ContentImage>
          <CardDiscount>
            <Image src={discountBanner} alt="" priority />
            <span>23% OFF</span>
          </CardDiscount>
          <CartButton title="adicionar ao carrinho">
            <BsCartPlus />
          </CartButton>
          <Image src={tshirt} alt="" className='productImage'/>
        </ContentImage>
        <ContentText render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <h4>Camiseta manga longa térmica slim fit com proteção UV50</h4>
          <div>
            <Price>R$ 192<span>.49</span></Price>
            <RealPrice>R$ 249<span>.99</span></RealPrice>
          </div>
        </ContentText>
      </Link>
    </CardContainer>
  );
}

export default SimpleCard;