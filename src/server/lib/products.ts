import { ProductDto, ProductUpdate } from '../../utils/types/productsType'
import { updateVariantImages } from './functionsUtes/util'
import { stripe } from './stripe'
import { prisma } from '../../../prisma/client';

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
      stripeProductId: true
    },
  })

  const ProductsInStripe = await stripe.products.list({
    expand: ['data.default_price']
  })

  const productsWithDefaultPrice = products.map(product => {
    const matchingStripeProduct = ProductsInStripe.data.find(stripeProduct => {
      return stripeProduct.id === product.stripeProductId;
    });

    return {
      ...product,
      default_price: matchingStripeProduct ? matchingStripeProduct.default_price : null,
    };
  });

  return productsWithDefaultPrice
}

export const getProductsAllInfos = async () => {
  const product = await prisma.product.findMany({
    include: {
      variants: true,
      sizes: true,
      variantsImage: true,
      copies: true,
    },
  })

  return product
}

export const getProductsByCategory = async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      category
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
      stripeProductId
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
        videoUrl,
        thumbnailUrl,
        shopUrl,
        status,
        variantsImage: {
          create: variantsImage
        },
        highlighted,
        stripeProductId
      }
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
    itemRemoved
  } = data;

  const product = await prisma.product.update({
    where: {
      id: id
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
      productId: id
    }
  })
  const isVariantImageProduct = await prisma.imageUrl.findMany({
    where: {
      productId: id
    }
  })
  const isSizeProduct = await prisma.sizeProduct.findMany({
    where: {
      productId: id
    }
  })
 
  if(isVariantProduct.length > 0) {
    if(isVariantProduct.length !== variants.length) {
      await prisma.variantProduct.updateMany({
        where: {
          productId: id
        },
        data: variants,
      })
  }else {
    await prisma.variantProduct.createMany({
      data: variants,
      skipDuplicates: true
    })
  }
  }else {
    if(variants.length > 0) {
      await prisma.variantProduct.createMany({
        data: variants,
        skipDuplicates: true
      })
    }
  }


  updateVariantImages(id, variantsImage, isVariantImageProduct, itemRemoved)

  if(isSizeProduct.length > 0) {
    if(isSizeProduct.length !== sizes.length) {
      await prisma.sizeProduct.updateMany({
        where: {
          productId: id
        },
        data: sizes,
      })
    }
    else {
      await prisma.sizeProduct.createMany({
        data: sizes,
        skipDuplicates: true
      })
    }
  } 
  else {
    if(sizes.length > 0) {
      await prisma.sizeProduct.createMany({
        data: sizes,
        skipDuplicates: true
      })
    }
  }

  return product
}

export const deleteProduct = async (id: string) => {
  const delProduct = await prisma.product.delete({
    where: {
      id
    }
  })

  return delProduct
}
