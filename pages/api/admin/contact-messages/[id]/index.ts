import { getToken } from "next-auth/jwt";

import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/dbConnect";
import ContactMessage from "models/ContactMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: any = await getToken({ req });

  if (!token) {
    return res.status(401).json({
      title: "Sorry",
      message: "Not authenticated",
    });
  }

  if (token?.user?.role !== "admin") {
    return res.status(403).json({
      title: "Sorry",
      message: "Not authorized",
    });
  }

  await dbConnect();

  if (req.method === "DELETE") {
    try {
      await ContactMessage.findByIdAndDelete(req.query.id);

      res.status(200).json({
        title: "Contact Message",
        message: "Contact message deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }
}
