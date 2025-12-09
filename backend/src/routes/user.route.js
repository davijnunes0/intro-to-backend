import { Router } from "express";

import { initialPage, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

// router.route("/register").post(registerUser);

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/",initialPage);

export default router;