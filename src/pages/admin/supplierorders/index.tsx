import { Stack, useDisclosure } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import HeaderAdmin from "../../../components/molecules/HeaderAdmin/Index"
import ModalAdmin from "../../../components/molecules/ModalAdmin"
import { checkSession } from "../../../server/lib/auth"

export default function SupplierOrders() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Head>
        <title>Pedidos no fornecedor - Admin </title>
      </Head>
      <Stack p="10">
        <HeaderAdmin
          title="Pedidos no fornecedor"
          buttonTitle="Pedido"
          buttonIcon={<AiFillPlusCircle size="24" />}
          onClick={() => onOpen()}
        />
      </Stack>

      <ModalAdmin
        isOpen={isOpen}
        onClose={onClose}
        titleHeader="Adicionar pedido no fornecedor"
      >
        <div></div>
      </ModalAdmin>
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

  return {
    props: {},
  }
}
