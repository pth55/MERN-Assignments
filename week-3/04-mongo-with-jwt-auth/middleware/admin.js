const {jwt} = require("jsonwebtoken");
const {JWT_PASS} = require("../config");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected.

    var jwt_token = req.headers.authorization; // xyx token
    var jwt_token = jwt_token.split(" "); // ["xyz", "token"]
    var jwt_token = jwt_token[1]; // token

    try {
        const decoded = jwt.verify(jwt_token, JWT_PASS);

        if(decoded.username) {
            // if creds. are valid take admin to next step..
            next();
        } else {
            res.json({
                msg: "You are not authenticated"
            });
        }
    } catch(err) {
        res.status(404).json({
            msg: "Invalid Inputs!!"
        });
    }
}

module.exports = adminMiddleware;