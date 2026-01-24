import Joi from "joi";

export const validatorForTeacher = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subject: Joi.string().required(),
});
