const Course = require('../models/course');

exports.createCourse = async (req, res) => {
    try {
        const { course_id, name } = req.body;
        const existingCourse = await Course.findOne({ course_id });

        if (existingCourse) {
            return res.status(400).json({ message: 'Course already exists' });
        }

        const newCourse = new Course({ course_id, name });
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course' });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
};