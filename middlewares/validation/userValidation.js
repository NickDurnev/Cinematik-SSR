import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().trim(true).required(),
  email: Joi.string().trim(true).required(),
  locale: Joi.string(),
  picture: Joi.string(),
  leftReview: Joi.bool(),
});

export default schema;
