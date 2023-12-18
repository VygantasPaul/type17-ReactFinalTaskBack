import QuestionsModel from '../models/questions.js'

const ADD_QUESTION = async (req, res) => {
    try {
        const question = new QuestionsModel({
            question_text: req.body.question_text,
            user_id: req.body.userId,
        });
        question.id = question._id
        const savedQuestion = await question.save();
        return res.status(200).json({ savedQuestion, status: "Question added" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

const GET_QUESTIONS = async (req, res) => {
    try {
        const questions = await QuestionsModel.find()
        return res.status(200).json({ questions, status: "Questions" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

const DELETE_QUESTION = (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

export { ADD_QUESTION, GET_QUESTIONS, DELETE_QUESTION }