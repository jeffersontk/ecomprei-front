import { NextApiResponse, NextApiRequest } from 'next';
import { stripe } from '../../../server/lib/stripe';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const {line_item, discount, productId, listItemByCart, totalDiscountInPercentage} = req.body
  console.log('check line_item', line_item)
  console.log('check discount', discount)
  console.log('check productId', productId)
  console.log('check listItemByCart', listItemByCart)
  console.log('check totalDiscountInPercentage', totalDiscountInPercentage)
  
  if(line_item && discount) {
   try {
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
   } catch (error) {
    console.error(error)
   }
  }else if (listItemByCart && totalDiscountInPercentage) {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }

}