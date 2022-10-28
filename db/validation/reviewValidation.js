import Joi from 'joi';

const schema = Joi.object({
  avatar: Joi.string(),
  createdAt: Joi.string(),
  name: Joi.string().trim(true).required(),
  rating: Joi.string().required(),
  text: Joi.string().min(5).trim(true).required(),
});

export default schema;
