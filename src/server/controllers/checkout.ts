import { getCheckout, postCheckout, postCheckoutByCart } from './../lib/checkout';
import { NextApiRequest, NextApiResponse } from "next"

export const CheckoutController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      const {line_item, discount, productId, listItemByCart, totalDiscountInPercentage, metadata} = req.body;
      if(line_item) {
        const checkoutSession = await postCheckout({
          line_item, 
          discount,
          productId, 
          metadata
        }).then(async (resp)=> {
          console.log('resp', resp)
        })
        return res.status(201).json(checkoutSession);
      }else if (listItemByCart && totalDiscountInPercentage) {
        const checkoutSession = await postCheckoutByCart({
          totalDiscountInPercentage, 
          listItemByCart, 
          metadata
        })
        return res.status(201).json(checkoutSession);
      }else {
        return res.status(400).json({error: 'Missing required parameters'})
      }
    case 'GET':
      const checkoutList = await getCheckout()
    
      return res.status(200).json({
        data: checkoutList
      })
    default:
      return res.status(404).json({message: 'Route not found.'})
  }
}