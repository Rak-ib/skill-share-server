const express = require('express');
const { createCourse, getCourses } = require('../controllers/courseController');

const router = express.Router();
// console.log("okay")
router.post('/courses', createCourse);
router.get('/courses', getCourses);

module.exports = router;