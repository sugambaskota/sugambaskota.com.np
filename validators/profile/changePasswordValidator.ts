import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const validation = Joi.object()
    .keys({
      currentPassword: Joi.string().required().label("currentPassword"),
      newPassword: Joi.string().required().label("newPassword"),
    })
    .validate(req.body, {
      stripUnknown: true,
    });

  if (validation.error) {
    return res.status(422).json({
      title: "Validation failed",
      message: validation.error.details
        .map((error) => error.message)
        .join("\n"),
    });
  }

  return validation.value;
}
