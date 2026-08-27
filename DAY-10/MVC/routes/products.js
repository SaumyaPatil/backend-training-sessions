import express from "express";
import {
  getProducts,
  getAProduct,
  createAProduct,
  updateAProduct,
  deleteAProduct,
} from "../controllers/products.js";
const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(createAProduct);
productRouter
  .route("/:id")
  .get(getAProduct)
  .patch(updateAProduct)
  .delete(deleteAProduct);

// // GET PRODUCTS API WITH JWT TOKEN
// productRouter.get("/", getProducts);

// // GET A PRODUCT API WITH JWT TOKEN
// productRouter.get("/:id", getAProduct);

// // CREATE A PRODUCT API WITH JWT TOKEN
// productRouter.post("/", createAProduct);

// // UPDATE A PRODUCT API WITH JWT TOKEN
// productRouter.patch("/:id", updateAProduct);

// // DELETE A PRODUCT API WITH JWT TOKEN
// productRouter.delete("/:id", deleteAProduct);

export default productRouter;
