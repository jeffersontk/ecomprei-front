import {
  Button,
  Card,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import Head from "next/head"
import React, { useState } from "react"
import HeaderAdmin from "../../../components/molecules/HeaderAdmin/Index"
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai"
import { FaTrashAlt } from "react-icons/fa"
import { GoKebabVertical } from "react-icons/go"
import { type GetServerSideProps } from "next"
import { checkSession } from "../../../server/lib/auth"
import { ProductUpdate } from "../../../utils/types/productsType"
import { getProductsAllInfos } from "../../../server/lib/products"
import Link from "next/link"
import Image from "next/image"
import EditProduct from "../../../components/Forms/EditProduct"
import CreateProduct from "../../../components/Forms/createProduct"
import ModalAdmin from "../../../components/molecules/ModalAdmin"
import axios from "axios"
import { useRouter } from "next/router"

export default function Products({ products }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()
  const [productSelected, setProductSelected] = useState<ProductUpdate>()
  const [isLoading, setIsLoading] = useState(false)
  const setDefaultValue = (product: ProductUpdate) => {
    setProductSelected(product)
  }
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleDelete = async (productId: string) => {
    setIsLoading(true)
    const dataDelete = {
      params: {
        id: productId,
      },
    }
    await axios
      .delete("/api/products", dataDelete)
      .then(() => {
        refreshData()
        onCloseDelete()
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Head>
        <title>Produtos - Admin </title>
      </Head>
      <Stack px="20" py="10" spacing={4}>
        <HeaderAdmin
          title="Produtos"
          buttonTitle="Produto"
          buttonIcon={<AiFillPlusCircle size="24" />}
          onClick={onOpen}
        />
        <Card p="4" boxShadow="md">
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th px="0"></Th>
                  <Th>Nome</Th>
                  <Th>Preço</Th>
                  <Th>Desconto</Th>
                  <Th>Categoria</Th>
                  <Th>Fornecedor</Th>
                  <Th>Destaque</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.length > 0 &&
                  products.map((product: any) => (
                    <Tr key={product.id}>
                      <Td
                        px="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          src={product.ImageUrl}
                          alt={product.title}
                          width={40}
                          height={40}
                        />
                      </Td>
                      <Td>{product.title}</Td>
                      <Td>{product.price}</Td>
                      <Td>{product.discount}</Td>
                      <Td>{product.category}</Td>
                      <Td>
                        <Link href={product.shopUrl} target="_blank">
                          ir ao fornecedor
                        </Link>
                      </Td>
                      <Td>
                        <Tag
                          size="md"
                          variant="outline"
                          colorScheme={product.highlighted ? "green" : "red"}
                        >
                          <TagLabel>
                            {product.highlighted ? "Ativo" : "desativado"}
                          </TagLabel>
                        </Tag>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<GoKebabVertical size="26" />}
                            variant="full"
                          />
                          <MenuList>
                            <MenuItem
                              icon={<AiFillEdit size="18" />}
                              command="⌘T"
                              onClick={() => {
                                setDefaultValue(product)
                                onOpenEdit()
                              }}
                            >
                              Editar produto
                            </MenuItem>
                            <MenuItem
                              icon={<FaTrashAlt size="16" />}
                              command="⌘N"
                              color="red.400"
                              onClick={() => {
                                setDefaultValue(product)
                                onOpenDelete()
                              }}
                            >
                              Deletar produto
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </Stack>

      <CreateProduct isOpen={isOpen} onClose={onClose} />
      {productSelected && (
        <EditProduct
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          product={productSelected}
        />
      )}
      {productSelected && (
        <ModalAdmin
          titleHeader="Deletar produto"
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
        >
          <Stack>
            <Flex justifyContent="center">
              <Text fontSize="xl">
                Tem certeza que deseja deletar <br />
                <strong>{productSelected.title}</strong>
              </Text>
            </Flex>
            <Divider />
            <Flex gap="4" justifyContent="flex-end">
              <Button onClick={onCloseDelete}>Cancelar</Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(productSelected.id)}
                disabled={isLoading}
                isLoading={isLoading}
              >
                Sim quero deletar
              </Button>
            </Flex>
          </Stack>
        </ModalAdmin>
      )}
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
    const products = await getProductsAllInfos()

    return {
      props: {
        products,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}
