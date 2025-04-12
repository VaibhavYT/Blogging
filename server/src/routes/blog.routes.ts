
import {Router} from "express";
import * as blogController from "../controllers/blog.controller";

const router = Router();

router.post("/", blogController.createBlog);

export default router;