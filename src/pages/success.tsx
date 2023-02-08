import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { SuccessContainer, StatusCheckout, ProductCheckout, StatusBar } from '../styles/pages/success'
import "keen-slider/keen-slider.min.css"

export default function Success() {
  const [ref] = useKeenSlider<HTMLDivElement>({
     mode: "free-snap",
    slides: {
      origin: "center",
      perView: 2,
      spacing: 15,
    },
  })

  return (
    <SuccessContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      <StatusCheckout render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
        <div className='headerText'>
          <h2>Compra efetuada!</h2>
          <span>Parabéns! Seu pedido foi realizado com sucesso. Aqui está o status da sua compra</span>
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
      </StatusCheckout>
      <ProductCheckout>
        <div ref={ref} className="keen-slider">
          <div className="keen-slider__slide number-slide1">
            <Image 
              src="https://ik.imagekit.io/wk5c55kzi/maquina_de_barbear/margina-de-barbear-image-7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674570816465" 
              alt=""
              width={200}
              height={200}
              />
            <h3>Maquina de Barbear cortar cabelo Profissional Sem Fio</h3>
          </div>
         {/*  <div className="keen-slider__slide number-slide1">
            <Image 
              src="https://ik.imagekit.io/wk5c55kzi/maquina_de_barbear/margina-de-barbear-image-7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674570816465" 
              alt=""
              width={200}
              height={200}
              />
            <h3>Maquina de Barbear cortar cabelo Profissional Sem Fio</h3>
          </div> */}
        </div>
        <div>
          <Link href="">Voltar ao catalogo</Link>
        </div>
      </ProductCheckout>
    </SuccessContainer>
  )
}
