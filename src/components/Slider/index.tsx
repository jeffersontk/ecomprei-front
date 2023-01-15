import React from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import image1 from '../../assets/hero/headsetAirProMax.jpg'
import image2 from '../../assets/hero/baseBeautyCream.png'
import image3 from '../../assets/hero/kitpinceis.png'
import { SliderContainer } from './Slider';

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
          }, 5000)
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
    ]
  )

  return (
    <SliderContainer ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1">
        <button>Compre agora</button>
        <Image src={image1} alt=""/>
      </div>
      <div className="keen-slider__slide number-slide2">
        <button>Compre agora</button>
        <Image src={image2} alt=""/>
      </div>
      <div className="keen-slider__slide number-slide3">
        <button>Compre agora</button>
        <Image src={image3} alt=""/>
      </div>
    </SliderContainer>
  );
}

export default Slider;