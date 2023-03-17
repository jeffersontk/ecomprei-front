import { NextApiRequest, NextApiResponse } from 'next'
import { productController } from '../../../server/controllers/products'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await productController(req, res)
}
