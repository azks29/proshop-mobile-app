import express from "express";
import {
  createProductReview,
  getProduct,
  getProductById,
} from "../controlers/productControler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/:id").get(getProductById);

export default router;
