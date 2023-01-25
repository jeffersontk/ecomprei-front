import  React, {useState, forwardRef} from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types';
import { AdminContainer, Container, FormContainer } from "../styles/pages/admin";
import { GetStaticProps } from 'next';
import Image from 'next/image';
import DropMenu from '../components/DropMenu';

import {
  useDisclosure, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  Select as SelectChakra,
} from '@chakra-ui/react';
import CreateProduct from '../components/Forms/createProduct';
import { getProducts } from '../server/lib/products';

export const Select = forwardRef<
HTMLSelectElement,
{ label: string,
  options: string[]
} & ReturnType<UseFormRegister<any>>
>(function SelectComponent({ onChange, onBlur, name, label, options }, ref) {
  return (
    <>
    <label>{label}</label>
    <SelectChakra name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Sem {label}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </SelectChakra>
  </>
  )
});

export type SizeListType = {
  size: string
}

export type ColorListType = {
  variant: string
}

export type ImageListType = {
  url: string
}

export const spreadFunction = (setFunction: any, params: any, value: any, productId?: string) => {
  setFunction((prev:any) => [...prev, {
    [params]: value,
    productId
  }])
}

export default function Admin({products}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [codeAccess, setCodeAccess] = useState('')
  const currentCodeAccess = 'A1A2B1B2'
  const isCurrentCodeAccess = codeAccess === currentCodeAccess


  if(!isCurrentCodeAccess) {
    return(
      <Container>
        <FormContainer autoComplete="off">
          <label htmlFor="codeAccess">Codigo de acesso</label>
          <input type="text" id="codeAccess" onChange={(e)=> setCodeAccess(e.target.value)}/>
        </FormContainer>
      </Container>
    )
  }else {
    return (
      <>
      <AdminContainer>
        <header>
          <h2>Produtos</h2>
          <Button onClick={onOpen}>Adicionar Produto</Button>
        </header>
        <table>
          <thead>
          <tr>
            <th></th>
            <th>nome</th>
            <th>preço</th>
            <th>desconto</th>
            <th>frete</th>
            <th>categoria</th>
            <th>loja</th>
            <th>destaque</th>
            <th>status</th>
            <th>variantes</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id}>
                <td>
                  <Image src={product.ImageUrl} alt="" width={40} height={40}/>
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.discount}</td>
                <td>{product.shipping}</td>
                <td>{product.category}</td>
                <td><a href={product.shopUrl} target='_blank' rel="noreferrer">acessar loja</a></td>
                <td className={product.highlighted ? 'active' : 'disable'}><div className='dot'/></td>
                <td className={product.status ? 'active' : 'disable'}><div className='dot'/></td>
                <td className={product.variants.length > 0 ? 'active' : 'disable'}><div className='dot'/></td>
                <td>
                  <DropMenu product={product}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminContainer>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Produto</ModalHeader>
          <ModalCloseButton />
          <CreateProduct closeModal={onClose}/>
        </ModalContent>
      </Modal>
      </>
    )    
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts()

  return {
    props: {
      products
    },
    revalidate: 5
  }
}