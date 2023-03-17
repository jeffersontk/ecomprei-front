import Image from 'next/image'
import React from 'react'
import {
  ContentText,
  CopyCheckoutContainer,
  SliderContainer,
  TextContainer,
} from './CopyCheckout'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Video } from '../molecules/Video'

interface copyCheckout {
  title: string
  copyTextWithImage: any
  videoUrl?: string
  thumbnailUrl?: string
}

export function CopyCheckout({
  title,
  copyTextWithImage,
  videoUrl,
  thumbnailUrl,
}: copyCheckout) {
  const { alternated } = copyTextWithImage
  const [sliderRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slides: {
        perView: 1,
        spacing: 0,
      },
    },
    [
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
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ],
  )

  return (
    <CopyCheckoutContainer render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
      <TextContainer>
        <ContentText render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
          <span className="title">{title}</span>
        </ContentText>
      </TextContainer>
      {videoUrl && thumbnailUrl && (
        <Video src={videoUrl} thumbnailUrl={thumbnailUrl} />
      )}
      {alternated.map((item: any, index: number) => {
        const direction = index % 2 === 1 ? 'left' : 'right'
        if (item.message) {
          return (
            <TextContainer direction={direction} key={item.id}>
              <ContentText
                direction={direction}
                render={{ '@initial': 'mobile', '@bp2': 'desktop' }}
              >
                <span>{item.message}</span>
              </ContentText>
            </TextContainer>
          )
        } else {
          return (
            <Image
              src={item.url}
              alt=""
              key={item.id}
              width={450}
              height={450}
            />
          )
        }
      })}

      {copyTextWithImage.rest && (
        <SliderContainer
          ref={sliderRef}
          className="keen-slider"
          render={{ '@initial': 'mobile', '@bp2': 'desktop' }}
        >
          {copyTextWithImage.rest.map((item: any) => (
            <div className="keen-slider__slide number-slide" key={item.id}>
              <Image src={item.url} alt="" width={300} height={300} />
            </div>
          ))}
        </SliderContainer>
      )}
      <a href="#checkout">Comprar agora</a>
    </CopyCheckoutContainer>
  )
}
