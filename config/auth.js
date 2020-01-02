const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log(req.headers)
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(`token ---->${token}`)
        jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};