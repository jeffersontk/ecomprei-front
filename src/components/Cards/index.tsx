import Image from 'next/image';
import React from 'react';
import { Card, CardDiscount, CartButton, ContainerTitle, Content, ContentCard, ContentImage, DescriptionPrice, ImageContainer, Price, PriceContent, RealPrice } from './Cards';
import tshirt from '../../assets/tshirt.png'
import discountBanner from '../../assets/discount-banner.png'
import {BsCartPlus} from 'react-icons/bs'
import Link from 'next/link';

const Cards: React.FC = () => {
  return (
    <Card>
      <ContentImage>
        <CardDiscount>
          <Image src={discountBanner} alt="" />
          <span>23% OFF</span>
        </CardDiscount>
        <CartButton title="adicionar ao carrinho">
          <BsCartPlus />
        </CartButton>
        <ImageContainer>
          <Image src={tshirt} alt="" />
        </ImageContainer>
      </ContentImage>
      <PriceContent>
        <ContainerTitle>
          <h3>title produtcs</h3>
        </ContainerTitle>
        <ContentCard>
          <Content>
            <Price>R$ 192<span>.49</span></Price>
            <RealPrice>R$ 249<span>.99</span></RealPrice>
            <DescriptionPrice>
              Economize agora R$ 57<span>.49</span>
            </DescriptionPrice>
          </Content>
          <Link href="#">Comprar</Link>
        </ContentCard>
      </PriceContent>
    </Card>
  );
}

export default Cards;