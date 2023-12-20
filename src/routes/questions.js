import express from "express";
import { ADD_QUESTION, GET_QUESTIONS_ANSWERS, GET_QUESTION_ANSWER, DELETE_QUESTION, GET_QUESTION_WITH_NO_ANSWERS, GET_QUESTION_WITH_ANSWERS, GET_QUESTIONS, GET_QUESTION_ID } from "../controllers/questions.js"
const router = express.Router()
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import questionValidate from "../validation/questionValidation.js"
router.post('/questions/', auth, validate(questionValidate), ADD_QUESTION)
router.get('/questions/all', GET_QUESTIONS)
router.get('/questions/', GET_QUESTIONS_ANSWERS)
router.get('/questions/noAnswers', GET_QUESTION_WITH_NO_ANSWERS)
router.get('/questions/withAnswers', GET_QUESTION_WITH_ANSWERS)

router.get('/questions/:id', auth, GET_QUESTION_ID)

router.delete('/questions/:id', auth, DELETE_QUESTION)

export { ADD_QUESTION, GET_QUESTIONS_ANSWERS, GET_QUESTION_ANSWER, DELETE_QUESTION, GET_QUESTION_WITH_NO_ANSWERS, GET_QUESTION_WITH_ANSWERS, GET_QUESTIONS, GET_QUESTION_ID }

export default router;