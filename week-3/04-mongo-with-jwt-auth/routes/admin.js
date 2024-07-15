const { Router } = require("express");
const router = Router();
const {jwt} = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const {Admin} = require("../db");
const {JWT_PASS} = require("../config");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const uname = req.body.username;
    const pass = req.body.password;

    await Admin.create({
        username: uname,
        password: pass
    });

    res.json({
        message: 'Admin created successfully'
    });
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const uname = req.body.username;
    const pass = req.body.password;
    
    var token = req.headers.authorization;
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, JWT_PASS);
    if(decoded.username) {
        res.json({
            jwt_token : token
        })
    } else {
        res.json({
            msg: "Creds. are Invalid!!"
        });
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;