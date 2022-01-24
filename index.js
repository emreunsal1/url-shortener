const express = require("express");
const nanoid = require("nanoid");

const app = express();
app.use(express.json());

app.use("/", express.static("public"));

const urls = [];

app.post("/api/url", (req, res) => {
  const { url } = req.body;
  const slug = nanoid.nanoid(5);
  const data = { slug, url };
  urls.push(data);
  res.send(urls);
});

app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  const url = urls.find((url) => url.slug === slug);
  res.redirect(url.url);
});

app.delete("/delete", (req, res) => {
  const { slug } = req.body;
  const newArray = urls.filter((url) => url.slug !== slug);
  urls = [];
  urls.push(newArray);
  res.send(slug);
});

app.listen(3000, () => {});
