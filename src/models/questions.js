import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: { type: String, required: true },
        tags: { type: Array, required: true },
        user_id: { type: Array, required: true },
        gained_likes_number: { type: Array },
        gained_dislikes_number: { type: Array },
        question_text: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const questionModel = mongoose.model("Question", questionsSchema);

export default questionModel;
