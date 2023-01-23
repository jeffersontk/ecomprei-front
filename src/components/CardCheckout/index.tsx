import Image from 'next/image';
import React from 'react';
import { ButtonAddToCart, ButtonCheckout, CardCheckoutContainer, ContentSelects, DetailPrice, DetailProduct, Divider, ImageContainer, NewPrice, OldPrice, PriceInfo, TotalPrice } from '../../styles/pages/checkout';

import {BsCartPlus} from 'react-icons/bs'
import {FaTrashAlt} from 'react-icons/fa'
import tshirt from '../../assets/tshirt.png'
import { calculateDiscount } from '../../utils/calc';

interface CardCheckoutProps {
  id: string
  title: string
  sizes: []
  colors: []
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
          <h2>Pedido</h2>
          <Divider />
          <ImageContainer>
            <Image src={productImage} alt="" width={137} height={154}/>
            {/* <button>
              <FaTrashAlt />
            </button> */}
          </ImageContainer>
          <DetailProduct>
            <h3>{title}</h3>
            <ContentSelects>
              {
                sizes.length > 0 &&
                <div>
                  <label htmlFor="#">Tamanho:</label>
                  <select>
                    <option>P</option>
                    <option>M</option>
                    <option>G</option>
                    <option>GG</option>
                  </select>
                </div>
              }
              {
                colors.length > 0 && 
                <div>
                  <label htmlFor="#">Cor:</label>
                  <select>
                    <option>Preto</option>
                    <option>Branco</option>
                    <option>Azul</option>
                  </select>
                </div>
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
              <strong>Gratis</strong>
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