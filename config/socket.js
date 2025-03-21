const { Server } = require("socket.io");
const onlineUsers = new Map();

// Set up socket.io server
const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Update as per your frontend URL
            methods: ["GET", "POST"],
            credentials: true, // Ensure credentials are allowed
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("register", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} connected with socket ${socket.id}`);

            // ✅ TEST: Send notification after 5 seconds
            // setTimeout(() => {
            //     sendNotification(userId, "Test notification from backend!");
            // }, 5000);
        });

        socket.on("disconnect", () => {
            for (let [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`User ${userId} disconnected`);
                }
            }
        });
    });

    // Function to send notification to a specific user
    const sendNotification = (userId, message) => {
        try {
            const socketId = onlineUsers.get(userId);
            console.log(`Attempting to send notification to ${userId} with socketId: ${socketId}`);

            if (socketId) {
                io.to(socketId).emit("notification", message);
                console.log(`✅ Notification sent to ${userId}: ${message}`);
            } else {
                console.log(`❌ User ${userId} is not online.`);
            }
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    return { io, sendNotification };
};

module.exports = { setupSocket };