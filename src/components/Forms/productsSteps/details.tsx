import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Switch,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import {
  ColorListType,
  ImageListType,
  SizeListType,
} from "../../../pages/admin"
import InputWithList from "../../molecules/InputWithList"

interface props {
  nextTab: any
  backTab: any
  defaultSize?: SizeListType[]
  defaultColor?: ColorListType[]
  defaultImageList?: ImageListType[]
}

export default function DetailsStep({
  nextTab,
  backTab,
  defaultSize,
  defaultColor,
  defaultImageList,
}: props) {
  const { setValue, register } = useFormContext()

  const [sizeList, setSizeList] = useState<SizeListType[]>(defaultSize || [])
  const [colorList, setColorList] = useState<ColorListType[]>(
    defaultColor || [],
  )
  const [linksImageList, setLinksImageList] = useState<ImageListType[]>(
    defaultImageList || [],
  )

  useEffect(() => {
    if (sizeList.length > 0) {
      setValue("sizes", sizeList)
    } else {
      setValue("sizes", [])
    }
    if (colorList.length > 0) {
      setValue("variants", colorList)
    } else {
      setValue("variants", [])
    }
    if (linksImageList.length > 0) {
      setValue("variantsImage", linksImageList)
    } else {
      setValue("variantsImage", [])
    }
  }, [setValue, sizeList, colorList, linksImageList])

  return (
    <>
      <Flex gap="5" w="100%">
        <Stack w="6xl">
          <InputWithList
            label="Tamanhos"
            itemList={sizeList}
            itemValue="size"
            setItemList={setSizeList}
            gridColumns={3}
          />
          <InputWithList
            label="Cor variante"
            itemList={colorList}
            itemValue="variant"
            setItemList={setColorList}
            gridColumns={3}
          />
        </Stack>
        <Stack w="6xl">
          <InputWithList
            label="Links de imagens"
            itemList={linksImageList}
            itemValue="url"
            setItemList={setLinksImageList}
            gridColumns={1}
          />
          <Flex>
            <FormControl display="flex" flexDirection="column">
              <FormLabel htmlFor="highlight">Destaque</FormLabel>
              <Switch
                id="highlight"
                size="lg"
                colorScheme="orange"
                {...register("highlighted")}
              />
            </FormControl>
            <FormControl display="flex" flexDirection="column">
              <FormLabel htmlFor="status">Disponível</FormLabel>
              <Switch
                id="status"
                size="lg"
                colorScheme="orange"
                checked
                {...register("status")}
              />
            </FormControl>
          </Flex>
        </Stack>
      </Flex>

      <Flex justifyContent="flex-end" mt="5">
        <Button mr={3} onClick={backTab}>
          Voltar
        </Button>
        <Button
          bgGradient="linear(to-r, #FEA800, #F07301)"
          color="white"
          width="40"
          _hover={{
            opacity: "0.85",
          }}
          onClick={nextTab}
        >
          Proximo
        </Button>
      </Flex>
    </>
  )
}
