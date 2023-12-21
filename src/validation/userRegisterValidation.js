import Joi from "joi";

const userRegisterChema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(4).required(),
    avatar: Joi.string(),
})

export default userRegisterChema;