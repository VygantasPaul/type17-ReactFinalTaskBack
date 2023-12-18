import express from "express";
import { GET_ANSWERS, ADD_ANSWER } from "../controllers/answers.js"
const router = express.Router()
import auth from "../middleware/auth.js";

router.get('/answers', GET_ANSWERS)
router.post('/questions/:id/answers', auth, ADD_ANSWER)


export { GET_ANSWERS, ADD_ANSWER }

export default router;