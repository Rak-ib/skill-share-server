const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, // Ensures course creator is a registered user

    email: { type: String, required: true, trim: true, lowercase: true },

    fullName: { type: String, required: true, trim: true },

    mobileNumber: { type: String, required: true, match: /^[0-9]{11}$/ }, // Ensures 11-digit phone number

    governmentID: { type: String, required: true }, // Store ID number or document link

    linkedInProfile: { type: String, default: "" }, // Optional

    courseTitle: { type: String, required: true, trim: true }, // Course name/title

    courseDescription: { type: String, required: true, minlength: 1 }, // Ensures a meaningful description

    price: { type: Number, required: true, min: 0 }, // Course price must be positive

    duration: { type: String, required: true }, // e.g., "6 weeks", "10 hours"

    syllabus: { type: String, required: true }, // Outline of the course

    demoVideo: { type: String, default: "" }, // URL of demo video (optional)

    courseThumbnail: { type: String, default: "" }, // Image URL for course banner

    bankAccountDetails: { type: String, required: true }, // Used for secure payouts

    agreementSigned: { type: Boolean, default: false }, // Ensures instructor agrees to platform policies

    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      default: "pending" 
    }, // Approval status

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
