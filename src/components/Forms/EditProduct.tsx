import axios from "axios"
import React, { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { ProductDto, ProductUpdate } from "../../utils/types/productsType"

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import ModalAdmin from "../molecules/ModalAdmin"
import CopyStep from "./productsSteps/copy"
import DetailsStep from "./productsSteps/details"
import ProductStep from "./productsSteps/product"
import { useRouter } from "next/router"

interface props {
  onClose: () => void
  product: ProductUpdate
  isOpen: boolean
}

export default function EditProduct({ onClose, isOpen, product }: props) {
  const copies = product.copies.length > 0 ? product.copies[0].paragraphs : []

  const methodsEdit = useForm<ProductUpdate>({
    defaultValues: {
      category: product.category,
      title: product.title,
      discount: product.discount,
      highlighted: product.highlighted,
      ImageUrl: product.ImageUrl,
      videoUrl: product.videoUrl,
      thumbnailUrl: product.thumbnailUrl,
      price: product.price,
      shopUrl: product.shopUrl,
      stripeProductId: product.stripeProductId,
      subCategory: product.subCategory,
      copies,
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: any) => {
    setTabIndex(index)
  }

  const onSubmit: SubmitHandler<ProductUpdate> = async (data) => {
    setIsLoading(true)
    const dataToPut = {
      id: product.id,
      price: +data.price,
      shipping: "Grátis",
      title: data.title,
      variants: data.variants.length > 0 ? data.variants : [],
      sizes: data.sizes?.length > 0 ? data.sizes : [],
      discount: +data.discount,
      category: data.category,
      ImageUrl: data.ImageUrl,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl,
      shopUrl: data.shopUrl,
      subCategory: data.subCategory,
      status: data.status,
      variantsImage: data.variantsImage.length > 0 ? data.variantsImage : [],
      highlighted: data.highlighted,
      stripeProductId: data.stripeProductId,
      copies: {
        paragraphs: data.copies,
        productId: product.id,
      },
    }

    await axios
      .put("/api/products", dataToPut)
      .then((response) => {
        methodsEdit.reset()
        setTabIndex(0)
        refreshData()
        onClose()
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <ModalAdmin
      isOpen={isOpen}
      onClose={onClose}
      titleHeader="Editar Produto"
      sizeModal="750px"
    >
      <FormProvider {...methodsEdit}>
        <Box as="form" w="100%" onSubmit={methodsEdit.handleSubmit(onSubmit)}>
          <Tabs
            variant="unstyled"
            w="100%"
            index={tabIndex}
            onChange={handleTabsChange}
          >
            <TabList>
              <Tab
                _selected={{
                  color: "white",
                  bg: "#FEA800",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
                isDisabled={tabIndex !== 0}
              >
                Produto
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "#FEA800",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
                isDisabled={tabIndex !== 1}
              >
                Detalhes
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "#FEA800",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
                isDisabled={tabIndex !== 2}
              >
                Copy
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="0" w="100%">
                <ProductStep
                  closeModal={() => {
                    methodsEdit.reset()
                    onClose()
                  }}
                  nextTab={() => setTabIndex(1)}
                />
              </TabPanel>
              <TabPanel>
                <DetailsStep
                  nextTab={() => setTabIndex(2)}
                  backTab={() => setTabIndex(0)}
                  defaultColor={product.variants}
                  defaultSize={product.sizes}
                  defaultImageList={product.variantsImage}
                />
              </TabPanel>
              <TabPanel>
                <CopyStep
                  backTab={() => setTabIndex(1)}
                  isLoading={isLoading}
                  defaultCopies={copies}
                  cancel={() => {
                    methodsEdit.reset()
                    setTabIndex(0)
                    onClose()
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </FormProvider>
    </ModalAdmin>
  )
}
