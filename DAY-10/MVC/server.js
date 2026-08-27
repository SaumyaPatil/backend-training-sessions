import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { authMiddleware } from "./middlewares/index.js";
import productRouter from "./routes/products.js";
import userRouter from "./routes/users.js";
dotenv.config();

const app = express();

// built-in middlewares
app.use(express.json());

connectDB();

// routes (CRUD ON USERS)
app.use("/api/users", userRouter);

// routes (CRUD ON PRODUCTS)
app.use("/api/products", authMiddleware, productRouter);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log("Server is running on the port");
});
