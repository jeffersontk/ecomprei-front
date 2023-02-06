import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { ButtonAddToCart, ButtonCheckout, CardCheckoutContainer, ContentSelects, DetailPrice, DetailProduct, Divider, ImageContainer, TotalPrice } from '../../styles/pages/checkout';

import { BsCartPlus} from 'react-icons/bs'
import { calculateDiscount } from '../../utils/calc';
import { sizeType, variantType } from '../../utils/types/productsType';
import { Box, Button, FormLabel, Select, Text, useToast } from '@chakra-ui/react';
import { CartContext } from '../../context/CartContext';
import { sortBySize } from '../../utils/sortBySize';
import axios from 'axios';
import { findMyDiscount } from '../../utils/findDiscount';

interface CardCheckoutProps {
  id: string
  title: string
  sizes: sizeType[]
  colors: variantType[]
  price: number
  discount: number
  shipping: string | number
  productImage: string
  priceDefaultId: string
}

const CardCheckout: React.FC<CardCheckoutProps> = ({
  colors,
  discount,
  id,
  price,
  shipping,
  sizes,
  title,
  productImage,
  priceDefaultId
}) => {
  const { addToCart } = useContext(CartContext);
  const [colorSelect, setColorSelect] = useState(colors[0]?.variant ?? '')
  const [sizeSelect, setSizeSelect] = useState(sizes[0]?.size ?? '')
  const [quantity, setQuantity] = useState(1)
  const toast = useToast()
  
  const sortSizes = sortBySize(sizes)

  const handleCheckoutSession = async () => {
    try {
      if(priceDefaultId){
        const response = await axios.post('/api/checkout', {
          line_item: {
            price: priceDefaultId,
            quantity: quantity,
          },
          discount,
          productId: id
        })
  
        const {checkoutUrl} = response.data
  
        window.location.href = checkoutUrl
      } else {
        throw new Error("id de produto não encontrado");
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error inesperado',
        description: "Produto não encontrado no provedor de pagamento",
        status: 'error',
        duration: 5000,
      })
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => {
        return prev - 1
      });
    }
  }
  const handleIncrement = () => {
    setQuantity(prev => {
      return prev + 1
    });
  }

  return (
    <CardCheckoutContainer  id="checkout" render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      <ImageContainer>
        <Image src={productImage} alt="" width={137} height={154}/>
      </ImageContainer>
      <DetailProduct>
        <h3>{title}</h3>
        <ContentSelects>
          <Box>
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
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Text fontWeight={600}>Quantidade:</Text>
            <Box display="flex" alignItems="center" gap="2">
              <Button w="5" h="7" colorScheme="orange" onClick={handleDecrement}>-</Button>
              <Text>{quantity}</Text>
              <Button w="5" h="7" colorScheme="orange" onClick={handleIncrement}>+</Button>
            </Box>
          </Box>
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
          }).format((price - calculateDiscount(price, discount)) * quantity)}</strong>
      </TotalPrice>
      
      <ButtonCheckout onClick={handleCheckoutSession}>
        Comprar
      </ButtonCheckout>
      <ButtonAddToCart 
        onClick={()=> {
          addToCart({id, title, price, variantColors: colors, 
            sizes: sortBySize(sizes), imgUrl: productImage, 
            quantity: 1, colorSelect, sizeSelect, 
            priceDefaultId, discount
          })
        }}>
          <BsCartPlus size={20} />
          Adicionar ao carrinho
      </ButtonAddToCart>
    </CardCheckoutContainer>
  );
}

export default CardCheckout;