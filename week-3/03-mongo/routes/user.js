const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const usrname = re.headers.username;
    const pass = re.headers.password;

    User.create({
        username: usrname,
        password: pass
    });

    res.json({ message: 'User created successfully' });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({courses: response});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const usrname = req.headers.username;
    const cid = req.params.courseId;

    await User.update({username: usrname}, {
        "$push": {
            purchasedCourses: cid
        }
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const usr_Found = await User.findOne({
        username: req.headers.username
    })


    console.log(usr_Found.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": usr_Found.purchasedCourses
        }
    });

    res.json({
        courses: courses
    });
    
});

module.exports = router