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

// Get all blog posts
export const getBlogPosts = async () => {
  try {
    const blogs = await BlogModel.find();
    return blogs;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (id: string) => {
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      throw new Error("Blog post not found");
    }
    return blog;
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    throw error;
  }
};

// Update a blog post by ID
export const updateBlogPost = async (id: string, data: Partial<BlogData>) => {
  try {
    // Add any validation or processing logic here
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      throw new Error("Blog post not found for update");
    }
    return updatedBlog;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
};

// Delete a blog post by ID
export const deleteBlogPost = async (id: string) => {
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      throw new Error("Blog post not found for deletion");
    }
    // Optionally return the deleted blog or a success message/status
    return { message: "Blog post deleted successfully" };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};
