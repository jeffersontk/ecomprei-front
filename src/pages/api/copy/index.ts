import { NextApiRequest, NextApiResponse } from 'next'
import { CopyController } from './../../../server/controllers/copy'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await CopyController(req, res)
}
