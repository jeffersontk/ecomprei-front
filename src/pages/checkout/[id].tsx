import React, { useRef} from 'react';
import { ContainerSectionCheckout } from '../../styles/pages/checkout';
import CardCheckout from '../../components/CardCheckout';
import { CopyCheckout } from '../../components/CopyCheckout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getProductById } from '../../server/lib/products';

export default function Checkout({product}:any) {
  const heroRef = useRef(null);
  return (
      <ContainerSectionCheckout  ref={heroRef} render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
        <CopyCheckout 
          title={product.title}
        />
        <CardCheckout 
          colors={product.variants}
          discount={product.discount}
          id={product.id}
          price={product.price}
          shipping={product.shipping}
          sizes={product.sizes}
          title={product.title}
          productImage={product.ImageUrl}
        />
      </ContainerSectionCheckout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  return {
    paths: [
      { 
        params: {
          id: '1cf96cd2-ecaf-45ca-893e-8e5fb135c2b2'
        }
      }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {
  const paramsId = params?.id
  const product = await getProductById(String(paramsId))
  
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 1
  }
}

