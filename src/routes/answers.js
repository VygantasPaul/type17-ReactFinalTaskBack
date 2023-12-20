import express from "express";
import { GET_ANSWERS, ADD_ANSWER, DELETE_ANSWER, LIKE_ANSWER, DISLIKE_ANSWER } from "../controllers/answers.js"
const router = express.Router()
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import answerValidate from "../validation/answerValidation.js"
router.get('/answers', GET_ANSWERS)
router.post('/questions/:id/answers', auth, validate(answerValidate), ADD_ANSWER)
router.post('/answers/:id/like', LIKE_ANSWER);
router.post('/answers/:id/dislike', DISLIKE_ANSWER);
router.delete('/answers/:id', auth, DELETE_ANSWER)
export { GET_ANSWERS, ADD_ANSWER, DELETE_ANSWER, LIKE_ANSWER, DISLIKE_ANSWER }

export default router;