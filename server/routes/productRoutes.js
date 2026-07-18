import express from "express"
import {
  createProduct,
  fetchProducts,
  updateProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

 const router = express.Router()


 router.post("/", authMiddleware, createProduct);
 router.get("/", authMiddleware, fetchProducts);
 router.patch("/update/:productId/stock", authMiddleware, updateProduct);
 

 export default router;