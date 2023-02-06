import { NextApiResponse, NextApiRequest } from 'next';
import { stripe } from '../../../server/lib/stripe';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const {line_item, discount, productId, listItemByCart, totalDiscountInPercentage} = req.body

  
  if(line_item && discount) {
    const successURL = `${process.env.NEXT_URL}/success`
    const cancelURL = `${process.env.NEXT_URL}/checkout/${productId}`
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: successURL,
      cancel_url: cancelURL,
      line_items:  [
        line_item
      ],  
      discounts: [{
        coupon: discount.coupon
      }]
    })
    return res.status(201).json({
      checkoutUrl: checkoutSession.url
    })
  }else {     
    const successURL = `${process.env.NEXT_URL}/success`
    const cancelURL = `${process.env.NEXT_URL}/cart`

    const coupon = await stripe.coupons.create({
      percent_off: +totalDiscountInPercentage.toFixed(2),
      name: `OFF${totalDiscountInPercentage.toFixed(2)}`
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: successURL,
      cancel_url: cancelURL,
      line_items:  listItemByCart,
      discounts: [{
        coupon: coupon.id
      }]
    })
    return res.status(201).json({
      checkoutUrl: checkoutSession.url
    })
  }

}