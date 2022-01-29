const express = require("express");
const { dbInit } = require("./db");
const {
  addUrlController,
  redirectUrlController,
} = require("./controllers/url-controllers");

dbInit();

const app = express();
app.use(express.json());

app.use("/", express.static("public"));
app.post("/api/url", addUrlController);
app.get("/:slug", redirectUrlController);
app.get("/api/url", (req, res) => {
  const slugs = req.query.slugs.split(",");
  res.send(slugs);
});

app.listen(3000, () => {});
