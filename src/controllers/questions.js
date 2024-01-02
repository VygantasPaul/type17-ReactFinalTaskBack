import QuestionsModel from '../models/questions.js'
import UsersModel from '../models/users.js';
import AnswersModel from '../models/answers.js';
const ADD_QUESTION = async (req, res) => {
    try {
        const question = new QuestionsModel({
            title: req.body.title,
            tags: req.body.tags.split(',').map(tag => tag.trim()),
            gained_likes_number: req.body.gained_likes_number,
            gained_dislikes_number: req.body.gained_dislikes_number,
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
        const questions = await QuestionsModel.aggregate([

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
        return res.status(200).json({ questions, status: "Questions" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

const GET_QUESTION_ANSWER = async (req, res) => {
    try {

        const questionAnswer = await QuestionsModel.aggregate([
            {
                $match: { id: req.params.id } // Match the question by id
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "id",
                    as: "user_data"
                }
            },
            {
                $lookup: {
                    from: "answers",
                    let: { questionId: "$id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$question_id", "$$questionId"]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "user_id",
                                foreignField: "id",
                                as: "user_data"
                            }
                        },
                        {
                            $unwind: {
                                path: "$user_data",  /// insert user data
                                preserveNullAndEmptyArrays: true
                            }
                        }
                    ],
                    as: "answers_data"
                }
            },
            {
                $addFields: {
                    answers_data: {
                        $ifNull: ["$answers_data", []]
                    }
                }
            }
        ]);

        return res.status(200).json({ questionAnswer, status: "Questions answer" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}
const LIKE_QUESTION = async (req, res) => {
    try {
        const question = await QuestionsModel.findById(req.params.id);
        const user = await UsersModel.findById(req.body.userId);

        if (!question.gained_likes_number.includes(user.id) && !question.gained_dislikes_number.includes(user.id)) {
            question.gained_likes_number.push(user.id);
            await question.save();
            return res.status(200).json({ response: question, status: "Question liked" });
        } else {
            return res.status(400).json({ status: "User already liked or disliked this answer" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

const DISLIKE_QUESTION = async (req, res) => {
    try {
        const question = await QuestionsModel.findById(req.params.id);
        const user = await UsersModel.findById(req.body.userId);

        if (!question.gained_dislikes_number.includes(user.id) && !question.gained_likes_number.includes(user.id)) {
            question.gained_dislikes_number.push(user.id);
            await question.save();
            return res.status(200).json({ response: question, status: "Question disliked" });
        } else {
            return res.status(400).json({ status: "User already liked or disliked this answer" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error occurred" });
    }
};

const GET_QUESTION_WITH_ANSWERS = async (req, res) => {
    try {
        const questionWithAnswers = await QuestionsModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: 'id',
                    as: 'user_data'
                }
            },
            {
                $lookup: {
                    from: "answers",
                    localField: "id",
                    foreignField: "question_id",
                    as: "answers_data"
                }
            }, {
                $match: { answers_data: { $exists: true, $ne: [] } } // Match questions with at least one answer
            }
        ]);

        if (questionWithAnswers.length) {
            return res.status(200).json({ questionWithAnswers, response: "Questions with answers" });
        } else {
            return res.status(404).json({ response: "Not Found", status: "No result" });
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
            return res.status(404).json({ response: "Not Found", status: "No result" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "Internal Server Error", error: "An unexpected error occurred. Please try again later." });
    }

};

const DELETE_QUESTION = async (req, res) => {
    try {
        const question = await QuestionsModel.findById(req.params.id);
        const user = await UsersModel.findById(req.body.userId);
        const user_id = user.id;

        if (question.user_id == user_id) {
            const deleted = await QuestionsModel.findByIdAndDelete(req.params.id)
            await AnswersModel.deleteMany({ question_id: req.params.id })
            return res.status(200).json({ deleted, message: "Comment deleted successfully" });

        } else {
            return res.status(401).json({ message: "Unauthorized to delete this comment" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export { ADD_QUESTION, DELETE_QUESTION, GET_QUESTION_ANSWER, GET_QUESTION_WITH_NO_ANSWERS, GET_QUESTION_WITH_ANSWERS, GET_QUESTIONS, DISLIKE_QUESTION, LIKE_QUESTION }