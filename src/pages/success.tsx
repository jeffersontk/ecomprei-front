import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { SuccessContainer, StatusCheckout, ProductCheckout, StatusBar } from '../styles/pages/success'
import "keen-slider/keen-slider.min.css"
import { GetServerSideProps } from 'next'
import { stripe } from '../server/lib/stripe'
import Head from 'next/head'

type product = {
  name: string;
  imageUrl: string
}

interface SuccessProp {
  customerName: string
  products: product[]
}

export default function Success({customerName, products}: SuccessProp) {
  const [ref] = useKeenSlider<HTMLDivElement>({
     mode: "free-snap",
    slides: {
      origin: "center",
      perView: 2,
      spacing: 15,
    },
  })

  return (
    <>
    <Head>
      <title>Compra efetuada | É comprei</title>
      <meta name='robots' content='noindex' />
    </Head>
    <SuccessContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      <StatusCheckout render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
        <div className='headerText'>
          <h2>Compra efetuada!</h2>
          <span>Parabéns! <strong>{customerName}</strong> seu pedido foi realizado com sucesso. Aqui está o status da sua compra</span>
        </div>
        <StatusBar render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <div className='status-item'>
            <div className='status-check'>
              <BsCheckCircleFill />
              <div className='bar check'/>
            </div>
            <span>Seleção dos produtos</span>
          </div>
          <div className='status-item'>
            <div className='status-check'>
              <BsCheckCircleFill />
              <div className='bar check'/>
            </div>
            <span>Confirmação do carrinho</span>
          </div>
          <div className='status-item'>
            <div className='status-check'>
              <BsCheckCircleFill />
              <div className='bar progress'/>
            </div>
            <span>Informações de envio</span>
          </div>
          <div className='status-item'>
            <div className='status-progress'>
              <BsCheckCircleFill />
            </div>
            <span>Confirmação do pagamento</span>
          </div>
        </StatusBar>
        <span className='contact-text'>Entraremos em contato para disponibilizar o código de rastreio</span>
      </StatusCheckout>
      <ProductCheckout>
        <div ref={ref} className="keen-slider">
          {
            products.map((product, index) => (
            <div className="keen-slider__slide number-slide1 box" key={index}>
              <Image 
                src={product.imageUrl} 
                alt={product.name}
                width={200}
                height={200}
                />
              <h3>{product.name}</h3>
            </div>
            ))
          }
        </div>
        <div>
          <Link href="/produtos">Voltar ao catalogo</Link>
        </div>
      </ProductCheckout>
    </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name
  const lineItems = session.line_items?.data
  
  const products = lineItems?.map((items: any) => {
    if(items.price.product) {
      return ({
        name: items.price.product.name,
        imageUrl:items.price.product.images[0]
      })
    }
  })

  return {
    props: {
      customerName,
      products
    }
  }
}