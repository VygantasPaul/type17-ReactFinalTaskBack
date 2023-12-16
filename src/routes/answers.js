import express from "express";
import { GET_ANSWERS, ADD_ANSWER, GET_QUESTION_ANSWER } from "../controllers/answers.js"
const router = express.Router()

router.get('/', GET_ANSWERS)

export { GET_ANSWERS, ADD_ANSWER, GET_QUESTION_ANSWER }

export default router;