const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const http = require('http'); // ✅ Required for WebSockets
const { setupSocket } = require('./config/socket'); // ✅ Separate file for Socket.IO logic

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app); // ✅ Use an HTTP server
const { sendNotification,io } = setupSocket(server); // Pass the server instance
global.sendNotification = sendNotification;
// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json()); // Express built-in JSON parser
app.use(cookieParser());

// Database connection
connectDB();

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/applications', require('./routes/applicationRoutes'));
app.use('/courses', require('./routes/courseRoutes'));

// Root route for testing
app.get('/', (req, res) => {
    res.send('Skill Share is running');
});

// ✅ Use `server.listen()` instead of `app.listen()`
server.listen(port, () => {
    console.log(`Skill Share Server is running on port ${port}`);
});
