import { supabase } from "../config/db.config";

interface BlogData {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

// Function containing business logic and DB interaction
export const createBlogPost = async (data: BlogData) => {
  // Basic validation
  if (!data.title || !data.content) {
    throw new Error("Title and content are required");
  }
  const { data: blog, error } = await supabase
    .from("blogs")
    .insert(data)
    .single();
  if (error) throw error;
  return blog;
};

// Get all blog posts
export const getBlogPosts = async () => {
  const { data: blogs, error } = await supabase.from("blogs").select("*");
  if (error) throw error;
  return blogs;
};

// Get a single blog post by ID
export const getBlogPostById = async (id: string) => {
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return blog;
};

// Update a blog post by ID
export const updateBlogPost = async (id: string, data: Partial<BlogData>) => {
  const { data: updatedBlog, error } = await supabase
    .from("blogs")
    .update(data)
    .eq("id", id)
    .single();
  if (error) throw error;
  return updatedBlog;
};

// Delete a blog post by ID
export const deleteBlogPost = async (id: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};
