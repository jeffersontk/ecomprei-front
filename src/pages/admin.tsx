import  React, {useState, useEffect, forwardRef} from 'react'
import { SubmitHandler, UseFormRegister } from 'react-hook-form/dist/types';
import { AdminContainer, Container, FormContainer } from "../styles/pages/admin";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
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
  useToast,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  TableContainer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
  Text,
  Stack,
  Input,
} from '@chakra-ui/react';
import CreateProduct from '../components/Forms/createProduct';
import { getProductsAllInfos } from '../server/lib/products';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { getCheckout } from '../server/lib/checkout';
import { Portal } from '@radix-ui/react-dialog';
import { ButtonWithPopover } from '../components/molecules/Buttons/buttonWithPopover';

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

type codeAccess = {
  code: string
}

export const spreadFunction = (setFunction: any, params: any, value: any, productId?: string) => {
  setFunction((prev:any) => [...prev, {
    [params]: value,
    productId
  }])
}

export default function Admin({products, checkoutList}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [codeAccess, setCodeAccess] = useState(false)
  const {  handleSubmit, register } = useForm<codeAccess>();
  const [isLoading, setIsLoading] = useState(false)
  const [ trackCode, setTrackCode ] = useState('')
  const [isSendEmailTrackCode, setIsSendEmailTrackCode] = useState(false)
  const toast = useToast()

  const onSubmit: SubmitHandler<codeAccess> = async (data, event) =>  {
    event?.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post('/api/auth', data).then(res => res.data)
      if(response.data){
        toast({
          title: 'Código Verificado',
          description: "Autorizado",
          status: 'success',
          duration: 2000,
        })
        setIsLoading(false)
        setCodeAccess(response.data)
      }else {
        toast({
          title: 'Código Verificado',
          description: "Negado",
          status: 'error',
          duration: 2000,
        })
        setIsLoading(false)
        setCodeAccess(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const sendTrackingEmail = async ({name, email, code}: any) => {
    setIsSendEmailTrackCode(true)
    await axios.post('/api/trackingcode', {
      code,
      email,
      name
    }).then((resp) => {
      setTrackCode('')
    }).catch((error) => {
      console.error(error)
    }).finally(()=> {
      setIsSendEmailTrackCode(false)
    })
  }

  if(!codeAccess) {
    return(
      <Container>
        <FormContainer autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="codeAccess">Código de acesso</label>
          <input type="text" id="codeAccess" {...register("code")}/>
          <Button 
            type='submit'
            isLoading={isLoading}
            loadingText='Verificando'
            _hover={{
              opacity: '0.9'
            }}
          >
            Entrar
          </Button>
        </FormContainer>
      </Container>
    )
  }else {
    return (
      <>
        <AdminContainer>
          <Tabs variant='enclosed' colorScheme='orange'>
            <TabList>
              <Tab>Produtos</Tab>
              <Tab>Pedidos</Tab>
            </TabList>
            <TabPanels w="100%">
              <TabPanel w="100%" p="0" py="2">
                <Flex as="header" minW="100%" alignItems="flex-end" justifyItems="flex-end"> 
                  <Button isLoading={isLoading} onClick={onOpen}>Adicionar Produto</Button>
                </Flex>
                <TableContainer mt="2" maxH={500} overflowY="scroll">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th></Th>
                        <Th>nome</Th>
                        <Th>preço</Th>
                        <Th>desconto</Th>
                        <Th>frete</Th>
                        <Th>categoria</Th>
                        <Th>loja</Th>
                        <Th>destaque</Th>
                        <Th>status</Th>
                        <Th>variantes</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {products.map((product: any) => (
                        <Tr key={product.id}>
                          <td>
                            <Image src={product.ImageUrl} alt="" width={50} height={50}/>
                          </td>
                          <Td>{product.title}</Td>
                          <Td>{product.price}</Td>
                          <Td>{product.discount}</Td>
                          <Td>{product.shipping}</Td>
                          <Td>{product.category}</Td>
                          <Td><a href={product.shopUrl} target='_blank' rel="noreferrer">acessar loja</a></Td>
                          <Td className={product.highlighted ? 'active' : 'disable'}><div className='dot'/></Td>
                          <Td className={product.status ? 'active' : 'disable'}><div className='dot'/></Td>
                          <Td className={product.variants.length > 0 ? 'active' : 'disable'}><div className='dot'/></Td>
                          <Td>
                            <DropMenu product={product}/>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel p="0" py="2">
                <Accordion allowToggle>
                  {
                    checkoutList.map((checkout: any) => (
                    <AccordionItem key={checkout.id}>
                      <h2>
                        <AccordionButton>
                          <Flex flex='1' gap="2" textAlign='left'>
                            <Text>
                              {checkout.clientName} /
                            </Text>
                            <Text>
                              {checkout.clientEmail} /
                            </Text>  
                            <Text>
                              {checkout.clientPhone} /
                            </Text>
                            <Text>
                              Status de pagamento: {checkout.status} 
                            </Text>
                          </Flex>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Flex flex='1' gap="2" textAlign='left'>
                          <Text>
                            {checkout.clientAddress.city}
                          </Text>
                          <Text>
                            {checkout.clientAddress.country}
                          </Text>
                          <Text>
                            {checkout.clientAddress.line1}
                          </Text>
                          <Text>
                            {checkout.clientAddress.line2}
                          </Text>
                          <Text>
                            {checkout.clientAddress.postal_code}
                          </Text>
                          <Text>
                            {checkout.clientAddress.state}
                          </Text>
                        </Flex>
                        <Stack>
                          {checkout.productsInCheckout.map((product: any)=> (
                            <Text key={product.id}>{product.name}</Text>
                          ))}
                        </Stack>
                        <Flex flex='1' gap="2" justifyContent="flex-end">
                          <ButtonWithPopover 
                            buttonTriggerText='Enviar código de rastreio'
                            onClick={()=> sendTrackingEmail({
                              code: trackCode,
                              name: checkout.clientName,
                              email: checkout.clientEmail
                            })}
                            isLoading={isSendEmailTrackCode}
                          > 
                            <Input placeholder='Código de rastreio' value={trackCode} onChange={(e)=> setTrackCode(e.target.value)} />
                          </ButtonWithPopover>
                          
                          <Button colorScheme="blue">Pedir comentário</Button>
                          <Button colorScheme="green">Enviar cupom de desconto</Button>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                    ))
                  }
                </Accordion>                        
              </TabPanel>
            </TabPanels>
          </Tabs>
        
  
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [products, checkoutList] = await Promise.all([
      getProductsAllInfos(),
      getCheckout(),
    ]);

    return {
      props: {
        products,
        checkoutList,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}