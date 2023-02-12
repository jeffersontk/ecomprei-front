import React, { useRef} from 'react';
import { ContainerSectionCheckout } from '../../styles/pages/checkout';
import CardCheckout from '../../components/CardCheckout';
import { CopyCheckout } from '../../components/CopyCheckout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getProductById } from '../../server/lib/products';
import Head from 'next/head';
import { getCopyByProductId } from '../../server/lib/copy';
import { alternateArrays } from '../../utils/alternateArray';
import { ProductUpdate } from '../../utils/types/productsType';
import { stripe } from '../../server/lib/stripe';
import Stripe from 'stripe';

interface CheckoutProps {
  product: ProductUpdate
  copy: any
}

export default function Checkout({product, copy}:CheckoutProps) {
  const heroRef = useRef(null);
  let paragraphs = copy[0]?.paragraphs.reverse() ?? []
  let copyImagesList = product.variantsImage
  const copyWithTextAndImageLink = product.videoUrl ? alternateArrays(paragraphs, copyImagesList) 
  : alternateArrays(copyImagesList, paragraphs)

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
            videoUrl={product.videoUrl}
            thumbnailUrl={product.thumbnailUrl}
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
            priceDefaultId={product.defaultPriceId}
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
      },
      { 
        params: {
          id: 'c02d9f9e-3ca0-4d3d-ab9d-d69a5aefbc27',
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
  
  const productInStripe = await stripe.products.list({
    ids: [String(product?.stripeProductId)],
    expand: ['data.default_price']
  })

  const priceInStripe = productInStripe.data[0]?.default_price as Stripe.Price

  return {
    props: {
      product: {
        ...product,
        defaultPriceId: priceInStripe?.id || null
      },
      copy
    },
    revalidate: 60 * 60 * 1
  }
}

