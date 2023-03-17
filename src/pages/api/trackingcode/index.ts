import { NextApiRequest, NextApiResponse } from 'next'
import { TrackingCodeController } from '../../../server/controllers/trackingcode'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return TrackingCodeController(req, res)
}
