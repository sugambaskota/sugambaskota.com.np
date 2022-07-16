import { getToken } from "next-auth/jwt";
import slugify from "slugify";

import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/dbConnect";
import Blog from "models/Blog";
import blogUpsertValidator from "validators/blog/blogUpsert";

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

      const blogs = await Blog.find({})
        .skip((+page - 1) * +limit)
        .limit(+limit);
      const total = await Blog.countDocuments();

      return res.status(200).json({
        title: "Blog",
        message: "Blogs got successfully",
        data: {
          pagination: {
            page,
            limit,
            total,
          },
          data: blogs,
        },
      });
    } catch (error) {
      return res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const validated = blogUpsertValidator(req, res);

      const slug = slugify(validated.title, {
        lower: true,
      });

      const count = await Blog.count({
        slug: {
          $regex: slug,
          $options: "i",
        },
      });

      const blog = new Blog({
        ...validated,
        slug: count > 0 ? slug + "-" + count : slug,
        user: token?.user?._id,
      });

      const newBlog = await blog.save();

      return res.status(201).json({
        title: "Blog",
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (error) {
      return res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }
}
