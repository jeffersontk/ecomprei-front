import { NextApiResponse, NextApiRequest } from 'next';
import { createCheckoutSession, createCoupon } from '../../../server/lib/checkout';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const {line_item, discount, productId, listItemByCart, totalDiscountInPercentage} = req.body;
  
  if(line_item && discount) {
    try {
      const successURL = `${process.env.NEXT_URL}/success`;
      const cancelURL = `${process.env.NEXT_URL}/checkout/${productId}`;
  
      const coupon = await createCoupon(+discount);
  
      const checkoutSession = await createCheckoutSession({
        mode: 'payment',
        success_url: successURL,
        cancel_url: cancelURL,
        line_items: [ line_item ],
        discounts: [{ coupon: coupon.id }]
      })

      return res.status(201).json({
        checkoutUrl: checkoutSession.url
      });
     } catch (error) {
      console.error(error);
     }
  }else if (listItemByCart && totalDiscountInPercentage) {
    try {
      const successURL = `${process.env.NEXT_URL}/success`;
      const cancelURL = `${process.env.NEXT_URL}/cart`;
  
      const coupon = await createCoupon(+totalDiscountInPercentage);
  
      const checkoutSession = await createCheckoutSession({
        mode: 'payment',
        success_url: successURL,
        cancel_url: cancelURL,
        line_items: listItemByCart,
        discounts: [{ coupon: coupon.id }]
      })
      return res.status(201).json({
        checkoutUrl: checkoutSession.url
      });
    } catch (error) {
      console.error(error);
    }
  }else {
    return res.status(400).json({error: 'Missing required parameters'})
  }
}
