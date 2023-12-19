import express from "express";
import { ADD_QUESTION, GET_QUESTIONS_ANSWERS, GET_QUESTION_ANSWER, DELETE_QUESTION, GET_QUESTION_WITH_NO_ANSWERS, GET_QUESTION_WITH_ANSWERS } from "../controllers/questions.js"
const router = express.Router()
import auth from "../middleware/auth.js";

router.post('/questions/', auth, ADD_QUESTION)
router.get('/questions/', GET_QUESTIONS_ANSWERS)

router.get('/questions/noAnswers', GET_QUESTION_WITH_NO_ANSWERS)
router.get('/questions/withAnswers', GET_QUESTION_WITH_ANSWERS)

router.get('/questions/:id/answers', auth, GET_QUESTION_ANSWER)

router.delete('/questions/:id', DELETE_QUESTION)

export { ADD_QUESTION, GET_QUESTIONS_ANSWERS, GET_QUESTION_ANSWER, DELETE_QUESTION, GET_QUESTION_WITH_NO_ANSWERS, GET_QUESTION_WITH_ANSWERS }

export default router;