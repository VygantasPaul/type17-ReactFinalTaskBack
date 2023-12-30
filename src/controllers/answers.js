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
            gained_likes_number: req.body.gained_likes_number,
            gained_dislikes_number: req.body.gained_dislikes_number,
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
    try {
        const answer = await AnswersModel.findById(req.params.id);
        const user = await UsersModel.findById(req.body.userId);

        if (!answer.gained_likes_number.includes(user.id) && !answer.gained_dislikes_number.includes(user.id)) {
            // Update the gained_likes_number array
            answer.gained_likes_number.push(user.id);
            console.log('user:', user.id);
            console.log('answer: ', answer);

            await answer.save();
            return res.status(200).json({ response: answer, status: "Answer liked" });
        } else {
            return res.status(400).json({ status: "User already liked or disliked this answer" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

const DISLIKE_ANSWER = async (req, res) => {
    try {
        const answer = await AnswersModel.findById(req.params.id);
        const user = await UsersModel.findById(req.body.userId);

        if (!answer.gained_dislikes_number.includes(user.id) && !answer.gained_likes_number.includes(user.id)) {
            // Update the gained_dislikes_number array
            answer.gained_dislikes_number.push(user.id);

            console.log('user:', user.id);
            console.log('answer: ', answer);

            await answer.save();
            return res.status(200).json({ response: answer, status: "Answer disliked" });
        } else {
            return res.status(400).json({ status: "User already liked or disliked this answer" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

const GET_ANSWERS = async (req, res) => {
    try {
        const answers = await AnswersModel.aggregate([

            {
                $lookup: {
                    from: "answers",
                    localField: "id",
                    foreignField: "question_id",
                    as: "answers_data"
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: 'id',
                    as: 'user_data'
                }
            },
        ]);
        return res.status(200).json({ answers, status: "Answers" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

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