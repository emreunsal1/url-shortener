const { addUrl, getUrlBySlug } = require("../models/url");
const { nanoid } = require("nanoid");

const addUrlController = async (req, res) => {
  const { url } = req.body;
  const slug = nanoid(5);
  const data = await addUrl(url, slug);
  res.send(data);
};

const redirectUrlController = async (req, res) => {
  const slug = req.params.slug;
  if (slug == "favicon.ico") return res.sendStatus(404);

  const data = await getUrlBySlug(slug);
  res.redirect(data);
};

module.exports = { addUrlController, redirectUrlController };
