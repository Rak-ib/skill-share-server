const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    course_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    students: { type: Array, default: [] }
});

module.exports = mongoose.model('Course', CourseSchema);