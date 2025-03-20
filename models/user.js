const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    profilePicture: {
      type: String, // Store URL if using Cloudinary or similar services
      default: "",
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    createdCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false, // Can be updated after email verification
    },
    mobileNumber: {
      type: String,
      unique: true,
      trim: true,
      match: [/^\d{11}$/, "Mobile number must be exactly 11 digits"], // Regex validation
    },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
