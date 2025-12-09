import { Router } from "express";
import { createPost, getAllPost } from "../controllers/post.controller.js";

const route = Router();

route.post("/create",createPost);
route.get("/posts",getAllPost);

export default route;