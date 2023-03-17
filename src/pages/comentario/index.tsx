import React from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { Button, Stack, Text, Textarea } from '@chakra-ui/react'

interface CommentProps {
  product: {
    title: string
    imageUrl: string
  }
}

export default function Comentario({ product }: CommentProps) {
  const { imageUrl, title } = product

  return (
    <Stack
      width="100%"
      maxW={550}
      align="center"
      justify="center"
      spacing="5"
      py="5"
    >
      <Image src={imageUrl} width={200} height={200} alt={title} />
      <Text fontWeight="semibold" color="gray.500">
        {title}
      </Text>

      <Stack as="form" width="100%" spacing="2">
        <Textarea placeholder="Deixe aqui o que achou do produto!" />
        <Button width="100%" colorScheme="orange">
          Enviar
        </Button>
      </Stack>
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  /*   if(!query.productId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
   */
  /*   const {productId} = query
  const product = await getProductById(String(productId)) */

  return {
    props: {
      /*  product:{
        title: product?.title,
        imageUrl: product?.ImageUrl,
      } */
    },
  }
}
