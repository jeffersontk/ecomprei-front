import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import image1 from '../../assets/hero/headsetAirProMax.webp'
import image2 from '../../assets/hero/baseBeautyCream.webp'
import image3 from '../../assets/hero/kitpinceis.webp'
import image4 from '../../assets/hero/headsetAirProMaxDesktop.webp'
import image5 from '../../assets/hero/baseBeautyCreamDesktop.webp'
import image6 from '../../assets/hero/kitpinceisDesktop.webp'

import { SliderContainer } from './Slider'
import Link from 'next/link'

const Slider: React.FC = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
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
          }, 2000)
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
    <>
      <SliderContainer
        ref={sliderRef}
        className="keen-slider"
        render={{ '@initial': 'mobile', '@bp2': 'desktop' }}
        visible={{ '@initial': 'show', '@bp2': 'hidden' }}
      >
        <div className="keen-slider__slide number-slide1">
          <Link href="/checkout/8b72a599-f7f7-41fa-9108-b87381187858">
            <button>Compre agora</button>
          </Link>
          <Image src={image1} alt="headset Air Pro Max" />
        </div>
        <div className="keen-slider__slide number-slide2">
          <Link href="/checkout/b3a9fa6f-d1ca-4c78-9a57-160bbb6149c7">
            <button>Compre agora</button>
          </Link>
          <Image src={image2} alt="Kit 20 pinceis profissional" />
        </div>
        <div className="keen-slider__slide number-slide3">
          <Link href="/checkout/d7c0d782-86c6-4620-a8f3-3143cc16e59d">
            <button>Compre agora</button>
          </Link>
          <Image src={image3} alt="base beauty cream + esponja" />
        </div>
      </SliderContainer>
      <SliderContainer
        ref={sliderRef}
        className="keen-slider"
        render={{ '@initial': 'mobile', '@bp2': 'desktop' }}
        visible={{ '@initial': 'hidden', '@bp2': 'show' }}
      >
        <div className="keen-slider__slide number-slide1">
          <Link href="/checkout/8b72a599-f7f7-41fa-9108-b87381187858">
            <button>Compre agora</button>
          </Link>
          <Image src={image4} alt="headset Air Pro Max" priority />
        </div>
        <div className="keen-slider__slide number-slide2">
          <Link href="/checkout/b3a9fa6f-d1ca-4c78-9a57-160bbb6149c7">
            <button>Compre agora</button>
          </Link>
          <Image src={image5} alt="Kit 20 pinceis profissional" priority />
        </div>
        <div className="keen-slider__slide number-slide3">
          <Link href="/checkout/d7c0d782-86c6-4620-a8f3-3143cc16e59d">
            <button>Compre agora</button>
          </Link>
          <Image src={image6} alt="base beauty cream + esponja" priority />
        </div>
      </SliderContainer>
    </>
  )
}

export default Slider
