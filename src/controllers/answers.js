import AnswersModel from "../models/answers.js"
import QuestionsModel from "../models/questions.js";
import UsersModel from "../models/users.js";
const ADD_ANSWER = async (req, res) => {
    const questionId = await QuestionsModel.findById(req.params.id);

    if (!questionId) {
        return res.status(404).json({ status: "Question not found" });
    }
    try {
        const answer = new AnswersModel({
            answer_text: req.body.answer_text,
            gained_likes_number: 0,
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
const LIKE_ANSWER = async (req, res) => {
    const answerId = req.params.id;
    try {
        const answer = await AnswersModel.findById(answerId);

        if (!answer) {
            return res.status(404).json({ status: "Answer not found" });
        }
        answer.gained_likes_number += 1;
        const updatedAnswer = await answer.save();

        return res.status(200).json({ response: updatedAnswer, status: "Answer liked" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

const DISLIKE_ANSWER = async (req, res) => {
    const answerId = req.params.id;
    try {
        const answer = await AnswersModel.findById(answerId);

        if (!answer) {
            return res.status(404).json({ status: "Answer not found" });
        }
        answer.gained_likes_number -= 1;
        const updatedAnswer = await answer.save();

        return res.status(200).json({ response: updatedAnswer, status: "Answer Disliked" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

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
        const answer = await AnswersModel.findById(req.params.id);
        const user = await UsersModel.findById(req.body.userId);
        const user_id = user.id;

        if (answer.user_id == user_id) {
            const deleted = await AnswersModel.findByIdAndDelete(req.params.id)
            return res.status(200).json({ deleted, message: "Comment deleted successfully" });
        } else {
            return res.status(401).json({ message: "Unauthorized to delete this comment" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export { ADD_ANSWER, GET_ANSWERS, DELETE_ANSWER, LIKE_ANSWER, DISLIKE_ANSWER }