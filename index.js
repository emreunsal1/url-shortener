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
  res.send(data);
});

app.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const link = urls.find((url) => url.slug === slug);
  res.redirect(link.url);
});

app.listen(3000, () => {});
