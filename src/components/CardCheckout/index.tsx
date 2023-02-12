import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
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
  const [colorSelect, setColorSelect] = useState('')
  const [sizeSelect, setSizeSelect] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  
  useEffect(()=> {
    if(colors && colors.length > 0) {
      setColorSelect(colors[0].variant)
    }
    if(sizes && sizes.length > 0) {
      setSizeSelect(sizes[0].size)
    }
  }, [colors, sizes])

  const sortSizes = sortBySize(sizes)

  const handleCheckoutSession = async () => {
    setIsLoading(true)
    try {
      if(priceDefaultId){
        const response = await axios.post('/api/checkout', {
          line_item: {
            price: priceDefaultId,
            quantity: quantity,
          },
          metadata: {
            description: `cor: ${colorSelect} - tamanho: ${sizeSelect}`
          },
          discount: discount,
          productId: id
        })
  
        setIsLoading(false)
        const {checkoutUrl} = response.data
        window.location.href = checkoutUrl
      } else {
        setIsLoading(false)
        throw new Error("id de produto não encontrado");
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
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
              sortSizes &&
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
              colors && 
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
      
      <Button 
        w="100%" 
        colorScheme="orange" 
        onClick={handleCheckoutSession}
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        Comprar
      </Button>
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