import express from "express";
import { GET_USERS, REGISTER_USER, LOGIN_USER } from "../controllers/users.js"
const router = express.Router()

import validate from "../middleware/validate.js";
import userLoginSchema from '../validation/userLoginSchema.js';
import userRegisterChema from "../validation/userRegisterValidation.js";

router.get('/', GET_USERS)
router.post('/register', validate(userRegisterChema), REGISTER_USER)
router.post('/login', validate(userLoginSchema), LOGIN_USER)

export { GET_USERS, REGISTER_USER, LOGIN_USER }


export default router;