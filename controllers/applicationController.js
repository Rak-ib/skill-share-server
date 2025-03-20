const Application = require('../models/application');

exports.createApplication = async (req, res) => {
    try {
        const { email, course } = req.body;
        const newApplication = new Application({ email, course });
        await newApplication.save();
        res.status(201).json({ message: 'Application submitted' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting application' });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications' });
    }
};