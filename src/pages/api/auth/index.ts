import { NextApiRequest, NextApiResponse } from "next";
import { AuthController } from "../../../server/controllers/auth";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  await AuthController(req, res)
}