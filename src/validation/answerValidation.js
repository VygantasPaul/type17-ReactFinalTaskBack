import Joi from "joi";

const questionValidation = Joi.object({
    answer_text: Joi.string().min(6).required(),
})

export default questionValidation;