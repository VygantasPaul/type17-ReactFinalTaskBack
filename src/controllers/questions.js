import QuestionsModel from '../models/questions.js'

const ADD_QUESTION = async (req, res) => {
    try {
        const question = new QuestionsModel({
            question_text: req.body.question_text,
            answer_id: req.body.answer_id,
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
const GET_QUESTION_ANSWER = async (req, res) => {
    try {

        const questionAnswer = await QuestionsModel.aggregate([

            {
                $lookup: {
                    from: "answers",
                    localField: "id",
                    foreignField: "question_id",
                    as: "answers_data"
                }
            },
            {
                $match: { id: (req.params.id) } // Match the question by id
            }
        ]);
        console.log(questionAnswer)
        return res.status(200).json({ questionAnswer, status: "Questions answer" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}
const GET_QUESTIONS_WITH_ANSWERS = async (req, res) => {
    try {
        const questionsAnswer = await QuestionsModel.aggregate([

            {
                $lookup: {
                    from: "answers",
                    localField: "id", // Field in the 'questions' collection
                    foreignField: "question_id", // Field in the 'answers' collection
                    as: "answers_data"
                }
            },
        ]);
        return res.status(200).json({ questionsAnswer, status: "Questions answer" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

const DELETE_QUESTION = (req, res) => {
    try {
        const questionDelete = QuestionsModel.findByIdAndDelete(req.params.id)
        if (questionDelete === null) {
            return res.status(404).json({ status: "Question not exist" });
        }
        return res.json({ response: questionDelete, status: "Question was deleted" });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

export { ADD_QUESTION, GET_QUESTIONS_WITH_ANSWERS, DELETE_QUESTION, GET_QUESTION_ANSWER }