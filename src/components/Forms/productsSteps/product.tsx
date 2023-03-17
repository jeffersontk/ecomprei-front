import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { categories, SubCategory } from "../../../utils/option"

interface props {
  closeModal: () => void
  nextTab: any
}

export default function ProductStep({ closeModal, nextTab }: props) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Flex gap="5" w="100%">
        <Stack w="6xl">
          <FormControl isInvalid={errors.title?.type === "required"}>
            <FormLabel>Nome do produto</FormLabel>
            <Input
              _focus={{
                borderColor: "#F5AE26",
                boxShadow: "0 0 0 1px #F5AE26",
              }}
              {...register("title", { required: true })}
            />
            {errors.title?.type === "required" && (
              <FormErrorMessage>Nome do produto é Obrigatório</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.price?.type === "required"}>
            <FormLabel>Preço do produto</FormLabel>
            <Input
              _focus={{
                borderColor: "#F5AE26",
                boxShadow: "0 0 0 1px #F5AE26",
              }}
              {...register("price", { required: true })}
            />
            {errors.price?.type === "required" && (
              <FormErrorMessage>
                Preço do produto é Obrigatório
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Desconto</FormLabel>
            <Input
              _focus={{
                borderColor: "#F5AE26",
                boxShadow: "0 0 0 1px #F5AE26",
              }}
              {...register("discount")}
            />
          </FormControl>
          <FormControl isInvalid={errors.category?.type === "required"}>
            <FormLabel>Categoria do produto</FormLabel>
            <Controller
              render={({ field: { ref, value, ...field } }) => (
                <Select {...field} ref={ref} value={String(value)}>
                  <option value="">Sem categoria</option>
                  {categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              )}
              control={control}
              name="category"
              rules={{ required: true }}
            />

            {errors.category?.type === "required" && (
              <FormErrorMessage>
                Categoria do produto é Obrigatório
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Subcategoria do produto</FormLabel>
            <Controller
              render={({ field: { ref, value, ...field } }) => (
                <Select {...field} ref={ref} value={String(value)}>
                  <option value="">Sem Subcategoria</option>
                  {SubCategory.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              )}
              control={control}
              name="subCategory"
            />
          </FormControl>
        </Stack>
        <Stack w="6xl">
          <FormControl isInvalid={errors.stripeProductId?.type === "required"}>
            <FormLabel>Stripe id</FormLabel>
            <Input
              _focus={{
                borderColor: "#F5AE26",
                boxShadow: "0 0 0 1px #F5AE26",
              }}
              {...register("stripeProductId", { required: true })}
            />
            {errors.stripeProductId?.type === "required" && (
              <FormErrorMessage>
                Id do produto na stripe é Obrigatório
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.shopUrl?.type === "required"}>
            <FormLabel>Link do fornecedor</FormLabel>
            <Input
              _focus={{
                borderColor: "#F5AE26",
                boxShadow: "0 0 0 1px #F5AE26",
              }}
              {...register("shopUrl", { required: true })}
            />
            {errors.shopUrl?.type === "required" && (
              <FormErrorMessage>
                link do fornecedor é obrigatório
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.ImageUrl?.type === "required"}>
            <FormLabel>Link da imagem principal</FormLabel>
            <Input
              _focus={{
                borderColor: "#F5AE26",
                boxShadow: "0 0 0 1px #F5AE26",
              }}
              {...register("ImageUrl", { required: true })}
            />
            {errors.ImageUrl?.type === "required" && (
              <FormErrorMessage>
                link da imagem principal é obrigatório
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Link da thumbnail</FormLabel>
            <Input
              _focus={{
                borderColor: "#F5AE26",
                boxShadow: "0 0 0 1px #F5AE26",
              }}
              {...register("thumbnailUrl")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Link do video</FormLabel>
            <Input
              _focus={{
                borderColor: "#F5AE26",
                boxShadow: "0 0 0 1px #F5AE26",
              }}
              {...register("videoUrl", { required: true })}
            />
          </FormControl>
        </Stack>
      </Flex>

      <Flex justifyContent="flex-end" mt="5">
        <Button mr={3} onClick={closeModal}>
          Cancelar
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
