import {PrismaClient} from 'prisma/prisma-client'
import { ProductDto } from '../../utils/types/productsType'

const prisma = new PrismaClient()

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      variantsImage: true,
      variants: true
    }
  })
  
  return products
}

export const getProductsByCategory = async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      category
    },
    include: {
      variantsImage: true,
      variants: true
     }
  })

  return products
}

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      variants: true,
      sizes: true,
      variantsImage: true,
    }
  })

  return product
}

export const postProducts = async (data: ProductDto) => {
     const {
      price,
      shipping,
      title,
      variants,
      discount,
      sizes,
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
        sizes: {
          create: sizes
        },
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