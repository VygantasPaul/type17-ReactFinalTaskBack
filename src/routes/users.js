import express from "express";
import { GET_USERS, REGISTER_USER, LOGIN_USER } from "../controllers/users.js"
const router = express.Router()

import validate from "../middleware/validate.js";
import userLoginValidation from '../validation/userLoginValidation.js';
import userRegisterValidation from "../validation/userRegisterValidation.js";

router.get('/', GET_USERS)
router.post('/users/register', validate(userRegisterValidation), REGISTER_USER)
router.post('/users/login', validate(userLoginValidation), LOGIN_USER)

export { GET_USERS, REGISTER_USER, LOGIN_USER }


export default router;  