const mongoose = require("mongoose");
const { validateData } = require("../validation/url");
const urlSchema = new mongoose.Schema({
  url: String,
  slug: String,
});
const urlModel = mongoose.model("url", urlSchema);

const addUrl = async (url, slug) => {
  const exist = await urlModel.findOne({ url }).exec();
  const newUrl = { url, slug };

  if (exist) return exist;
  try {
    const result = await validateData(newUrl);
    return urlModel.create(result);
  } catch (error) {
    return { error: true };
  }
};

const getUrlBySlug = (slug) => {
  return urlModel.findOne({ slug }).exec();
};

const getUrlsBySlugs = (slugs) => {
  return urlModel
    .find({
      slug: {
        $in: slugs,
      },
    })
    .exec();
};

module.exports = { urlModel, addUrl, getUrlBySlug, getUrlsBySlugs };
