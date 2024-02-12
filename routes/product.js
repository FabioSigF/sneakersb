import express from "express";
import { getProducts, getProductPhotos, getProduct } from "../controllers/product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductPhotos);
router.get("/item/:id", getProduct);
export default router;
