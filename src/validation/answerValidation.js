import Joi from "joi";

const questionValidation = Joi.object({
    answer_text: Joi.string().min(5).required(),
    userId: Joi.string(),

})

export default questionValidation;