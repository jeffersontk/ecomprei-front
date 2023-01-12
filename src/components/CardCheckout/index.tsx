import Image from 'next/image';
import React from 'react';
import { ButtonAddToCart, ButtonCheckout, CardCheckoutContainer, ContentSelects, DetailPrice, DetailProduct, Divider, ImageContainer, NewPrice, OldPrice, PriceInfo, TotalPrice } from '../../styles/pages/checkout';

import {BsCartPlus} from 'react-icons/bs'
import {FaTrashAlt} from 'react-icons/fa'
import tshirt from '../../assets/tshirt.png'

const CardCheckout: React.FC = () => {
  return (
    <CardCheckoutContainer  id="checkout">
          <h2>Pedido</h2>
          <Divider />
          <ImageContainer>
            <Image src={tshirt} alt="" width={137} height={154}/>
            <button>
              <FaTrashAlt />
            </button>
          </ImageContainer>
          <DetailProduct>
            <h3>Camiseta termina slim fit com proteção UV50</h3>
            <ContentSelects>
              <div>
                <label htmlFor="#">Tamanho:</label>
                <select>
                  <option>P</option>
                  <option>M</option>
                  <option>G</option>
                  <option>GG</option>
                </select>
              </div>
              <div>
                <label htmlFor="#">Cor:</label>
                <select>
                  <option>Preto</option>
                  <option>Branco</option>
                  <option>Azul</option>
                </select>
              </div>
            </ContentSelects>
            <PriceInfo>
              <OldPrice>R$ 249.99</OldPrice>
              <NewPrice>R$ 192.49</NewPrice>
            </PriceInfo>
          </DetailProduct>
          <Divider />
          <DetailPrice>
            <div>
              <span>Subtotal</span>
              <strong>R$ 249.99</strong>
            </div>
            <div>
              <span>Desconto</span>
              <strong>R$ -57.49</strong>
            </div>
            <div>
              <span>Frete</span>
              <strong>Gratis</strong>
            </div>
          </DetailPrice>
          <Divider />
          <TotalPrice>
            <strong>Total</strong>
            <strong>R$ 192.49</strong>
          </TotalPrice>
          
          <ButtonCheckout>Confirmar</ButtonCheckout>
          <ButtonAddToCart><BsCartPlus size={20} />Adicionar ao carrinho</ButtonAddToCart>
        </CardCheckoutContainer>
  );
}

export default CardCheckout;