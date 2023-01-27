import { getCopyByProductId, postCopyProduct } from './../lib/copy';
import { NextApiRequest, NextApiResponse } from 'next';

export const CopyController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      const products = await getCopyByProductId(req.body)
    
      return res.status(200).json({
        data: products
      })
    case 'POST':
      const product = await postCopyProduct(req.body)
      return res.status(201).json({
        data: product
      })
    default:
      return res.status(404).json({message: 'Route not found.'})
  }
}