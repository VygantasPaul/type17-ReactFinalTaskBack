import express from "express";
import { ADD_QUESTION, GET_QUESTIONS_WITH_ANSWERS, GET_QUESTION_ANSWER, DELETE_QUESTION } from "../controllers/questions.js"
const router = express.Router()
import auth from "../middleware/auth.js";

router.post('/questions/', auth, ADD_QUESTION)
router.get('/questions/', GET_QUESTIONS_WITH_ANSWERS)
router.get('/questions/:id/answers', auth, GET_QUESTION_ANSWER)
router.delete('/questions/:id', DELETE_QUESTION)
export { ADD_QUESTION, GET_QUESTIONS_WITH_ANSWERS, GET_QUESTION_ANSWER, DELETE_QUESTION }

export default router;