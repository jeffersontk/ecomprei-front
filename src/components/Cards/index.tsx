import Image from 'next/image'
import React from 'react'
import {
  Card,
  CardDiscount,
  CartButton,
  ContainerTitle,
  Content,
  ContentCard,
  ContentImage,
  DescriptionPrice,
  ImageContainer,
  Price,
  PriceContent,
  RealPrice,
} from './Cards'
import discountBanner from '../../assets/discount-banner.webp'
import { BsCartPlus } from 'react-icons/bs'
import Link from 'next/link'
import useMediaQuery from '../../hooks/useMediaQuery'

const Cards: React.FC = () => {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <Card render={matches ? 'desktop' : 'mobile'}>
      <ContentImage>
        <CardDiscount>
          <Image src={discountBanner} alt="" />
          <span>23% OFF</span>
        </CardDiscount>
        <CartButton title="adicionar ao carrinho">
          <BsCartPlus />
        </CartButton>
        <ImageContainer>{/* <Image src={tshirt} alt="" /> */}</ImageContainer>
      </ContentImage>
      <PriceContent>
        <ContainerTitle>
          <h3>title produtcs</h3>
        </ContainerTitle>
        <ContentCard>
          <Content>
            <div>
              <Price>
                R$ 192<span>.49</span>
              </Price>
              <RealPrice>
                R$ 249<span>.99</span>
              </RealPrice>
            </div>
            <DescriptionPrice>
              Economize agora R$ 57<span>.49</span>
            </DescriptionPrice>
          </Content>
          <div className="action">
            <Link href="/checkout/12322sac">Comprar</Link>
          </div>
        </ContentCard>
      </PriceContent>
    </Card>
  )
}

export default Cards
