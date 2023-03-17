import React, { forwardRef } from "react"
import { UseFormRegister } from "react-hook-form/dist/types"

import { GetServerSideProps } from "next"

import { Select as SelectChakra } from "@chakra-ui/react"
import { getProductsAllInfos } from "../../server/lib/products"
import { getCheckout } from "../../server/lib/checkout"

import Head from "next/head"
import { checkSession } from "../../server/lib/auth"

export const Select = forwardRef<
  HTMLSelectElement,
  { label: string; options: string[] } & ReturnType<UseFormRegister<any>>
>(function SelectComponent({ onChange, onBlur, name, label, options }, ref) {
  return (
    <>
      <SelectChakra name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="">Sem {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectChakra>
    </>
  )
})

export type SizeListType = {
  size: string
}

export type ColorListType = {
  variant: string
}

export type ImageListType = {
  url: string
}

export default function Admin({ products, checkoutList }: any) {
  /*   const { isOpen, onOpen, onClose } = useDisclosure()
  const [trackCode, setTrackCode] = useState('')
  const [isSendEmailTrackCode, setIsSendEmailTrackCode] = useState(false)

  const sendTrackingEmail = async ({ name, email, code }: any) => {
    setIsSendEmailTrackCode(true)
    await axios
      .post('/api/trackingcode', {
        code,
        email,
        name,
      })
      .then((resp) => {
        setTrackCode('')
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsSendEmailTrackCode(false)
      })
  } */

  return (
    <>
      <Head>
        <title>Admin | É Comprei</title>
      </Head>
      <div></div>
      {/*  <AdminContainer>
          <Tabs variant='enclosed' colorScheme='orange'>
            <TabList>
              <Tab>Produtos</Tab>
              <Tab>Pedidos</Tab>
            </TabList>
            <TabPanels w="100%">
              <TabPanel w="100%" p="0" py="2">
                <Flex as="header" minW="100%" alignItems="flex-end" justifyItems="flex-end"> 
                  <Button onClick={onOpen}>Adicionar Produto</Button>
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
        </Modal> */}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.sessionId) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
  }

  const refreshSessionId = await checkSession(String(query.sessionId))

  if (!refreshSessionId) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
  }

  try {
    const [products, checkoutList] = await Promise.all([
      getProductsAllInfos(),
      getCheckout(),
    ])

    return {
      props: {
        products,
        checkoutList,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}
