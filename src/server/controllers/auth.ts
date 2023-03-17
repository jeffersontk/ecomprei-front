import { NextApiRequest, NextApiResponse } from "next"
import { authenticateUser, checkSession } from "../lib/auth"
import bodyParser from "body-parser"

// Use o middleware body-parser para analisar o corpo das solicitações
const jsonParser = bodyParser.json()

interface CustomApiResponse extends NextApiResponse {
  cookies?: string[]
}

export const AuthController = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { method } = req

  switch (method) {
    case "POST":
      handlePost(req, res)
      break
    case "PUT":
      handlePut(req, res)
      break
    default:
      res.status(404).end()
  }
}

async function handlePost(req: NextApiRequest, res: CustomApiResponse) {
  jsonParser(req, res, async () => {
    const { username, password, sessionIdByBody } = req.body

    if (sessionIdByBody) {
      const refreshSessionId = await checkSession(sessionIdByBody)

      res.cookies = res.cookies || [] // defina um valor padrão para cookies
      res.cookies.push(`sessionId=${refreshSessionId}; HttpOnly`)
      res.setHeader("Set-Cookie", res.cookies)

      if (refreshSessionId) {
        res.status(200).json({ refreshSessionId })
      } else {
        res.status(401).end()
      }
      res.status(200).json({ success: true })
    }

    const sessionId = await authenticateUser({ username, password })

    res.cookies = res.cookies || [] // defina um valor padrão para cookies
    res.cookies.push(`sessionId=${sessionId}; HttpOnly`)
    res.setHeader("Set-Cookie", res.cookies)

    if (sessionId) {
      res.status(200).json({ sessionId })
    } else {
      res.status(401).end()
    }
    res.status(200).json({ success: true })
  })
}

async function handlePut(req: NextApiRequest, res: CustomApiResponse) {
  const { sessionId } = req.body
  const newSessionId = await checkSession(sessionId)

  res.cookies = res.cookies || [] // defina um valor padrão para cookies
  res.cookies.push(`sessionId=${newSessionId}; HttpOnly`)
  res.setHeader("Set-Cookie", res.cookies)
  if (newSessionId) {
    res.status(200).json({ sessionId: newSessionId })
  } else {
    res.status(401).end()
  }
}
