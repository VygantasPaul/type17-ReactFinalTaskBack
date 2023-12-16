import AnswersModel from "../models/answers.js"
import QuestionsModel from "../models/questions.js";

const ADD_ANSWER = async (req, res) => {
    const questionId = await QuestionsModel.findById(req.params.id);
    console.log(questionId)
    if (!questionId) {
        return res.status(404).json({ status: "Question not found" });
    }
    try {
        const answer = new AnswersModel({
            answer_text: req.body.answer_text,
            avatar: req.body.avatar,
            gained_likes_number: req.body.gained_likes_number,
            question_id: questionId.id,
            user_id: req.body.userId
        })
        answer.id = answer._id
        const response = await answer.save();
        return res.status(200).json({ response, status: "Answer created" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

const GET_QUESTION_ANSWER = async (req, res) => {
    try {

        const answer = await QuestionsModel.aggregate([
            {
                $lookup: {
                    from: "questions",
                    localField: "question_id",
                    foreignField: "id",
                    as: "answers_data"

                }
            }, { $match: { id: (req.params.id) } }
        ])
        return res.status(200).json({ answer, status: "Answers" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

const GET_ANSWERS = async (req, res) => {
    try {
        const answers = await AnswersModel.find()
        return res.status(200).json({ answers, status: "Answers" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}
const DELETE_ANSWER = async (req, res) => {
    try {
        const answer = await UserModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({ status: "Answer deleted ", answer })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ answers, status: "Error ocurred", })
    }
}

export { ADD_ANSWER, GET_ANSWERS, DELETE_ANSWER, GET_QUESTION_ANSWER }