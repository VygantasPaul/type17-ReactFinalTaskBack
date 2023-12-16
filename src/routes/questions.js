import express from "express";
import { ADD_QUESTION, GET_QUESTIONS } from "../controllers/questions.js"
const router = express.Router()
import auth from "../middleware/auth.js";
router.post('/', auth, ADD_QUESTION)
router.get('/', auth, GET_QUESTIONS)


export { ADD_QUESTION, GET_QUESTIONS }

export default router;