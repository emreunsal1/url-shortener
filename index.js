const express = require("express");

const app = express();
app.use(express.json());

let users = [];

app.use("/", express.static("public"));

app.post("/users", (request, response) => {
  users.push(request.body);
  response.send(users);
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:name", (req, res) => {
  const user = users.find((user) => user.name === req.params.name);
  res.send(user);
});

app.listen(3000, () => {});
