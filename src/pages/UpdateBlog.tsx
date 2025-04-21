import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogByID, updateBlog, Blog } from "../services/api"; // Import necessary API functions and Blog type

// Type for form values, tags are handled as a single string input
type FormValues = {
  title: string;
  content: string;
  category: string;
  tags: string; // Input as a single comma-separated string
};

const UpdateBlog = () => {
  const { id } = useParams<{ id: string }>(); // Get the blog ID from URL params
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormValues>();
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // State for initial data fetch
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [originalBlog, setOriginalBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Blog ID is missing.");
      setIsFetching(false);
      return;
    }

    const loadBlogData = async () => {
      setIsFetching(true);
      setError(null);
      try {
        // Your API expects a string ID (like MongoDB _id)
        const blogData = await fetchBlogByID(id); // Use the ID as a string
        setOriginalBlog(blogData);
        // Pre-fill the form with fetched data
        reset({
          title: blogData.title,
          content: blogData.content,
          category: blogData.category,
          tags: blogData.tags.join(", "), // Join tags array into a comma-separated string
        });
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load blog data."
        );
      } finally {
        setIsFetching(false);
      }
    };

    loadBlogData();
  }, [id, reset]); // Dependency array includes id and reset

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!id) {
      setError("Cannot update blog without an ID.");
      return;
    }
    // Only proceed if the form has changes
    if (!isDirty) {
      setSuccessMessage("No changes detected.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const tagsArray = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    try {
      const blogDataToUpdate = {
        // Only include fields that have changed if desired, or send all
        title: data.title,
        content: data.content,
        category: data.category,
        tags: tagsArray,
      };

      // Assuming updateBlog takes id (string) and the data object
      const updatedBlogData = await updateBlog(id, blogDataToUpdate); // Pass id as string
      console.log("Blog Updated:", updatedBlogData);
      setSuccessMessage("Blog Updated Successfully!");
      // Optionally reset the form to the newly updated values
      reset(data); // Reset form state to reflect saved data and clear isDirty
      // Optionally navigate away after success
      // navigate('/'); // Example: navigate back home
    } catch (err) {
      console.error("Failed to update blog:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred during update."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <div>Loading blog data...</div>;
  }

  if (error && !originalBlog) {
    // Show error only if we failed to fetch initial data
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Update Blog Post</h2>
      {/* Display update-specific errors */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" {...register("title", { required: true })} />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" {...register("content", { required: true })} />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input id="category" {...register("category", { required: true })} />
        </div>
        <div>
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            id="tags"
            {...register("tags")}
            placeholder="e.g., tech, javascript, react"
          />
        </div>
        {/* Disable button if loading or if form hasn't changed */}
        <button type="submit" disabled={isLoading || !isDirty}>
          {isLoading ? "Updating..." : "Update Blog"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
