const {jwt} = require("jsonwebtoken");
const {JWT_PASS} = require("../config");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    var jwt_token = req.headers.authorization; // xyx token
    var jwt_token = jwt_token.split(" "); // ["xyz", "token"]
    var jwt_token = jwt_token[1]; // token

    try {
        const decoded = jwt.verify(jwt_token, JWT_PASS);
        if(decoded.username) {
            req.username = decodedValue.username;
            req.randomData = "Adsadsadsadssd";
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(err) {
        res.status(403).json({
            msg: "Invalid Input"
        })
    }
}

module.exports = userMiddleware;