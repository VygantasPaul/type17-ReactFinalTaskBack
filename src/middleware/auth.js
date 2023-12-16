import jwt from "jsonwebtoken";

const authentificate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ response: "Bad authorization" })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

        if (err) {
            return res.status(401).json({ response: "Bad authorization" })
        }
        req.body.userId = decoded.userId
        return next()
    })
}



export default authentificate