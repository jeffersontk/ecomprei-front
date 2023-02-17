import { NextApiRequest, NextApiResponse } from "next";
import { SaveCheckoutController } from "../../../server/controllers/savecheckout";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  await SaveCheckoutController(req, res)
}