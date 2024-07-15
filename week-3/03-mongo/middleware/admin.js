const { Admin } = require("../db");

// Middleware for handling auth
const zod = require("zod");

const AdminSchema = zod.object({
    username: zod.email(),
    password: zod.string().min(8)
})

app.use(express.json());

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    Admin.findOne( {
        username: req.headers.username,
        password: req.headers.password
    }).then(function(value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                msg: "Admin doesnt exist"
            })
        }
    })
}

module.exports = adminMiddleware;