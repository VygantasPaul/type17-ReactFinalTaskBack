import express from "express";
import { ADD_QUESTION, GET_QUESTIONS_WITH_ANSWERS, GET_QUESTION_ANSWER } from "../controllers/questions.js"
const router = express.Router()
import auth from "../middleware/auth.js";

router.post('/questions/', auth, ADD_QUESTION)
router.get('/questions/', GET_QUESTIONS_WITH_ANSWERS)
router.get('/questions/:id/answers', auth, GET_QUESTION_ANSWER)

export { ADD_QUESTION, GET_QUESTIONS_WITH_ANSWERS, GET_QUESTION_ANSWER }

export default router;