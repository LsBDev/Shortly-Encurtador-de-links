import joi from "joi"

export const linkSchema = joi.object({
  link: joi.string().uri().required()
})
