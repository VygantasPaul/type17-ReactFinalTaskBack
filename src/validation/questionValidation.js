import Joi from "joi";

const questionValidation = Joi.object({
    question_text: Joi.string().min(5).required(),
    title: Joi.string().min(5).required(),
    tags: Joi.string().required(),
    userId: Joi.string(),
})

export default questionValidation;