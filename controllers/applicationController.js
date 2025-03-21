const Application = require('../models/application');
const User = require('../models/user');

exports.createApplication = async (req, res) => {
    try {
        console.log("came here");

        // Find the user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(req.body);

        const { 
            email, 
            fullName, 
            courseTitle, 
            price, 
            duration, 
            governmentID,
            linkedInProfile, 
            demoVideo, 
            mobileNumber,
            syllabus,
            courseDescription,
            courseThumbnail, 
            agreementSigned, 
            bankAccountDetails
        } = req.body;

        // Validate required fields
        if (!email||!mobileNumber||!syllabus ||!courseDescription|| !fullName || !courseTitle || !price || !duration || !governmentID || !linkedInProfile || !demoVideo || !courseThumbnail || !bankAccountDetails) {
            
            return res.status(400).json({ message: "All fields are required" });
        }

        const newApplication = new Application({ 
            email, 
            courseTitle, 
            fullName, 
            price, 
            duration, 
            status: "pending",  // Default status
            courseThumbnail,
            governmentID,
            linkedInProfile, 
            demoVideo,
            syllabus,
            mobileNumber,
            courseDescription,
            agreementSigned,
            bankAccountDetails, 
            user: user._id  
        });

        console.log("New Application: ", newApplication);

        const result = await newApplication.save();
        console.log("Saved Application: ", result);

        res.status(201).json({ message: 'Application submitted successfully', result });
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ message: 'Error submitting application', error: error.message });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find(); // Populate user details
        console.log("came for application"),
        console.log(applications);
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
};
