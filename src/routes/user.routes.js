import { Router } from "express";
import * as userController from "../controller/user.controller.js";

const router = Router();

router.get("/users", userController.getAll);

export default router;