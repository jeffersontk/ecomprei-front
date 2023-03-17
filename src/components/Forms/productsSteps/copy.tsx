import { Button, Flex } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import TextareaWithList from "../../molecules/TextareaWithList"

type copiesType = {
  copyProductId: string
  id: string
  message: string
}

interface props {
  backTab: any
  isLoading: boolean
  defaultCopies?: copiesType[]
  cancel: any
}

export default function CopyStep({
  backTab,
  isLoading,
  defaultCopies,
  cancel,
}: props) {
  const { setValue } = useFormContext()
  const [copyList, setCopyList] = useState<copiesType[]>(defaultCopies ?? [])

  useEffect(() => {
    if (copyList.length > 0) {
      setValue("copies", copyList)
    } else {
      setValue("copies", [])
    }
  }, [setValue, copyList])

  return (
    <>
      <Flex w="100%">
        <TextareaWithList
          label="Tamanhos"
          itemList={copyList}
          itemValue="message"
          setItemList={setCopyList}
        />
      </Flex>

      <Flex justifyContent="space-between" mt="5">
        <Button onClick={backTab}>Voltar</Button>
        <Flex>
          <Button mr={3} onClick={cancel} colorScheme="red">
            Cancelar
          </Button>
          <Button
            bgGradient="linear(to-r, #FEA800, #F07301)"
            color="white"
            width="40"
            _hover={{
              opacity: "0.85",
            }}
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
