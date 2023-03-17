import { Stack, useDisclosure } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import HeaderAdmin from "../../../components/molecules/HeaderAdmin/Index"
import ModalAdmin from "../../../components/molecules/ModalAdmin"
import { checkSession } from "../../../server/lib/auth"

export default function MyTeam() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Head>
        <title>Meu time - Admin </title>
      </Head>
      <Stack p="10">
        <HeaderAdmin
          title="Meu time"
          buttonTitle="Pedido"
          buttonIcon={<AiFillPlusCircle size="24" />}
          onClick={() => onOpen()}
        />
      </Stack>

      <ModalAdmin
        isOpen={isOpen}
        onClose={onClose}
        titleHeader="Adicionar membro ao Time"
      >
        <div />
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
