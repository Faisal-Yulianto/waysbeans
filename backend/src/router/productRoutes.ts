import express from "express";
import {
  handldeCreateProduct,
  handldeUpdateProduct,
  handleDeleteProduct,
  handleGetProduct,
} from "../controller/productController";
import { authenticate } from "../middleware/authenticate";
import upload from "../middleware/multer";

const router = express.Router();

router.post(
  "/product",
  authenticate,
  upload.single("image"),
  handldeCreateProduct
);
router.put(
  "/product/edit/:id",
  authenticate,
  upload.single("image"),
  handldeUpdateProduct
);
router.delete("/product/delete/:id", authenticate, handleDeleteProduct);
router.get("/product", authenticate, handleGetProduct);

export default router;
