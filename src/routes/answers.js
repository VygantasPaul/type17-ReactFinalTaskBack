import express from "express";
import { GET_ANSWERS, ADD_ANSWER, GET_QUESTION_ANSWER } from "../controllers/answers.js"
const router = express.Router()


router.get('/', GET_ANSWERS)
router.post('/questions/:id/answers', ADD_ANSWER)
router.get('/questions/:id/answers', GET_QUESTION_ANSWER)

export { GET_ANSWERS, ADD_ANSWER, GET_QUESTION_ANSWER }

export default router;