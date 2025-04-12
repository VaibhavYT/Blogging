import BlogModel from "../models/blog.model"; 

interface BlogData {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

// Function containing business logic and DB interaction
export const createBlogPost = async (data: BlogData) => {
  try {
    // Add any business logic here (validation, processing, etc.)
    if (!data.title || !data.content) {
      throw new Error("Title and content are required");
    }

    const newBlog = new BlogModel(data);
    const savedBlog = await newBlog.save();
    return savedBlog;
  } catch (error) {
    console.error("Error creating blog post:", error);
    // Re-throw or handle error appropriately for the controller
    throw error;
  }
};

// Add other service functions like getBlogPosts, getBlogPostById, etc.