import Head from 'next/head';
import React from 'react';
import { FaqSection } from '../styles/pages/Faq';

export default function Faq(){
  return (
    <>
     <Head>
      <title>Faq | É comprei</title>
    </Head>
    <FaqSection>
      <h1>Perguntas frequentes</h1>
      
      <details>
        <summary>
          Como faço para comprar um produto?
        </summary>
        <p>   Você pode navegar pelo nosso site, escolher o produto desejado e adicioná-lo ao carrinho de compras. Em seguida, siga as instruções para finalizar a compra.</p>
      </details>

        <details>
          <summary>
          Qual é o prazo de entrega?
          </summary>
          <p>
           O prazo de entrega varia de acordo com a sua localização e o produto escolhido. As informações de prazo de entrega estão disponíveis na página de detalhes do produto.
          </p>
        </details>
        <details>
          <summary>
            Como posso pagar?
          </summary>
          <p>
             Aceitamos pagamentos via cartão de crédito, boleto bancário e transferência bancária.
          </p>
        </details>
        <details>
          <summary>
            Posso trocar ou devolver um produto?
          </summary>
          <p>
             Sim, você pode trocar ou devolver um produto desde que ele esteja em perfeitas condições e dentro do prazo estipulado em nossa política de trocas e devoluções.
          </p>
        </details>
        <details>
          <summary>
          Como entro em contato com o suporte?
          </summary>
          <p>
             Você pode entrar em contato conosco enviando um e-mail para o nosso endereço de e-mail de suporte. Também oferecemos suporte por telefone durante horário comercial.
          </p>
        </details>
    </FaqSection>
    </>
  );
}




