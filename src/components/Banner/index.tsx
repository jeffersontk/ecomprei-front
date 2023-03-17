import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BannerContainer, BannerContent } from './Banner'
import hero from '../../assets/hero/hero.webp'
import heroMobile from '../../assets/hero/heroMoble.webp'

function Banner() {
  return (
    <BannerContainer render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
      <BannerContent visible={{ '@initial': 'show', '@bp2': 'hidden' }}>
        <Image
          src={heroMobile}
          alt="banner é fácil, é rápido, é comprei"
          title="é fácil, é rápido, é comprei"
          unoptimized={true}
          loading="eager"
        />
      </BannerContent>
      <BannerContent visible={{ '@initial': 'hidden', '@bp2': 'show' }}>
        <Image
          src={hero}
          alt="banner é fácil, é rápido, é comprei"
          title="é fácil, é rápido, é comprei"
          unoptimized={true}
          loading="eager"
        />
      </BannerContent>
      <Link href="/produtos" title="compre agora">
        Compre agora
      </Link>
    </BannerContainer>
  )
}

export default Banner
