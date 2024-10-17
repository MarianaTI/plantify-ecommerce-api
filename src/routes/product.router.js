import { Router } from "express";
import * as productController from "../controller/product.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

router.post(
  "/product/create",
  fileUpload({ useTempFiles: true, tempFileDir: "/uploads" }),
  productController.create
);
router.get("/product", productController.getAll);
router.get("/product/:id", productController.getById);
router.put(
  "/product/update/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "/uploads" }),
  productController.update
);
router.delete("/product/delete/:id", productController.deleteOne);

export default router;



