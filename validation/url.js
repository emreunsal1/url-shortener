const Joi = require("joi");

const schema = Joi.object({
  url: Joi.string().uri().trim().required(),
  slug: Joi.string().alphanum().required(),
});

const validateData = (data) => schema.validateAsync(data);

module.exports = { validateData };
