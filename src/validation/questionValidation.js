import Joi from "joi";

const questionValidation = Joi.object({
    question_text: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    tags: Joi.string().required(),
    userId: Joi.string(),
})

export default questionValidation;