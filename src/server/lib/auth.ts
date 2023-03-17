import { v4 as uuidv4 } from 'uuid'
import { prisma } from '../../../prisma/client'

interface UserInput {
  username: string
  password: string
}

/* interface User extends UserInput {
  id: number
  permission: 'admin' | 'seller'
  name: string
  email: string
  sessionId: string | null
  sessionExpiration: Date | null
} */

export const authenticateUser = async (
  userData: UserInput,
): Promise<string | null> => {
  const { username, password } = userData

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user || user.password !== password) {
    return null
  }

  const sessionId = uuidv4()
  const sessionExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000) // Sessão expira em 24 horas

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      sessionId,
      sessionExpiration,
    },
  })

  return sessionId
}

export const checkAuthorization = async (
  sessionId: string,
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      sessionId,
      sessionExpiration: {
        gte: new Date(),
      },
    },
  })

  return Boolean(user)
}

export const checkSession = async (
  sessionId: string,
): Promise<boolean | null> => {
  const user = await prisma.user.findFirst({
    where: {
      sessionId,
      sessionExpiration: {
        gt: new Date(),
      },
    },
  })

  if (!user) {
    return null
  }

  return true
}
