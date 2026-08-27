import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./model/User.js";
import Product from "./model/Product.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

const authMiddleware = (req, res, next) => {
  //next -> next middleware, api handler
  let jwtToken;
  const authHeaders = req.headers["authorization"]; //`Bearer 'JWT_TOKEN'`
  if (authHeaders != undefined) {
    jwtToken = authHeaders.split(" ")[1];
  }

  if (jwtToken === undefined) {
    res.status(401).json("Access Token not recieved");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (err, payload) => {
      if (err) {
        res.json("Invalid access token");
      } else {
        req.username = "Rahul";
        next();
      }
    });
  }
};

// CRUD on users collection
// Register User API
app.post("/users/", async (request, response) => {
  const { username, password, gender, location } = request.body;

  try {
    // Check if user already exists
    const dbUser = await User.findOne({ username: username });

    if (dbUser === null) {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await User.create({
        username,
        password: hashedPassword,
        gender,
        location,
      });

      response.status(201).send(`Created new user with ${newUser._id}`);
    } else {
      response.status(400).send("User already exists");
    }
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
});

// Login user API
app.post("/login", async (request, response) => {
  const { username, password } = request.body;

  // Find user in MongoDB
  const dbUser = await User.findOne({ username });

  if (dbUser === null) {
    response.status(400);
    response.send("Invalid User");
  } else {
    // Compare entered password with hashed password
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);

    if (isPasswordMatched === true) {
      const payload = {
        username: username,
      };

      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");

      response.send({ jwtToken });
    } else {
      response.status(400);
      response.send("Invalid Password");
    }
  }
});

// GET PRODUCTS API WITH JWT TOKEN

app.get("/products/", authMiddleware, async (req, res) => {
  console.log(req.username);
  const allDbProducts = await Product.find({});
  res.json(allDbProducts);
});

// GET A PRODUCT API WITH JWT TOKEN
app.get("/api/products/:id", authMiddleware, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "product not found" });
  return res.json(product);
});

// CREATE A PRODUCT API WITH JWT TOKEN
app.post("/api/products/", authMiddleware, async (req, res) => {
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

// UPDATE A PRODUCT API WITH JWT TOKEN
app.patch("/api/products/:id", authMiddleware, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { featured: "Changed" });
  return res.json({ status: "success" });
});

// DELETE A PRODUCT API WITH JWT TOKEN
app.delete("/api/products/:id", authMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log("Server is running on the port");
});
