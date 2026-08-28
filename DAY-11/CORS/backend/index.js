const express = require("express");

const app = express();
app.get("/", (req, res) => {
  const dummyData = {
    users: [{ id: 1, name: "Saumya", email: "saumya@gmail.com" }],
  };
  return res
    .setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    .json({ data: dummyData });
});

app.listen(8000, () => console.log("Server started on port 8000"));
