import express from "express"
import { getTransaction } from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", authMiddleware, getTransaction);


export default router;