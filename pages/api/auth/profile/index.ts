import { getToken } from "next-auth/jwt";

import type { NextApiRequest, NextApiResponse } from "next";

import profileUpdateValidator from "validators/profile/profileUpdateValidator";
import dbConnect from "lib/dbConnect";
import User from "models/User";

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

  await dbConnect();

  if (req.method === "GET") {
    try {
      const userId = token?.user?._id;

      if (!userId) {
        return res.status(422).json({
          title: "Profile",
          message: "Sorry, profile not found",
        });
      }

      const user = await User.findById(userId);

      res.status(200).json({
        title: "Profile",
        message: "Profile got successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const userId = token?.user?._id;

      if (!userId) {
        return res.status(422).json({
          title: "Profile",
          message: "Sorry, profile not found",
        });
      }

      const validated = profileUpdateValidator(req, res);

      const updatedUser = await User.findByIdAndUpdate(userId, validated);

      res.status(200).json({
        title: "Profile",
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }
}
