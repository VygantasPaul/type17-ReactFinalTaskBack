import QuestionsModel from '../models/questions.js'

const ADD_QUESTION = async (req, res) => {
    try {
        const question = new QuestionsModel({
            question_text: req.body.question_text,
            // answer_id: req.body.answer_id,
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
const GET_QUESTIONS_ANSWERS = async (req, res) => {
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
const GET_QUESTION_WITH_ANSWERS = async (req, res) => {
    try {
        const questionWithAnswers = await QuestionsModel.aggregate([

            {
                $lookup: {
                    from: "answers",
                    localField: "id", // Field in the 'questions' collection
                    foreignField: "question_id", // Field in the 'answers' collection
                    as: "answers_data"
                }
            }, {
                $match: { answers_data: { $exists: true, $ne: [] } } // Match questions with at least one answer
            }
        ]);

        if (questionWithAnswers.length > 0) {
            return res.status(200).json({ questionWithAnswers, response: "Questions with answers" });
        } else {
            return res.status(404).json({ response: "No result" });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }

}
const GET_QUESTION_WITH_NO_ANSWERS = async (req, res) => {
    try {
        const questionNoAnswers = await QuestionsModel.aggregate([
            {
                $lookup: {
                    from: "answers",
                    localField: "id",
                    foreignField: "question_id",
                    as: "answers_data"
                }
            },
            {
                $match: { answers_data: { $size: 0 } }
            }
        ]);

        if (questionNoAnswers.length > 0) {
            return res.status(200).json({ questionNoAnswers, response: "Questions with no answers" });
        } else {
            return res.status(404).json({ response: "No result" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

const DELETE_QUESTION = async (req, res) => {
    try {
        const questionDelete = await QuestionsModel.findByIdAndDelete(req.params.id)
        if (!questionDelete) {
            return res.status(404).json({ status: "Question not exist" });
        }
        return res.status(200).json({ response: questionDelete, status: "Question was deleted" });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

export { ADD_QUESTION, GET_QUESTIONS_ANSWERS, DELETE_QUESTION, GET_QUESTION_ANSWER, GET_QUESTION_WITH_NO_ANSWERS, GET_QUESTION_WITH_ANSWERS }