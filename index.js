// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser()); // ✅ Enable cookie parsing

// Database connection
connectDB();

// Routes

app.use('/users', require('./routes/userRoutes'));

app.use('/applications', require('./routes/applicationRoutes'));

app.use('/courses', require('./routes/courseRoutes'));

app.get('/', (req, res) => {
    res.send('Skill Share is running');
});

app.listen(port, () => {
    console.log(`Skill Share Server is running on port ${port}`);
});
