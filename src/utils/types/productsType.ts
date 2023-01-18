export interface ProductDto {
  price: number,
  shipping: string,
  title: string,
  variants?: any,
  discount: number,
  size?: string,
  category: string,
  subCategory?: string,
  shopUrl: string,
  ImageUrl: string,
  variantsImage: any,
  status: boolean,
  highlighted?: boolean,
}

type imageUrlType = {
  url: string
}