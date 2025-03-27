const Notification = require("../models/Notification");


exports.getNotification=async(req,res)=>{
    try {
        const userId = req.user.id; // Assuming you have user info in `req.user`
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 }); // Sort by latest first
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateNotification=async(req,res)=>{
    try {
        const userId = req.user.id; // Assuming you have user info in `req.user`
        await Notification.updateMany(
            { user: userId, isRead: false },
            { $set: { isRead: true } }
        );
        res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}