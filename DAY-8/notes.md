Mongoose

- Mongoose is an ODM (Object Data Modeling) library for Node.js and MongoDB.
- It makes it easier to work with MongoDB using JavaScript objects.
- It provides features like schemas, models, validation, and CRUD operations.

installing mongoose - npm i mongoose

Schema

- A schema defines the structure and rules of documents in a MongoDB collection.
- It specifies fields, data types, validation rules, default values, etc.
- Example:
  const productSchema = new mongoose.Schema({
  name: String,
  price: Number
  });

Model

- A model is created from a schema and is used to interact with a MongoDB collection.
- It provides methods to perform CRUD operations.
- Example:
  const Product = mongoose.model("Product", productSchema, "products");
- The `Product` model will normally interact with the `products` collection.

dotenv

- `dotenv` is an npm package used to load environment variables from a `.env` file into `process.env`.

- It is commonly used to store sensitive or configuration values such as MongoDB connection strings, passwords, API keys, and port numbers.

- Example `.env`:
  MONGO_URI=mongodb+srv://<username>:<password>@usersdatacluster.3rdmog1.mongodb.net/<database>?appName=usersDataCluster

- Access it in Node.js using:
  import dotenv from "dotenv";
  dotenv.config();

  mongoose.connect(process.env.MONGO_URI);

- The `.env` file should generally be added to `.gitignore` so sensitive information is not pushed to GitHub.
- After running command git pull, create .env file and add 'PORT' & 'MONGODB_URI'
