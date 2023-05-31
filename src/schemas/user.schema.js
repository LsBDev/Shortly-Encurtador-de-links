import joi from  "joi"

export const userSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.string().min(3).required().valid(joi.ref("password"))
})