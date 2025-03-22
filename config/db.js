const mongoose = require('mongoose');
console.log(process.env.MONGO_URI)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "skill_share",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;