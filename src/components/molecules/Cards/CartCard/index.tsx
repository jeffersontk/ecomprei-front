import { Box, Button, Card, CardBody, FormLabel, Heading, IconButton, Select, Stack, Text, Image as ImageChakra, Flex, Divider, CardFooter } from '@chakra-ui/react'
import Image from 'next/image'
import { variantProduct } from 'prisma/prisma-client';
import React, { useContext, useState } from 'react';
import { BiMinus, BiTrash } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs';
import { CartContext } from '../../../../context/CartContext';
import { BoxImage, CartProduct } from '../../../../styles/pages/Cart'
import { sizeType, } from '../../../../utils/types/productsType'

interface CartCardProps {
  id: string
  imgUrl: string
  title: string
  price: number
  discount: number
  sizes: sizeType[]
  sizeSelect?: string
  colors: variantProduct[]
  colorSelect?: string
  index: number
}

export default function CartCard({
  imgUrl,
  title,
  price,
  discount,
  sizes,
  colors,
  id,
  index,
  sizeSelect,
  colorSelect
}: CartCardProps) {
  const { removeFromCart,  updateQuantity } = useContext(CartContext);
  const [newColorSelect, setNewColorSelect] = useState('')
  const [newSizeSelect, setNewSizeSelect] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleDecrement = (itemId: string) => {
    if (quantity > 1) {
      setQuantity(prev => {
        updateQuantity(itemId, prev - 1)
        return prev - 1
      });
    }
  };

  const handleIncrement = (itemId: string) => {
    setQuantity(prev => {
      updateQuantity(itemId, prev + 1)
      return prev + 1
    });
  };

  function calcularDesconto(precoTotal: number, porcentagemDesconto: number): number {
    let result = precoTotal - (precoTotal * (porcentagemDesconto / 100))
    return +result
  }

  return (
    <Card 
      minW={300} 
      mb="2" 
      ml="1" 
      mr="1"  
      direction={{ base: 'column', sm: 'column',  md: 'column', lg: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <BoxImage render={{'@initial': 'mobile', "@bp2": 'desktop'}}>
        <Image src={imgUrl} alt={title} width={300} height={70} />
      </BoxImage>
      <Stack w="100%">
      <CardBody justifyContent="center" p="2">
        <Stack mt='2' spacing='3'>
          <Heading color='gray.700' size='sm' maxW={300} textOverflow="ellipsis" overflow="hidden">{title}</Heading>
          <Flex alignItems="center">
            <Text color='gray.700' fontSize='xl'>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(calcularDesconto(price, discount))}
              ~ 
              </Text>
              <Text as='del' color='red.500' textDecoration="">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                }).format(price)}
            </Text>
          </Flex>
        </Stack>
      </CardBody>
      <Divider color="gray.300"/>
      <CardFooter p="2" gap="2" minH="66px" alignItems="flex-end" justifyContent="space-between">
        <Box display="flex" alignItems="flex-start" gap="2">
          {
            colors &&
            colors.length > 0 &&
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <FormLabel htmlFor="#" margin={0} mr="1">Cor</FormLabel>
              <Select height={'6'} value={newColorSelect.length === 0 ? colorSelect : newColorSelect} onChange={(e)=> setNewColorSelect(e.target.value)}>
                {colors.map(item=> {
                  if(item.variant) {
                    return (
                      <option key={item.id} value={item.variant}>{item.variant}</option>
                      )
                    }
                  })}
              </Select>
            </Box>
          }
          {
            sizes && 
            sizes.length > 0 &&
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <FormLabel htmlFor="#" margin={0} mr="1">Tamanho</FormLabel>
              <Select height={'6'} value={newSizeSelect.length === 0 ? sizeSelect : newSizeSelect} onChange={(e)=> setNewSizeSelect(e.target.value)}>
                {sizes.map(item=> {
                  if(item.size) {
                    return (
                      <option key={item.id} value={item.size}>{item.size}</option>
                      )
                    }
                  })}
              </Select>
            </Box>
          }
        </Box>
        <Box display="flex" alignItems="center" gap="2">
          <IconButton
            isRound
            size="sm"
            aria-label=''
            icon={quantity > 1 ? <BiMinus size={14} /> : <BiTrash size={14} /> }
            color={quantity > 1 ? 'gray.700' : 'red.500'}
            onClick={()=> {
              if(quantity > 1) {
                handleDecrement(id)
              }else {
                removeFromCart(index)
              }
            }}
          />
          <Text fontSize="2xl">{quantity}</Text>
          <IconButton
            isRound
            size="sm"
            aria-label=''
            color="gray.700"
            icon={<BsPlusLg size={12}/>}
            onClick={()=> {
              handleIncrement(id)
            }}
            >
          </IconButton>
        </Box>
      </CardFooter>
      </Stack>
    </Card>
  )
}
