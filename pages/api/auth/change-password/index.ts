import { getToken } from "next-auth/jwt";
import bcrypt from "bcryptjs";

import type { NextApiRequest, NextApiResponse } from "next";

import changePasswordValidator from "validators/profile/changePasswordValidator";
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

  if (req.method === "PUT") {
    try {
      const userId = token?.user?._id;

      if (!userId) {
        return res.status(422).json({
          title: "Profile",
          message: "Sorry, profile not found",
        });
      }

      const validated = changePasswordValidator(req, res);

      const user = await User.findById(userId);

      const isMatch = await bcrypt.compare(
        validated?.currentPassword,
        user?.password
      );

      if (!isMatch) {
        return res.status(422).json({
          title: "Change password",
          message: "Sorry, incorrect password",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(validated.newPassword, salt);

      await User.findByIdAndUpdate(userId, {
        password: newPasswordHash,
      });

      res.status(200).json({
        title: "Change Password",
        message: "Password changed successfully",
      });
    } catch (error) {
      res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }
}
