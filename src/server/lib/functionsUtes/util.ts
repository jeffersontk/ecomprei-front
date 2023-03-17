import { ImageUrl } from "prisma/prisma-client"
import { imageUrlType } from "../../../utils/types/productsType"

import { prisma } from "../../../../prisma/client"

export async function updateVariantImages(
  productId: string,
  variantsImage: imageUrlType[],
  isVariantImageProduct: ImageUrl[],
  itemRemoved?: imageUrlType[],
) {
  if (isVariantImageProduct.length === 0 && variantsImage.length === 0) return

  if (variantsImage.length < isVariantImageProduct.length) {
    if (variantsImage.length === 0) {
      await prisma.imageUrl.deleteMany({
        where: {
          productId,
        },
      })
    } else if (itemRemoved) {
      await Promise.all(
        itemRemoved.map((item) =>
          prisma.imageUrl.deleteMany({ where: { url: item.url } }),
        ),
      )
    }
  } else if (variantsImage.length > isVariantImageProduct.length) {
    await prisma.imageUrl.createMany({
      data: variantsImage,
      skipDuplicates: true,
    })
  } else {
    await prisma.imageUrl.createMany({
      data: variantsImage,
      skipDuplicates: true,
    })
  }
}

/*   if(isVariantImageProduct.length > 0) {
    if(variantsImage.length < isVariantImageProduct.length ) {
      if(variantsImage.length === 0) {
        await prisma.imageUrl.deleteMany({
          where: {
            productId: id
          },
        })
      }else if(itemRemoved){
        itemRemoved.map(async item => {
          await prisma.imageUrl.deleteMany({
            where: {
              url: item.url
            },
          })
        })
      }
    }else if(variantsImage.length > isVariantImageProduct.length){
      await prisma.imageUrl.createMany({
        data: variantsImage,
        skipDuplicates: true
      })
    } else {
      await prisma.imageUrl.createMany({
        data: variantsImage,
        skipDuplicates: true
      })
    }
  }else {
    if (variantsImage.length > 0) {
      await prisma.imageUrl.createMany({
        data: variantsImage,
        skipDuplicates: true
      })
    }
  }
   */
