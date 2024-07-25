import { Router } from "express";
import * as authController from "../controller/authentication.controller.js";

const router = Router();

router.post("/signup", authController.SignUp);
router.post("/signin", authController.SignIn);

export default router;