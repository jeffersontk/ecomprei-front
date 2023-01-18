
import { NextApiRequest } from 'next'
import {PrismaClient} from 'prisma/prisma-client'
import { ProductDto } from '../../utils/types/productsType'

const prisma = new PrismaClient()

export const getProducts = async () => {
  const products = await await prisma.product.findMany({
   include: {
    variantsImage: true,
    variants: true
   }
  })

  return products
}

export const postProducts = async (data: ProductDto) => {
     const {
      price,
      shipping,
      title,
      variants,
      discount,
      size,
      category,
      subCategory,
      ImageUrl,
      shopUrl,
      status,
      variantsImage,
      highlighted
    } = data;

    const product = await prisma.product.create({
      data:{
        price,
        shipping,
        title,
        variants: {
          create: variants
        },
        discount,
        size,
        category,
        subCategory,
        ImageUrl,
        shopUrl,
        status,
        variantsImage: {
          create: variantsImage
        },
        highlighted
      }
    })

    return product
}