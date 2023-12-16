const validationSchema = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate()
            if (error) {
                console.log(error)
                return res.status(400).json({ Response: "Wrong user inputs" })
            }
            return next();
        } catch (err) {
            console.log(err)
            return res.status(500).json({ Response: "Internal server error " })
        }
    }
}