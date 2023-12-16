import Joi from "joi";

const userRegisterChema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
})

export default userRegisterChema;