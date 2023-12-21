import express from "express";
import { ADD_QUESTION, GET_QUESTION_ANSWER, DELETE_QUESTION, GET_QUESTION_WITH_NO_ANSWERS, GET_QUESTION_WITH_ANSWERS, GET_QUESTIONS } from "../controllers/questions.js"
const router = express.Router()
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import questionValidate from "../validation/questionValidation.js"
router.post('/questions/', auth, validate(questionValidate), ADD_QUESTION)
router.get('/questions/', GET_QUESTIONS)
router.get('/questions/noAnswers', GET_QUESTION_WITH_NO_ANSWERS)
router.get('/questions/withAnswers', GET_QUESTION_WITH_ANSWERS)
router.get('/questions/:id', GET_QUESTION_ANSWER)
router.delete('/questions/:id', auth, DELETE_QUESTION)

export { ADD_QUESTION, GET_QUESTION_ANSWER, DELETE_QUESTION, GET_QUESTION_WITH_NO_ANSWERS, GET_QUESTION_WITH_ANSWERS, GET_QUESTIONS }

export default router;