import express from "express";
import { GET_USERS, REGISTER_USER, LOGIN_USER } from "../controllers/users.js"
const router = express.Router()

router.get('/', GET_USERS)
router.post('/register', REGISTER_USER)
router.post('/login', LOGIN_USER)

export { GET_USERS, REGISTER_USER, LOGIN_USER }


export default router;