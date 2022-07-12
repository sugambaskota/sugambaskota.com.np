import { getToken } from "next-auth/jwt";

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
      const blog = await Blog.findById(req.query.id);

      res.status(200).json({
        title: "",
        message: "Blog got successfully",
        data: blog,
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
      const validated = blogUpsertValidator(req, res);

      const updatedBlog = await Blog.findByIdAndUpdate(req.query.id, validated);

      res.status(200).json({
        title: "",
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    } catch (error) {
      res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Blog.findByIdAndDelete(req.query.id);

      res.status(200).json({
        title: "",
        message: "Blog deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        title: "Sorry",
        message: "Something went wrong",
      });
    }
  }
}
