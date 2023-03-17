import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { checkSession } from '../../../server/lib/auth'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Admin </title>
      </Head>
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
