import * as API from "../../services/api";
import { useState, useEffect } from "react";

const Home: React.FC<{ blogId: number }> = ({ blogId }) => {
  const [blogs, setBlog] = useState<API.Blog[]>([]);
  useEffect(() => {
    const getBlog = async () => {
      try {
        const blogData = await API.fetchBlogs();
        setBlog(Array.isArray(blogData) ? blogData : [blogData]);
      } catch (error) {
        console.error(error);
      }
    };
    getBlog();
  }, [blogId]);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blogId}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
