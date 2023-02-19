import Joi from 'joi';

const schema = Joi.object({
  picture: Joi.string().allow(null, ''),
  createdAt: Joi.string(),
  name: Joi.string().trim(true).required(),
  rating: Joi.string().required(),
  text: Joi.string().min(5).max(200).trim(true).required().messages({
    'string.min': 'Text should have a minimum length of {#limit}',
    'string.max': 'Text should have a maximum length of {#limit}',
  }),
});

export default schema;
