import {PrismaClient} from 'prisma/prisma-client'
const prisma = new PrismaClient()

export const getCopyByProductId = async (productId: string) => {
  const copy = await prisma.copyProduct.findMany({
    where: {
      productId
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
  } catch (error) {
    throw new Error(`Error creating copyProduct: ${error}`);
  }
};