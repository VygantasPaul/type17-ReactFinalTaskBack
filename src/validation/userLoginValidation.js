import Joi from "joi";

const userLoginChema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),

})

export default userLoginChema;