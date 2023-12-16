const validationSchema = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req.body)
            if (error) {
                console.log(error)
                return res.status(400).json({ Response: "Wrong inputs fields" })
            }
            return next();
        } catch (err) {
            console.log(err)
            return res.status(500).json({ Response: "Internal server error " })
        }
    }
}

export default validationSchema