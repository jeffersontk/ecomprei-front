import { Stack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import HeaderAdmin from '../../../components/molecules/HeaderAdmin/Index'
import { checkSession } from '../../../server/lib/auth'

export default function CustomerOrders() {
  return (
    <>
      <Head>
        <title>Pedido de clientes - Admin </title>
      </Head>

      <Stack p="10">
        <HeaderAdmin title="Pedidos de clientes" />
      </Stack>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.sessionId) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  const refreshSessionId = await checkSession(String(query.sessionId))

  if (!refreshSessionId) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
