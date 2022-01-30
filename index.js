const express = require("express");
const { dbInit } = require("./db");
const {
  addUrlController,
  redirectUrlController,
  getSlugsInfo,
} = require("./controllers/url-controllers");

dbInit();

const app = express();
app.use(express.json());

app.use("/", express.static("public"));
app.post("/api/url", addUrlController);
app.get("/:slug", redirectUrlController);
app.get("/api/url", getSlugsInfo);

app.listen(3000, () => {});
