import React, { useState } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import image1 from '../../assets/hero/headsetAirProMax.webp'
import image2 from '../../assets/hero/baseBeautyCream.webp'
import image3 from '../../assets/hero/kitpinceis.webp'
import image4 from '../../assets/hero/headsetAirProMaxDesktop.webp'
import image5 from '../../assets/hero/baseBeautyCreamDesktop.webp'
import image6 from '../../assets/hero/kitpinceisDesktop.webp'

import { Dots, SliderContainer } from './Slider';

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
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
    <>
      <SliderContainer 
        ref={sliderRef} 
        className="keen-slider"
        render={{"@initial": 'mobile', "@bp2": 'desktop'}}
        visible={{"@initial": 'show', "@bp2": 'hidden'}}
      >
        <div className="keen-slider__slide number-slide1">
          <button>Compre agora</button>
          <Image src={image1} alt="headset Air Pro Max"/>
        </div>
        <div className="keen-slider__slide number-slide2">
          <button>Compre agora</button>
          <Image src={image2}  alt="Kit 20 pinceis profissional"/>
        </div>
        <div className="keen-slider__slide number-slide3">
          <button>Compre agora</button>
          <Image src={image3} alt="base beauty cream + esponja" />
        </div>
      </SliderContainer>
      <SliderContainer 
        ref={sliderRef} 
        className="keen-slider"
        render={{"@initial": 'mobile', "@bp2": 'desktop'}}
        visible={{"@initial": 'hidden', "@bp2": 'show'}}
      >
        <div className="keen-slider__slide number-slide1">
          <button>Compre agora</button>
          <Image src={image4} alt="headset Air Pro Max" priority/>
        </div>
        <div className="keen-slider__slide number-slide2">
          <button>Compre agora</button>
          <Image src={image5} alt="Kit 20 pinceis profissional" priority/>
        </div>
        <div className="keen-slider__slide number-slide3">
          <button>Compre agora</button>
          <Image src={image6} alt="base beauty cream + esponja" priority/>
        </div>
      </SliderContainer>
      {/* {loaded && instanceRef.current && (
        <Dots className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </Dots>
      )} */}
    </>
  );
}

export default Slider;