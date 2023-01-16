import React, { useRef} from 'react';
import { ContainerSectionCheckout } from '../../styles/pages/checkout';
import CardCheckout from '../../components/CardCheckout';
import { CopyCheckout } from '../../components/CopyCheckout';

export default function Checkout() {
  const heroRef = useRef(null);

  return (
      <ContainerSectionCheckout  ref={heroRef} render={{'@initial': 'mobile', '@bp2': 'desktop'}}>
        <CopyCheckout />
        <CardCheckout />
      </ContainerSectionCheckout>
  )
}