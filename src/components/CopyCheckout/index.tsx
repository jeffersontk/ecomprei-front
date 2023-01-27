import Image from 'next/image';
import React from 'react';
import { ContentText, CopyCheckoutContainer, Slider, SliderContainer, TextContainer, ThumbnailContainer } from './CopyCheckout';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import image1 from '../../assets/produtos/1.jpg'
import image2 from '../../assets/produtos/2.jpg'
import image3 from '../../assets/produtos/3.jpg'
import image4 from '../../assets/produtos/4.jpg'
import image5 from '../../assets/produtos/5.jpg'
import image6 from '../../assets/produtos/6.jpg'
import copyImage from '../../assets/produtos/copyImage1.jpg'

interface copyCheckout {
  title: string
  copyTextWithImage: any
}

export function CopyCheckout ({
  title,
  copyTextWithImage
}: copyCheckout) {
    const {alternated, rest} = copyTextWithImage
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
  }, [
    (slider) => {
      let timeout: ReturnType<typeof setTimeout>
      let mouseOver = false
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 3000)
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
    },
  ])
  
  return (
    <CopyCheckoutContainer render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
       <TextContainer>
          <ContentText render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
            <span className='title'>{title}</span>
          </ContentText>
      </TextContainer>

      {
        alternated.map((item: any, index: number) => {
            const direction = (index % 2 === 1) ? "left" : "right";
            if (item.message) {
                return (
                    <TextContainer direction={direction} key={index}>
                        <ContentText direction={direction} render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
                            <span>{item.message}</span>
                        </ContentText>
                    </TextContainer>
                )
            } else {
                return (
                    <Image src={item.url} alt="" key={index} width={450} height={450}/>
                )
            }
        })
    }

        {
          copyTextWithImage.rest && 
            <SliderContainer 
              ref={sliderRef} 
              className="keen-slider"
              render={{'@initial': 'mobile', '@bp2': 'desktop'}}
            >
              {copyTextWithImage.rest.map((item: any) => (
                <div className="keen-slider__slide number-slide" key={item}>
                  <Image src={item.url} alt="" width={300} height={300}/>
                </div>
              ))}
            </SliderContainer>
        }
    {/*  


      
      <TextContainer direction="left">
        <ContentText direction="left">
          <span >Esteja pronto para aproveitar o sol sem se preocupar com os danos da radiação UV com nossa camiseta solar de ajuste ao corpo.</span>
        </ContentText>
      </TextContainer>

      <Image src={image2} alt=""/>
      
      <TextContainer direction="right">
        <ContentText direction="right">
          <span>Nossa camiseta solar com ajuste ao corpo é feita com tecido elástico e tecnologia UPF 50+ para garantir que você esteja seguro dos raios UV enquanto desfruta de suas atividades ao ar livre. </span>
        </ContentText>
      </TextContainer>

      <Image src={copyImage} alt=""/>
      
      <TextContainer direction="left">
        <ContentText direction="left">
          <span>Com sua modelagem justa, essa camiseta não só o protege, essa camiseta foi desenhada para se ajustar perfeitamente ao seu corpo!</span>
        </ContentText>
      </TextContainer>

      <SliderContainer 
        ref={sliderRef} 
        className="keen-slider"
        render={{'@initial': 'mobile', '@bp2': 'desktop'}}
      >
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

      <TextContainer direction="right">
        <ContentText direction="right">
          <span>Não perca mais tempo, adquira já a sua camiseta solar de ajuste ao corpo e desfrute de dias de sol sem preocupações!</span>
        </ContentText>
      </TextContainer> */}
      <button>Comprar agora</button> 
    </CopyCheckoutContainer>
  );
}


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