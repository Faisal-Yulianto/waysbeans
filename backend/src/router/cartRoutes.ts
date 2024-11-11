import express from "express";
import {
  addToCartController,
  getCartController,
  updateCartController,
  removeFromCartController,
} from "../controller/cartController";

const router = express.Router();

router.post("/cart", addToCartController);
router.get("/cart/:userId", getCartController);
router.put("/cart/edit/:id", updateCartController);
router.delete("/cart/delete/:userId/:productId", removeFromCartController);

export default router;
