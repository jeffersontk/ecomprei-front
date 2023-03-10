export interface ProductDto {
  price: number,
  shipping: string,
  title: string,
  variants: variantType[],
  discount: number,
  sizes: sizeType[],
  category: string,
  subCategory?: string,
  shopUrl: string,
  ImageUrl: string,
  videoUrl?: string,
  thumbnailUrl?: string,
  variantsImage: imageUrlType[],
  status: boolean,
  highlighted?: boolean,
  stripeProductId?: string
}

export interface ProductUpdate {
  id: string,
  price: number,
  shipping: string,
  title: string,
  variants: variantType[],
  discount: number,
  sizes: sizeType[],
  category: string,
  subCategory?: string,
  shopUrl: string,
  ImageUrl: string,
  videoUrl?: string,
  thumbnailUrl?: string,
  variantsImage: imageUrlType[],
  status: boolean,
  highlighted?: boolean,
  stripeProductId?: string
  defaultPriceId: string
  itemRemoved?: imageUrlType[]
}


export type imageUrlType = {
  id: string
  url: string
  productId: string
}

export type variantType = {
  id: string
  variant: string
  productId: string
}

export type sizeType = {
  id: string
  size: string
  productId: string
}