import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/db.js";
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);
app.use("/api/auth/", userRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/transactions/", transactionRoutes);

app.listen(PORT, ()=>{
  console.log("server started");
});