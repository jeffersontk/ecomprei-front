import {
  getCheckout,
  postCheckout,
  postCheckoutByCart,
} from "./../lib/checkout"
import { NextApiRequest, NextApiResponse } from "next"

export const CheckoutController = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { method } = req
  let checkoutSession, checkoutList
  const {
    lineItem,
    discount,
    productId,
    listItemByCart,
    totalDiscountInPercentage,
    metadata,
  } = req.body

  switch (method) {
    case "POST":
      if (lineItem) {
        checkoutSession = await postCheckout({
          lineItem,
          discount,
          productId,
          metadata,
        }).then(async (resp) => {})
        return res.status(201).json(checkoutSession)
      } else if (listItemByCart && totalDiscountInPercentage) {
        const checkoutSession = await postCheckoutByCart({
          totalDiscountInPercentage,
          listItemByCart,
          metadata,
        })
        return res.status(201).json(checkoutSession)
      } else {
        return res.status(400).json({ error: "Missing required parameters" })
      }
    case "GET":
      checkoutList = await getCheckout()

      return res.status(200).json({
        data: checkoutList,
      })
    default:
      return res.status(404).json({ message: "Route not found." })
  }
}
