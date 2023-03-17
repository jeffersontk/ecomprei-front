import { NextApiRequest, NextApiResponse } from "next"
import {
  deleteProduct,
  getProducts,
  postProducts,
  putProduct,
} from "../lib/products"

export const productController = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { method } = req
  let products
  let product
  let productUpdate
  let delProduct

  switch (method) {
    case "GET":
      products = await getProducts()

      return res.status(200).json({
        data: products,
      })
    case "POST":
      product = await postProducts(req.body)
      return res.status(201).json({
        data: product,
      })
    case "PUT":
      productUpdate = await putProduct(req.body)
      return res.status(201).json({
        data: productUpdate,
      })
    case "DELETE":
      if (req.query.id) {
        delProduct = await deleteProduct(String(req.query.id))

        return res.status(201).json({
          data: delProduct,
        })
      }
      break
    default:
      return res.status(404).json({ message: "Route not found." })
  }
}
