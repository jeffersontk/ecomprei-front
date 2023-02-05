import { NextApiRequest, NextApiResponse } from 'next';
import { CheckAuthorization } from '../lib/auth';

export const AuthController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      const authorization = await CheckAuthorization(req.body)
      return res.status(201).json({
        data: authorization
      })
    default:
      return res.status(404).json({message: 'Route not found.'})
  }
}