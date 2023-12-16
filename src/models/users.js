
import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    avatar: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },

})

const UserModel = mongoose.model("User", userSchema)

export default UserModel;