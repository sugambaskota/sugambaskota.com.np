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

  if (req.method === "GET") {
    try {
      const page = req?.query?.page || 1;
      const limit = req?.query?.limit || 10;

      const contactMessages = await ContactMessage.find({})
        .skip((+page - 1) * +limit)
        .limit(+limit);
      const total = await ContactMessage.countDocuments();

      return res.status(200).json({
        title: "Contact Messages",
        message: "Contact messages got successfully",
        data: {
          pagination: {
            page,
            limit,
            total,
          },
          data: contactMessages,
        },
      });
    } catch (error) {
      return res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }
}
