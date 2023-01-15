import Image from 'next/image';
import React from 'react';
import Layout from '../../components/Layout';
import { ContainerSectionCheckout, CopyCheckout, Slider, SliderContainer, ThumbnailContainer } from '../../styles/pages/checkout';
import CardCheckout from '../../components/CardCheckout';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import image1 from '../../assets/produtos/1.jpg'
import image2 from '../../assets/produtos/2.jpg'
import image3 from '../../assets/produtos/3.jpg'
import image4 from '../../assets/produtos/4.jpg'
import image5 from '../../assets/produtos/5.jpg'
import image6 from '../../assets/produtos/6.jpg'
import copyImage from '../../assets/produtos/copyImage1.jpg'
import copyImage2 from '../../assets/produtos/copyImage2.jpg'
import Link from 'next/link';


function ThumbnailPlugin(mainRef: any) {
  return (slider: any) => {
    function removeActive() {
      slider.slides.forEach((slide: any) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: any) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide: any, idx: any) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export default function Checkout() {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1,
      spacing: 0,
    },
  })

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 6,
        spacing: 5,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
/*     <Layout> */
      <ContainerSectionCheckout render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
        <CopyCheckout render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
          <Slider>
            <SliderContainer ref={sliderRef} className="keen-slider">
              <div className="keen-slider__slide number-slide1">
                <Image src={image1} alt=""/>
              </div>
              <div className="keen-slider__slide number-slide2">
                <Image src={image2} alt="" />
              </div>
              <div className="keen-slider__slide number-slide3">
                <Image src={copyImage2} alt=""/>
              </div>
              <div className="keen-slider__slide number-slide3">
                <Image src={copyImage} alt=""/>
              </div>
              <div className="keen-slider__slide number-slide3">
                <Image src={image3} alt=""/>
              </div>
              <div className="keen-slider__slide number-slide4">
                <Image src={image4} alt=""/>
              </div>
              <div className="keen-slider__slide number-slide5">
                <Image src={image5} alt=""/>
              </div>
              <div className="keen-slider__slide number-slide6">
                <Image src={image6} alt=""/>
              </div>
            </SliderContainer>
            <ThumbnailContainer ref={thumbnailRef} className="keen-slider thumbnail">
              <div className="keen-slider__slide number-slide1">
                <Image src={image1} alt="" />
              </div>
              <div className="keen-slider__slide number-slide2">
                <Image src={image2} alt="" />
              </div>
              <div className="keen-slider__slide number-slide3">
                <Image src={copyImage2} alt=""/>
              </div>
              <div className="keen-slider__slide number-slide3">
                <Image src={copyImage} alt=""/>
              </div>
              <div className="keen-slider__slide number-slide3">
                <Image src={image3} alt="" />
              </div>
              <div className="keen-slider__slide number-slide4">
                <Image src={image4} alt="" />
              </div>
              <div className="keen-slider__slide number-slide5">
                <Image src={image5} alt="" />
              </div>
              <div className="keen-slider__slide number-slide6">
                <Image src={image6} alt="" />
              </div>
            </ThumbnailContainer>
          </Slider>
          <br />
          <h1>Camiseta manga longa térmica slim fit com proteção UV50</h1>
          <br />
          <p>Esteja pronto para aproveitar o sol sem se preocupar com os danos da radiação UV com nossa camiseta solar de ajuste ao corpo.</p>
          <br />
          <p>Nossa camiseta solar com ajuste ao corpo é feita com tecido elástico e tecnologia UPF 50+ para garantir que você esteja seguro dos raios UV enquanto desfruta de suas atividades ao ar livre. Com sua modelagem justa, essa camiseta não só o protege, essa camiseta foi desenhada para se ajustar perfeitamente ao seu corpo!</p>
          <br />
          <p> Com a gola em U e as mangas compridas, você também tem a proteção adicional para o pescoço e braços. O tecido é respirável e macio ao toque, garantindo conforto durante todo o dia. Adquira já a sua camiseta solar de gola U e manga comprida de ajuste ao corpo e desfrute de dias de sol sem preocupações!</p>
          <br />
          <p> Não perca mais tempo, adquira já a sua camiseta solar de ajuste ao corpo e desfrute de dias de sol sem preocupações!</p>
          <br />
          <button>Comprar agora</button>
        </CopyCheckout>
        <CardCheckout />
      </ContainerSectionCheckout>
/*     </Layout> */
  )
}