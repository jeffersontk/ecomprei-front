import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories'
import { GridCards } from '../../styles/pages/home'
import { Container, FilterSection } from '../../styles/pages/produtos'
import { useRouter } from 'next/router'
import SimpleCard from '../../components/SimpleCard'
import Slider from '../../components/Slider'
import { getProductsByCategory } from '../../server/lib/products'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import notFound from '../../assets/notFound.svg'
import Image from 'next/image'

export default function Produtos({ products }: any) {
  const { query } = useRouter()
  const [filterProducts, setFilterProducts] = useState([])
  const title = query.slug || 'Moda'
  const [tabIndex, setTabIndex] = useState(0)

  const formatTitle = (title: string) => {
    const format = title
    switch (format) {
      case 'utilidades&acessorios':
        return 'Utilidades & Acessórios'.toUpperCase()
      case 'saude&beleza':
        return 'Saúde & Beleza'.toUpperCase()
      default:
        return format.toUpperCase()
    }
  }

  const handleFilterProducts = (param: string) => {
    const filter = products.filter((product: any) => {
      if (product.subCategory === param) {
        return product
      }
      return {}
    })
    setFilterProducts(filter)
  }

  useEffect(() => {
    if (query.filtro === 'feminina') {
      setTabIndex(1)
      handleFilterProducts('feminina')
    }
  }, [query, handleFilterProducts])

  const handleTabsChange = (index: any) => {
    setTabIndex(index)
  }

  return (
    <>
      <Head>
        <title>É Comprei - {title}</title>
      </Head>
      <Container>
        <Slider />
        <Categories />

        <Tabs colorScheme="orange" index={tabIndex} onChange={handleTabsChange}>
          <FilterSection
            render={{ '@initial': 'mobile', '@bp2': 'desktop' }}
            id="productsGrid"
          >
            <h2>{formatTitle(String(title))}</h2>
            {title === 'moda' && (
              <TabList>
                <Tab>Todos</Tab>
                <Tab onClick={() => handleFilterProducts('feminina')}>
                  Feminina
                </Tab>
                <Tab onClick={() => handleFilterProducts('masculina')}>
                  Masculina
                </Tab>
                <Tab onClick={() => handleFilterProducts('infantil')}>
                  Infantil
                </Tab>
              </TabList>
            )}
          </FilterSection>
          <TabPanels p="0">
            <TabPanel p="0">
              {products && products.length > 0 ? (
                <GridCards render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
                  {products.map((product: any) => (
                    <SimpleCard
                      key={product.id}
                      id={product.id}
                      discount={product.discount}
                      imgUrl={product.ImageUrl}
                      price={product.price}
                      title={product.title}
                      sizes={product.sizes}
                      variantColors={product.variants}
                      priceDefaultId={product.default_price?.id}
                    />
                  ))}
                </GridCards>
              ) : (
                <Flex
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Image
                    src={notFound}
                    alt="not Found"
                    width={300}
                    height={200}
                  />
                  <Text fontWeight="semibold" color="gray.500">
                    Não encontramos esse tipo de produto
                  </Text>
                </Flex>
              )}
            </TabPanel>
            <TabPanel p="0">
              {filterProducts.length > 0 ? (
                <GridCards render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
                  {filterProducts.map((product: any) => (
                    <SimpleCard
                      key={product.id}
                      id={product.id}
                      discount={product.discount}
                      imgUrl={product.ImageUrl}
                      price={product.price}
                      title={product.title}
                      sizes={product.sizes}
                      variantColors={product.variants}
                      priceDefaultId={product.default_price?.id}
                    />
                  ))}
                </GridCards>
              ) : (
                <Flex
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Image
                    src={notFound}
                    alt="not Found"
                    width={300}
                    height={200}
                  />
                  <Text fontWeight="semibold" color="gray.500">
                    Não encontramos esse tipo de produto
                  </Text>
                </Flex>
              )}
            </TabPanel>
            <TabPanel p="0">
              {filterProducts.length > 0 ? (
                <GridCards render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
                  {filterProducts.map((product: any) => (
                    <SimpleCard
                      key={product.id}
                      id={product.id}
                      discount={product.discount}
                      imgUrl={product.ImageUrl}
                      price={product.price}
                      title={product.title}
                      sizes={product.sizes}
                      variantColors={product.variants}
                      priceDefaultId={product.default_price?.id}
                    />
                  ))}
                </GridCards>
              ) : (
                <Flex
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Image
                    src={notFound}
                    alt="not Found"
                    width={300}
                    height={200}
                  />
                  <Text fontWeight="semibold" color="gray.500">
                    Não encontramos esse tipo de produto
                  </Text>
                </Flex>
              )}
            </TabPanel>
            <TabPanel p="0">
              {filterProducts.length > 0 ? (
                <GridCards render={{ '@initial': 'mobile', '@bp2': 'desktop' }}>
                  {filterProducts.map((product: any) => (
                    <SimpleCard
                      key={product.id}
                      id={product.id}
                      discount={product.discount}
                      imgUrl={product.ImageUrl}
                      price={product.price}
                      title={product.title}
                      sizes={product.sizes}
                      variantColors={product.variants}
                      priceDefaultId={product.default_price?.id}
                    />
                  ))}
                </GridCards>
              ) : (
                <Flex
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Image
                    src={notFound}
                    alt="not Found"
                    width={300}
                    height={200}
                  />
                  <Text fontWeight="semibold" color="gray.500">
                    Não encontramos esse tipo de produto
                  </Text>
                </Flex>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const products = await getProductsByCategory(`${params?.slug}`)

  return {
    props: {
      products,
    },
    revalidate: 5,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = [
    'beleza',
    'eletronicos',
    'utilidades',
    'acessorios',
    'saude',
    'moda',
  ]
  const paths = categories.map((post) => ({
    params: { slug: post },
  }))

  return { paths, fallback: true }
}
