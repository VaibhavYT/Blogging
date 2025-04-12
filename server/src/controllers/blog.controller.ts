import { Request, Response } from "express";
import * as blogService from "../services/blog.services"; // Import the service

// Controller function calls the service
export const createBlog = async (req: Request, res: Response) => {
  try {
    // 1. Extract data from request
    const { title, content,category,tags } = req.body;

    // 2. Call the service function
    const newBlogPost = await blogService.createBlogPost({
      title,
      content,
      category,
      tags,
    });

    // 3. Send the response
    res.status(201).json(newBlogPost);
  } catch (error: unknown) {
    // Handle errors (e.g., validation errors from service)
    const errorMessage = error instanceof Error ? error.message : "Failed to create blog post";
    res
      .status(400)
      .json({ message: errorMessage });
  }
};

// Add other controller functions (getBlogs, getBlogById, etc.) that call corresponding service functions
