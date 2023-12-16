import express from "express";
import { ADD_QUESTION, GET_QUESTIONS } from "../controllers/questions.js"
const router = express.Router()
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import questionValidation from '../validation/questionValidation.js';

router.post('questions/', auth, validate(questionValidation), ADD_QUESTION)
router.get('questions/', auth, GET_QUESTIONS)


export { ADD_QUESTION, GET_QUESTIONS }

export default router;