const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8000;

let users = require("./MOCK_DATA.json");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Manually handle CORS for requests coming from the React frontend (Vite default port)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // preflight request — respond and stop here
  }

  next();
});

// Helper — persist the users array back to MOCK_DATA.json
function saveUsers(callback) {
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), callback);
}

// READ — list all users
// App.jsx does: setUsers(res.data) — so this MUST return a plain array, not { data: [...] }
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// READ — get a single user by id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user)
    return res.status(404).json({ status: "error", message: "User not found" });
  return res.json(user);
});

// CREATE — App.jsx: axios.post(API_URL, form)
app.post("/api/users", (req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;

  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    first_name,
    last_name,
    email,
    gender,
    job_title,
  };
  users.push(newUser);

  saveUsers((err) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save user" });
    return res.status(201).json(newUser); // App.jsx expects the new user object back
  });
});

// UPDATE — App.jsx: axios.put(`${API_URL}/${editingId}`, form)
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { first_name, last_name, email, gender, job_title } = req.body;

  const user = users.find((u) => u.id === id);
  if (!user)
    return res.status(404).json({ status: "error", message: "User not found" });

  user.first_name = first_name;
  user.last_name = last_name;
  user.email = email;
  user.gender = gender;
  user.job_title = job_title;

  saveUsers((err) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save user" });
    return res.json(user); // App.jsx expects the updated user object back
  });
});

// DELETE — App.jsx: axios.delete(`${API_URL}/${id}`)
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1)
    return res.status(404).json({ status: "error", message: "User not found" });

  users.splice(userIndex, 1);

  saveUsers((err) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save user" });
    return res.status(204).send();
  });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ status: "error", message: "Something went wrong on the server" });
});

app.listen(8000, () => console.log(`Server started on port ${PORT}`));
