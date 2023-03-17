import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

interface CustomApiResponse extends NextApiResponse {
  cookies: string[]
}

export default function middleware(
  handler: (req: NextApiRequest, res: CustomApiResponse) => Promise<void>,
) {
  return async (req: NextApiRequest, res: CustomApiResponse) => {
    // Lê os cookies da requisição
    const cookies = cookie.parse(req.headers.cookie || '')

    // Adiciona os cookies no objeto req e res
    req.cookies = cookies
    res.cookies = []

    // Chama o próximo middleware ou o handler
    return handler(req, res)
  }
}
