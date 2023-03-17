import React from 'react'
import { InformativeContainer } from '../../styles/pages/app'
import { RiSecurePaymentFill, RiMailSendLine } from 'react-icons/ri'
import { FaShippingFast } from 'react-icons/fa'

interface FooterInformativeProps {
  isAdmin?: boolean
}

const FooterInformative: React.FC<FooterInformativeProps> = ({
  isAdmin = false,
}) => {
  return (
    <InformativeContainer
      visible={isAdmin ? 'hidden' : 'show'}
      render={{ '@initial': 'mobile', '@bp2': 'desktop' }}
    >
      <div className="informative">
        <RiSecurePaymentFill size={50} />
        <div className="informativeText">
          <strong>Compra Segura</strong>
          <span>Ambiente seguro para pagamentos online</span>
        </div>
      </div>
      <div className="informative">
        <FaShippingFast size={60} />
        <div className="informativeText">
          <strong>Frete Grátis</strong>
          <span>Envio rápido e acompanhado com código de rastreio</span>
        </div>
      </div>
      <div className="informative">
        <RiMailSendLine size={60} />
        <div className="informativeText">
          <strong>Atendimento Rápido</strong>
          <span>Nossa equipe fará o atendimento o mais rápido possível</span>
        </div>
      </div>
    </InformativeContainer>
  )
}

export default FooterInformative
