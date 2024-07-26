import { Router } from "express";
import * as productController from "../controller/product.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

router.post(
  "/create/product",
  fileUpload({ useTempFiles: true, tempFileDir: "/uploads" }),
  productController.create
);
router.get("/products", productController.getAll);
router.get("/product/:id", productController.getById);

export default router;