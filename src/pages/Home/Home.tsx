import * as API from "../../services/api";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home: React.FC<{ blogId: number }> = ({ blogId }) => {
  const [blogs, setBlog] = useState<API.Blog[]>([]);
  const navigate = useNavigate();
  const handleCreateBlog = () => {
    navigate('/create');
  };

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
    <div style={{ position: "relative" }}>
      {blogs.map((blog, idx) => (
        <div key={idx}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
      <button
        onClick={handleCreateBlog}
        className={styles.fab} // Use the class from the CSS module
        aria-label="Create Blog"
      >
        +
      </button>
    </div>
  );
};

export default Home;
