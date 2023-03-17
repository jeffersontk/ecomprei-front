import { useForm } from 'react-hook-form'
import { useState } from 'react'
import cookieParser from 'cookie-parser'
import { GetServerSideProps } from 'next'
import { checkAuthorization } from '../../server/lib/auth'
import axios from 'axios'
import { AuthContainer } from '../../styles/pages/admin'
import Image from 'next/image'
import authBanner from '../../assets/auth-banner.webp'
import { Button, Input, useToast } from '@chakra-ui/react'
import Head from 'next/head'

type LoginFormInputs = {
  username: string
  password: string
}

type LoginPageProps = {
  isLoggedIn: boolean
}

export default function Auth({ isLoggedIn }: LoginPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  async function onSubmit(data: LoginFormInputs) {
    setIsLoading(true)
    try {
      const { username, password } = data
      const dataPost = {
        username,
        password,
      }
      const session = await axios.post('/api/auth', dataPost)

      // Se a autenticação falhar, exibe uma mensagem de erro
      if (!session) {
        setError('Usuário ou senha incorretos')
        toast({
          title: '',
          description: 'Usuário ou senha incorretos',
          status: 'error',
          duration: 2000,
        })
        return
      }

      window.location.href = `/admin/dashboard?sessionId=${session.data.sessionId}`
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Login - É comprei</title>
      </Head>
      <AuthContainer>
        <div className="image-container">
          <Image src={authBanner} alt="" />
        </div>
        <div className="form-container">
          <h1>Ben-vindo a É Comprei loja de Dropshipping</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>
                Username:
                <Input
                  type="text"
                  {...register('username', { required: true })}
                />
              </label>
              {errors.username && (
                <p className="error">Username é obrigatório</p>
              )}
            </div>
            <div>
              <label>
                Password:
                <Input
                  type="password"
                  {...register('password', { required: true })}
                />
              </label>
              {errors.password && (
                <p className="error">Password é obrigatório</p>
              )}
            </div>
            <Button type="submit" isDisabled={isLoading} isLoading={isLoading}>
              Entrar
            </Button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </AuthContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const sessionId = req.cookies.sessionId
  const authorization = await checkAuthorization(String(sessionId))

  if (authorization) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      isLogged: authorization,
    },
  }
}

// Usa o middleware cookie-parser para fazer o parse dos cookies
export const config = {
  // Use "server" para indicar que este código deve ser executado no servidor
  // em vez de ser enviado para o navegador
  // https://nextjs.org/docs/api-reference/next.config.js/custom-server-options#using-a-custom-server
  // https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration#serverruntimeconfig
  serverRuntimeConfig: {
    middleware: [cookieParser()],
  },
}
