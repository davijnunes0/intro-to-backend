import { Router } from "express";
import { createPost, deletePost, getAllPost, updatePost } from "../controllers/post.controller.js";

const route = Router();

route.get("/posts",getAllPost);

route.post("/posts",createPost);

route.patch("/posts/:id",updatePost);

route.delete("/posts/:id",deletePost);


export default route;