import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const allDbProducts = await Product.find({});
  res.json(allDbProducts);
};

export const getAProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "product not found" });
  return res.json(product);
};

export const createAProduct = async (req, res) => {
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
};

export const updateAProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { featured: "Changed" });
  return res.json({ status: "success" });
};

export const deleteAProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
};
