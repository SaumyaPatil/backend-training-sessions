import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (request, response) => {
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
};

export const loginUser = async (request, response) => {
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
};
