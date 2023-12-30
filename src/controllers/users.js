import UsersModel from "../models/users.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const REGISTER_USER = async (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    try {
        const user = new UsersModel({
            name: req.body.name,
            avatar: req.body.avatar,
            email: req.body.email,
            password: hash,
        })
        user.id = user._id
        const response = await user.save()
        return res.status(200).json({ response, status: "User registered" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

const LOGIN_USER = async (req, res) => {
    try {

        const user = await UsersModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json({ status: "User not found", })
        }

        bcrypt.compare(req.body.password, user.password, (err, isAuthMatch) => {

            if (err || !isAuthMatch) {
                return res.status(401).json({ status: "Wrong user name or password", })
            }
            const token = jwt.sign({ email: user.email, userId: user._id }, process.env.SECRET_KEY, { expiresIn: "24h" }, { algorithm: "RS256" })
            return res.status(200).json({ token, status: "User logged in", user: user.name, avatar: user.avatar })
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}
const GET_USERS = (req, res) => {
    try {
        const users = UsersModel.find()
        return res.status(200).json({ users, status: "Users" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: "Error ocurred", })
    }
}

export { GET_USERS, REGISTER_USER, LOGIN_USER }