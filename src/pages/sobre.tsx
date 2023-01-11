import React from 'react';
import Layout from '../components/Layout';
import { AboutContent } from '../styles/pages/about';

export default function Sobre(){
  return (
    <Layout>
      <AboutContent>
        <h1>Sobre nós</h1>
        <h4><strong>Nosso Negócio</strong></h4>
        <p>O “É comprei” é uma loja online que visa buscar produtos importados que são tendencias no Brasil por um melhor preço! </p>
        <h4><strong>Nossa Missão</strong></h4>
        <p>Contribuir para que bens, até então, acessíveis a uma parcela do público nacional pudesse chegar a todos os brasileiros. Não se trata apenas de consumo, mas da transformação de vidas por meio do acesso a esses produtos.</p>
        <h4><strong>Nossos Valores</strong></h4>
        <p>Inclusão, transparência, acessibilidade e qualidade.</p>
      </AboutContent>
    </Layout>
  );
}