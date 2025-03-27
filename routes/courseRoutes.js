const express = require('express');
const { createCourse, getCourses } = require('../controllers/courseController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();
// console.log("okay")
router.post('/courses',verifyToken, createCourse);
router.get('/courses', getCourses);

module.exports = router;