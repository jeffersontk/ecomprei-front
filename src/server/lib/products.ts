import { ProductDto, ProductUpdate } from "../../utils/types/productsType"
import { updateVariantImages } from "./functionsUtes/util"
import { stripe } from "./stripe"
import { prisma } from "../../../prisma/client"

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      price: true,
      title: true,
      discount: true,
      ImageUrl: true,
      highlighted: true,
      sizes: true,
      variants: true,
      stripeProductId: true,
    },
  })

  const ProductsInStripe = await stripe.products.list({
    expand: ["data.default_price"],
  })

  const productsWithDefaultPrice = products.map((product) => {
    const matchingStripeProduct = ProductsInStripe.data.find(
      (stripeProduct) => {
        return stripeProduct.id === product.stripeProductId
      },
    )

    return {
      ...product,
      default_price: matchingStripeProduct
        ? matchingStripeProduct.default_price
        : null,
    }
  })

  return productsWithDefaultPrice
}

export const getProductsAllInfos = async () => {
  const product = await prisma.product.findMany({
    include: {
      variants: true,
      sizes: true,
      variantsImage: true,
      copies: {
        select: {
          paragraphs: true,
        },
      },
    },
  })

  return product
}

export const getProductsByCategory = async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      category,
    },
    select: {
      id: true,
      price: true,
      title: true,
      discount: true,
      ImageUrl: true,
      highlighted: true,
      subCategory: true,
      category: true,
    },
  })

  return products
}

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      variants: true,
      sizes: true,
      variantsImage: true,
      copies: true,
    },
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
    videoUrl,
    thumbnailUrl,
    shopUrl,
    status,
    variantsImage,
    highlighted,
    stripeProductId,
    copies,
  } = data

  const product = await prisma.product.create({
    data: {
      price,
      shipping,
      title,
      variants: {
        create: variants,
      },
      discount,
      sizes: {
        create: sizes,
      },
      category,
      subCategory,
      ImageUrl,
      videoUrl,
      thumbnailUrl,
      shopUrl,
      status,
      variantsImage: {
        create: variantsImage,
      },
      highlighted,
      stripeProductId,
      copies: {
        create: {
          paragraphs: {
            create: copies.paragraphs,
          },
        },
      },
    },
  })

  return product
}

export const putProduct = async (data: ProductUpdate) => {
  const {
    id,
    price,
    shipping,
    title,
    variants,
    discount,
    sizes,
    category,
    subCategory,
    ImageUrl,
    videoUrl,
    thumbnailUrl,
    shopUrl,
    status,
    variantsImage,
    highlighted,
    stripeProductId,
    itemRemoved,
    copies,
  } = data

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      price,
      shipping,
      title,
      discount,
      category,
      subCategory,
      ImageUrl,
      videoUrl,
      thumbnailUrl,
      shopUrl,
      status,
      highlighted,
      stripeProductId,
    },
  })

  const isVariantProduct = await prisma.variantProduct.findMany({
    where: {
      productId: id,
    },
  })
  const isVariantImageProduct = await prisma.imageUrl.findMany({
    where: {
      productId: id,
    },
  })
  const isSizeProduct = await prisma.sizeProduct.findMany({
    where: {
      productId: id,
    },
  })
  const isCopyProduct = await prisma.copyProduct.findMany({
    where: {
      productId: id,
    },
    select: {
      paragraphs: true,
      id: true,
    },
  })

  if (isVariantProduct.length > 0) {
    if (isVariantProduct.length !== variants.length && variants.length > 0) {
      await prisma.variantProduct.updateMany({
        where: {
          productId: id,
        },
        data: variants,
      })
    } else if (variants.length === 0) {
      await prisma.variantProduct.deleteMany({
        where: {
          productId: id,
        },
      })
    } else {
      await prisma.variantProduct.createMany({
        data: variants,
        skipDuplicates: true,
      })
    }
  } else {
    if (variants.length > 0) {
      await prisma.variantProduct.createMany({
        data: variants,
        skipDuplicates: true,
      })
    }
  }
  const productQuery = { productId: id }
  const createCopy = {
    paragraphs: { create: copies.paragraphs },
    product: { connect: { id } },
  }
  if (isCopyProduct[0].paragraphs.length > 0) {
    if (
      isCopyProduct[0].paragraphs.length !== copies.paragraphs.length &&
      copies.paragraphs.length > 0
    ) {
      await prisma.copyProduct.updateMany({
        where: {
          productId: id,
        },
        data: copies,
      })
    } else if (copies.paragraphs.length === 0) {
      await prisma.paragrapher.deleteMany({
        where: {
          AND: [
            { copyProductId: isCopyProduct[0].id },
            { NOT: { id: { in: copies.paragraphs.map((p: any) => p.id) } } },
          ],
        },
      })
      await prisma.copyProduct.deleteMany({ where: productQuery })
    } else if (
      JSON.stringify(copies.paragraphs) !==
      JSON.stringify(isCopyProduct[0].paragraphs)
    ) {
      await prisma.copyProduct.updateMany({
        where: productQuery,
        data: copies,
      })
    } else if (
      JSON.stringify(copies.paragraphs) ===
      JSON.stringify(isCopyProduct[0].paragraphs)
    ) {
      return
    } else {
      await prisma.copyProduct.create({ data: createCopy })
    }
  } else if (copies.paragraphs.length > 0) {
    await prisma.copyProduct.create({ data: createCopy })
  }

  updateVariantImages(id, variantsImage, isVariantImageProduct, itemRemoved)

  if (isSizeProduct.length > 0) {
    if (isSizeProduct.length !== sizes.length && sizes.length > 0) {
      await prisma.sizeProduct.updateMany({
        where: {
          productId: id,
        },
        data: sizes,
      })
    } else if (sizes.length === 0) {
      await prisma.sizeProduct.deleteMany({
        where: {
          productId: id,
        },
      })
    } else {
      await prisma.sizeProduct.createMany({
        data: sizes,
        skipDuplicates: true,
      })
    }
  } else {
    if (sizes.length > 0) {
      await prisma.sizeProduct.createMany({
        data: sizes,
        skipDuplicates: true,
      })
    }
  }

  return product
}

export const deleteProduct = async (id: string) => {
  const delProduct = await prisma.product.delete({
    where: {
      id,
    },
  })

  return delProduct
}
