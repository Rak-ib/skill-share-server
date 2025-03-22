const Application = require('../models/application');
const Notification = require('../models/Notification');
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

exports.updateApplications = async (req, res) => {
    try {
        console.log("came to update application status")
        const { id } = req.params; 
        const { status } = req.body;

        // Validate status input
        console.log('status is whatever', status)
        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Find and update the application
        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate('user');

        if (!updatedApplication) {
            console.log('application not found problem')
            return res.status(404).json({ message: "Application not found" });
        }
        console.log('now send notification ')
        if (status === "approved") {
            try {
                const message = `Your application has been ${status}.`;
            
                // Save the notification to the database
                const notification = new Notification({ user: updatedApplication.user._id.toString(), message });
                await notification.save();
                console.log('notification saved')
                setTimeout(() => {
                    sendNotification(updatedApplication.user._id.toString(), message);
                }, 1000);
            } catch (error) {
                console.log('error from notification',error);
                // res.status(401).json({message: "Notification problem"})
            }
            // Send the notification via Socket.IO
            
        }

        console.log('everything went fine')

        res.status(200).json({
            message: "Application status updated successfully",
            application: updatedApplication
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

