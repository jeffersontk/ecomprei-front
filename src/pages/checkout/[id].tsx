import React, { useRef} from 'react';
import { ContainerSectionCheckout } from '../../styles/pages/checkout';
import CardCheckout from '../../components/CardCheckout';
import { CopyCheckout } from '../../components/CopyCheckout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getProductById } from '../../server/lib/products';
import Head from 'next/head';
import { getCopyByProductId } from '../../server/lib/copy';
import { alternateArrays } from '../../utils/alternateArray';
import { copyProduct, Product } from 'prisma/prisma-client';
import { ProductUpdate } from '../../utils/types/productsType';

interface CheckoutProps {
  product: ProductUpdate
  copy: any
}

export default function Checkout({product, copy}:CheckoutProps) {
  const heroRef = useRef(null);
  let paragraphs = copy[0]?.paragraphs.reverse() ?? []
  let copyImagesList = product.variantsImage
  const copyWithTextAndImageLink = alternateArrays(copyImagesList, paragraphs)

  if(product){
    return (
      <>
        <Head>
          <title>{product ? product.title : 'É Comprei'}</title>
        </Head>
        <ContainerSectionCheckout  ref={heroRef} render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <CopyCheckout 
            title={product.title}
            copyTextWithImage={copyWithTextAndImageLink}
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
      </>
    )
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  return {
    paths: [
      { 
        params: {
          id: '340fc891-ed78-4998-83b9-ee6b3dfdc6a4',
        }
      },
      { 
        params: {
          id: '8b72a599-f7f7-41fa-9108-b87381187858'
        }
      },
      { 
        params: {
          id: 'b3a9fa6f-d1ca-4c78-9a57-160bbb6149c7',
        }
      },
      { 
        params: {
          id: 'd7c0d782-86c6-4620-a8f3-3143cc16e59d',
        }
      }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {
  const paramsId = params?.id
  const product = await getProductById(String(paramsId))
  const copy = await getCopyByProductId(String(paramsId))
  
  return {
    props: {
      product,
      copy
    },
    revalidate: 60 * 60 * 1
  }
}

