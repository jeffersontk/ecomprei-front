import { NextApiRequest, NextApiResponse } from 'next'
import { AuthController } from '../../../server/controllers/auth'
import middleware from '../../../server/lib/middleware/cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await AuthController(req, res)
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
    // Adiciona o middleware para ler e escrever cookies
    // antes de executar o handler
    // https://nextjs.org/docs/api-routes/api-middlewares#syntax-for-api-middlewares
    // https://nextjs.org/docs/api-routes/api-middlewares#using-middleware
    // https://nextjs.org/docs/api-routes/api-middlewares#middleware-order
    // https://nextjs.org/docs/basic-features/middleware#custom-server-middleware
    // https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#http-in-action
    middleware: [middleware],
  },
}
