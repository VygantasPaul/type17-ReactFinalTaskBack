import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
    {
        id: { type: String },
        user_id: { type: Array },
        question_text: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const questionModel = mongoose.model("Question", questionsSchema);

export default questionModel;
