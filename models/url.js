const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  url: String,
  slug: String,
});
const urlModel = mongoose.model("url", urlSchema);

const addUrl = async (url, slug) => {
  const exist = await urlModel.findOne({ url }).exec();
  return exist || urlModel.create({ url, slug });
};

const getUrlBySlug = (slug) => {
  return urlModel.findOne({ slug }).exec();
};

module.exports = { urlModel, addUrl, getUrlBySlug };
