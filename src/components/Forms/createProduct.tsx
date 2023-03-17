import axios from "axios"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { ProductDto } from "../../utils/types/productsType"

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import ModalAdmin from "../molecules/ModalAdmin"
import CopyStep from "./productsSteps/copy"
import DetailsStep from "./productsSteps/details"
import ProductStep from "./productsSteps/product"
import { useRouter } from "next/router"

interface props {
  onClose: () => void
  isOpen: boolean
}

export default function CreateProduct({ onClose, isOpen }: props) {
  const methods = useForm<ProductDto>()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: any) => {
    setTabIndex(index)
  }
  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const dataToPost: ProductDto = {
      price: +data.price,
      shipping: "Grátis",
      title: data.title,
      variants: data.variants,
      sizes: data.sizes,
      discount: +data.discount,
      category: data.category,
      ImageUrl: data.ImageUrl,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl,
      shopUrl: data.shopUrl,
      subCategory: data.subCategory,
      status: data.status,
      variantsImage: data.variantsImage,
      highlighted: data.highlighted,
      stripeProductId: data.stripeProductId,
      copies: {
        paragraphs: data.copies,
      },
    }
    await axios
      .post("/api/products", dataToPost)
      .then((response) => {
        methods.reset()
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
      <FormProvider {...methods}>
        <Box as="form" w="100%" onSubmit={methods.handleSubmit(onSubmit)}>
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
                    methods.reset()
                    onClose()
                  }}
                  nextTab={() => setTabIndex(1)}
                />
              </TabPanel>
              <TabPanel>
                <DetailsStep
                  nextTab={() => setTabIndex(2)}
                  backTab={() => setTabIndex(0)}
                />
              </TabPanel>
              <TabPanel>
                <CopyStep
                  backTab={() => setTabIndex(1)}
                  isLoading={isLoading}
                  cancel={() => {
                    methods.reset()
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
