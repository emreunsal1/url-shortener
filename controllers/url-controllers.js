const { addUrl, getUrlBySlug, getUrlsBySlugs } = require("../models/url");
const { nanoid } = require("nanoid");
const { generateQR } = require("../utils/qr");

const addUrlController = async (req, res) => {
  const { url } = req.body;
  const slug = nanoid(5);
  const data = await addUrl(url, slug);
  const qr = await generateQR(data.url);

  if (data.error) {
    return res.sendStatus(400);
  }
  res.send({ ...data, qr });
};

const redirectUrlController = async (req, res) => {
  const slug = req.params.slug;
  if (slug == "favicon.ico") return res.sendStatus(404);

  const data = await getUrlBySlug(slug);
  res.redirect(data.url);
};

const getSlugsInfo = async (req, res) => {
  const { slugs } = req.query;
  const data = await getUrlsBySlugs(slugs.split(","));
  res.send(data);
};

module.exports = { addUrlController, redirectUrlController, getSlugsInfo };
