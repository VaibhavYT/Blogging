import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { createBlog } from "../services/api";
type FormValues = {
  title: string;
  content: string;
  category: string;
  tags: string;
};

const Createblog = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(false);
    setError(null);
    setSuccessMessage(null);

    const tagsArray = data.tags.split(",").map((tag) => tag.trim());
    try {
      const blogDataToSend = {
        title: data.title,
        content: data.content,
        category: data.category,
        tags: tagsArray,
      };
      const newBlog = await createBlog(blogDataToSend);
      console.log("Blog Created:", newBlog);
      setSuccessMessage("Blog Created Successfully!!");
      reset();
    } catch (error) {
      console.log("Failed to Create Blog", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      Createblog
      <h2>Create New Blog</h2>
      {error && <p style={{ color: "red" }}>Error:{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Title</label>
            <input {...register("title")} />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <input {...register("content")} />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input {...register("category")} />
          </div>
          <div>
            <label htmlFor="tags">Tags (comma-separated):</label>
            <input
              id="tags"
              {...register("tags")}
              placeholder="e.g., tech, javascript, react"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating .." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createblog;
