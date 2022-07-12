import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const validation = Joi.object()
    .keys({
      name: Joi.string().required().label("name"),
      email: Joi.string().required().label("email"),
      address: Joi.string().required().label("address"),
      contactNumber: Joi.string().required().label("contactNumber"),
      message: Joi.string().required().label("message"),
    })
    .validate(req.body);

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
