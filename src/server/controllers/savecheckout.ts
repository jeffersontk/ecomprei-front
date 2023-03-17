import { NextApiRequest, NextApiResponse } from 'next'
import { postSaveCheckout } from '../lib/checkout'

export const SaveCheckoutController = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const {
          clientEmail,
          clientName,
          clientPhone,
          clientAddress,
          productComplement,
          status,
          stripeCheckoutSessionId,
          productsInCheckout,
        } = req.body
        const response = await postSaveCheckout({
          clientEmail,
          clientName,
          clientPhone,
          clientAddress,
          productComplement,
          status,
          stripeCheckoutSessionId,
          productsInCheckout,
        })

        return res.status(200).json({
          data: response,
        })
      } catch (error) {
        console.error(error)
      }
      break
    default:
      return res.status(404).json({ message: 'Route not found.' })
  }
}
