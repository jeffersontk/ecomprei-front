import { NextApiRequest, NextApiResponse } from "next";
import { getProducts, postProducts } from "../lib/products";

export const productController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      const products = await getProducts()
    
      return res.status(200).json({
        data: products
      })
    case 'POST':
      const product = await postProducts(req.body)
      return res.status(201).json({
        data: product
      })
    default:
      return res.status(404).json({message: 'Route not found.'})
  }
}