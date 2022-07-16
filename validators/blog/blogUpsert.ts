import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const validation = Joi.object()
    .keys({
      title: Joi.string().required().label("title"),
      image: Joi.string().required().label("image"),
      status: Joi.boolean().required().label("status"),
      tags: Joi.array().items(Joi.string()).required().label("tags"),
      shortDescription: Joi.string().required().label("shortDescription"),
      description: Joi.string().required().label("description"),
      seoTitle: Joi.string().required().label("seoTitle"),
      seoDescription: Joi.string().required().label("seoDescription"),
      metaRobots: Joi.string().required().label("metaRobots"),
      canonical: Joi.string().required().label("canonical"),
    })
    .validate(req.body, { stripUnknown: true });

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
