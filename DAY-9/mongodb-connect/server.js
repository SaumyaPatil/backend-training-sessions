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

app.get("/products/", async (request, response) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.json("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.json("Invalid Access Token");
      } else {
        const allDbProducts = await Product.find({});
        response.json(allDbProducts);
      }
    });
  }
});

// GET A PRODUCT API WITH JWT TOKEN
app.get("/api/products/:id", async (req, res) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.json("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.json("Invalid Access Token");
      } else {
        const product = await Product.findById(req.params.id);
        if (!product)
          return res.status(404).json({ error: "product not found" });
        return res.json(product);
      }
    });
  }
});

// CREATE A PRODUCT API WITH JWT TOKEN
app.post("/api/products/", async (req, res) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401);
    res.json("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        res.json("Invalid Access Token");
      } else {
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
      }
    });
  }
});

// UPDATE A PRODUCT API WITH JWT TOKEN
app.patch("/api/products/:id", async (req, res) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401);
    res.json("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        res.json("Invalid Access Token");
      } else {
        await Product.findByIdAndUpdate(req.params.id, { price: "Changed" });
        return res.json({ status: "success" });
      }
    });
  }
});

// DELETE A PRODUCT API WITH JWT TOKEN
app.delete("/api/products/:id", async (req, res) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401);
    res.json("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        res.json("Invalid Access Token");
      } else {
        await Product.findByIdAndDelete(req.params.id);
        return res.json({ status: "Success" });
      }
    });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log("Server is running on the port");
});
