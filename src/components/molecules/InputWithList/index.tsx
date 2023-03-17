import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { BsPlus } from "react-icons/bs"
import { spreadFunction } from "../../../utils/spread"

interface props {
  label: string
  itemList: Array<any>
  itemValue: string
  setItemList: React.Dispatch<React.SetStateAction<any[] | []>>
  gridColumns?: number
}

export default function InputWithList({
  label,
  itemList,
  itemValue,
  setItemList,
  gridColumns = 4,
}: props) {
  const [item, setItem] = useState("")
  return (
    <div className="contentArraysItems">
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Flex>
          <Input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            _focus={{
              borderColor: "#F5AE26",
              boxShadow: "0 0 0 1px #F5AE26",
            }}
          />
          <IconButton
            bg="#F5AE26"
            aria-label="add"
            onClick={() => {
              spreadFunction(setItemList, itemValue, item)
              setItem("")
            }}
            icon={<BsPlus color="#fff" size="26" />}
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
          />
        </Flex>
      </FormControl>

      <Box
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        p="2"
        mt="2"
        height="100px"
        overflowY="auto"
      >
        <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={2}>
          {itemList.length > 0 &&
            itemList.map((item, index) => (
              <Tag
                key={`${item[itemValue]}${index}`}
                size="sm"
                borderRadius="full"
                variant="solid"
                bg="#F5AE26"
                justifyContent="space-between"
              >
                <TagLabel>{item[itemValue]}</TagLabel>
                <TagCloseButton
                  onClick={() => {
                    const remove = itemList.filter(
                      (i) => i[itemValue] !== item[itemValue],
                    )
                    setItemList(remove)
                  }}
                />
              </Tag>
            ))}
        </Grid>
      </Box>
    </div>
  )
}
