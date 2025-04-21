import { Request, Response } from "express";
import * as blogService from "../services/blog.services"; // Import the service

// Controller function calls the service
export const createBlog = async (req: Request, res: Response) => {
  console.log("Received body:", req.body); // Add this line to log the incoming data
  try {
    // 1. Extract data from request
    const { title, content, category, tags } = req.body;

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
    console.error("Error creating blog:", error); // Also log the specific error on the server
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create blog post";
    res.status(400).json({ message: errorMessage });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blog = await blogService.getBlogPosts();
    res.status(201).json(blog);
  } catch (error) {
    // Handle errors (e.g., validation errors from service)
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get blog post";
    res.status(400).json({ message: errorMessage });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await blogService.getBlogPostById(id);
    res.status(201).json(blog);
  } catch (error) {
    // Handle errors (e.g., validation errors from service)
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get blog post";
    res.status(400).json({ message: errorMessage });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await blogService.updateBlogPost(id, data);
    res.status(201).json({ message: "Blog Updated Successfully" });
  } catch (error) {
    // Handle errors (e.g., validation errors from service)
    const errorMessage =
      error instanceof Error ? error.message : "Failed to Update blog post";
    res.status(400).json({ message: errorMessage });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await blogService.deleteBlogPost(id);
    res.status(201).json({ message: "Blog deleted Successfully" });
  } catch (error) {
    // Handle errors (e.g., validation errors from service)
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete blog post";
    res.status(400).json({ message: errorMessage });
  }
};
