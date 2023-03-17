import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { BsPlus } from "react-icons/bs"
import { spreadFunction } from "../../../utils/spread"

interface props {
  label: string
  itemList: Array<any>
  itemValue: string
  setItemList: React.Dispatch<React.SetStateAction<any[] | []>>
}

export default function TextareaWithList({
  label,
  itemList,
  itemValue,
  setItemList,
}: props) {
  const [item, setItem] = useState("")

  return (
    <Stack w="100%">
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Flex>
          <Textarea
            value={item}
            onChange={(e) => setItem(e.target.value)}
            _focus={{
              borderColor: "#F5AE26",
              boxShadow: "0 0 0 1px #F5AE26",
            }}
            w="100%"
          />
        </Flex>
      </FormControl>
      <Flex justifyContent="flex-end">
        <Button
          bg="#F5AE26"
          aria-label="add"
          onClick={() => {
            spreadFunction(setItemList, itemValue, item)
            setItem("")
          }}
          color="white"
        >
          Adicionar paragrafo
        </Button>
      </Flex>
      <Box mt="4" height="200px" overflowY="auto" pr="2">
        <Grid templateColumns="1fr" gap={2}>
          {itemList.length > 0 &&
            itemList.map((item, index) => (
              <Box
                key={`${item[itemValue]}${index}`}
                justifyContent="space-between"
                position="relative"
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
                p="2"
              >
                <Text>{item[itemValue]}</Text>
                <Button
                  position="absolute"
                  top="2"
                  right="2"
                  borderRadius="full"
                  bg="gray"
                  opacity={0.5}
                  color="white"
                  h="20px"
                  w="20px"
                  onClick={() => {
                    const remove = itemList.filter(
                      (i) => i[itemValue] !== item[itemValue],
                    )
                    setItemList(remove)
                  }}
                >
                  X
                </Button>
                {/*    <TagCloseButton
                  onClick={() => {
                    const remove = itemList.filter(
                      (i) => i[itemValue] !== item[itemValue],
                    )
                    setItemList(remove)
                  }}
                /> */}
              </Box>
            ))}
        </Grid>
      </Box>
    </Stack>
  )
}
