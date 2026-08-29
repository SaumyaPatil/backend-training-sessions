const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

// Middleware - plugin
app.use(express.urlencoded({ extended: false }));

// routing
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  res.send(html);
});

// REST APIs
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:userId", (req, res) => {
  // params is an object inside req object storing path parameters
  const userId = Number(req.params.userId);
  const user = users.find((user) => user.id === userId);
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const userData = req.body;
  console.log(userData);
  users.push({ ...userData, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length + 1 });
  });
});

app.patch("/api/users/:id", (req, res) => {
  res.json({
    status: "pending",
    newData: "newly updated data for user with given id",
  });
});

app.delete("/api/users/:id", (req, res) => {
  res.json({ status: "pending", id: "id" });
});

app.listen(8000, () => console.log("Server Started!"));
