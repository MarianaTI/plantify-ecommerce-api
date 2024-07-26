import express from "express";
import { getAll, create } from "../controller/categorie.controller.js";

const router = express.Router();

router.get("/categories/getAll", getAll);
router.post("/categories/post", create);

export default router;