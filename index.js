const express = require("express");
const { dbInit } = require("./db");
const {
  addUrlController,
  redirectUrlController,
  getSlugsInfo,
} = require("./controllers/url-controllers");

const dotenv = require("dotenv");
dotenv.config();
dbInit();

const app = express();
app.use(express.json());

app.use("/", express.static("public"));
app.post("/api/url", addUrlController);
app.get("/:slug", redirectUrlController);
app.get("/api/url", getSlugsInfo);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {});
