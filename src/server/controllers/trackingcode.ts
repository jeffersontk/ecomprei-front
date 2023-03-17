import { NextApiRequest, NextApiResponse } from 'next'
import {
  buildEmailConfig,
  ContactData,
  sendEmail,
  validateData,
} from '../lib/trackingCode'

export const TrackingCodeController = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { name, email, code } = req.body
        const data: ContactData = { name, email, code }
        validateData(data)
        const configEmail = buildEmailConfig(data)
        await sendEmail(configEmail)
        return res.status(200).json({ message: 'E-mail enviado com sucesso!' })
      } catch (error: any) {
        return res
          .status(500)
          .json({ error: error.message || error.toString() })
      }
    default:
      return res.status(404).json({ message: 'Route not found.' })
  }
}
