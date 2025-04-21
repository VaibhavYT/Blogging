import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Createblog from "../pages/Createblog";
import UpdateBlog from "../pages/UpdateBlog";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home blogId={0} />} />
    <Route path="/create" element={<Createblog />} />
    <Route path="/update/:id" element={<UpdateBlog />} />
  </Routes>
);

export default AppRoutes;
