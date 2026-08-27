import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./model/Product.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

// CRUD on products collection
// get products
app.get("/api/products", async (req, res) => {
  const allDbProducts = await Product.find({});
  res.json(allDbProducts);
});

// get a product
app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "product not found" });
  return res.json(product);
});

// create product
app.post("/api/products/", async (req, res) => {
  const body = req.body;
  const result = await Product.create({
    name: body.name,
    price: body.price,
    featured: body.featured,
    rating: body.rating,
    company: body.company,
  });

  console.log(result);

  res.status(201).json({ msg: "success" });
});

// update product
app.patch("/api/products/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { price: "Changed" });
  return res.json({ status: "success" });
});

// delete product
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log("Server is running on the port");
});
