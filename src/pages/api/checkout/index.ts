import { NextApiResponse, NextApiRequest } from 'next';
import { stripe } from '../../../server/lib/stripe';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const priceId = ''

  const successURL = `${process.env.Next_URL}/success`
  const cancelURL = `${process.env.Next_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: successURL,
    cancel_url: cancelURL,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ]
  })
}