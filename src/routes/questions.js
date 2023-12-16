import express from "express";
import { ADD_QUESTION, GET_QUESTIONS } from "../controllers/questions.js"
const router = express.Router()

router.post('/', ADD_QUESTION)
router.get('/', GET_QUESTIONS)


export { ADD_QUESTION, GET_QUESTIONS }

export default router;