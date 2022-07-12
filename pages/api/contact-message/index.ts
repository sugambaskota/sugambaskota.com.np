import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/dbConnect";
import ContactMessage from "models/ContactMessage";
import contactMessageUpsertValidation from "validators/contactMessage/contactMessageUpsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const validated = contactMessageUpsertValidation(req, res);

      await dbConnect();

      const contactMessage = new ContactMessage(validated);

      const newContactMessage = await contactMessage.save();

      return res.status(201).json({
        title: "",
        message: "Your message is received. Thank you!",
        data: newContactMessage,
      });
    } catch (error) {
      return res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }
}
