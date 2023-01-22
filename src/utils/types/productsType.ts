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
  variantsImage: imageUrlType[],
  status: boolean,
  highlighted?: boolean,
}

type imageUrlType = {
  url: string
}

type variantType = {
  variant: string
}

type sizeType = {
  size: string
}