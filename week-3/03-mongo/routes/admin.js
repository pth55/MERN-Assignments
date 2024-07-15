const { Router } = require("express");
const { Course } = require("../db")
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const uname = req.body.username;
    const upass = req.body.password;

    try{
        await Admin.create({
            username: uname,
            password: upass
        });
        return res.status(201).send({
            message: "Admin created successfully",
        });
    } catch(err) {
        return res.status(500).send({ message: "Error creating admin account", error: error });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const uname = req.headers.username;
    const upass = req.headers.password;
    
    // returns id
    const newCourse = await Course.create({
        title: req.body.title,
        description: req.body.description,
        imageLink: req.body.imageLink,
        price: req.body.price
    });

    res.send(200).json({
        message: 'Course created successfully', 
        courseId: newCourse._id
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const response = await Course.find({});

    res.json({
        courses: response
    })
});

module.exports = router;