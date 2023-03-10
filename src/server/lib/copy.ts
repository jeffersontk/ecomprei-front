import { prisma } from '../../../prisma/client';

export const getCopyByProductId = async (productId: string) => {
  const copy = await prisma.copyProduct.findMany({
    where: {
      productId
    },
    include: {
      paragraphs: true
    }
  })

  return copy
}

type copyPost = {
  paragraphs: {
    message:string
  }[],
  productId: string
}
export const postCopyProduct = async (data: copyPost) => {
  const {paragraphs, productId} = data;
  try {
    const isCopy = await prisma.copyProduct.findFirst({
      where: {
        productId
      }
    })
    if(!isCopy){
      const copyProduct = await prisma.copyProduct.create({
        data: {
          paragraphs: {
            create: paragraphs
          },
          product: {
            connect: {
              id: productId
            }
          }
        }
      });
      return copyProduct
    } else {
      throw new Error(`Error creating copyProduct: copy already exists`);
    }
  } catch (error) {
    throw new Error(`Error creating copyProduct: ${error}`);
  }
};