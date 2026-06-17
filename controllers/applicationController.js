const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const resumeUrl = req.file ? req.file.path : null;
        if (!resumeUrl) {
            return res.status(400).json({ message: 'File CV wajib diunggah' });
        }
        const application = await Application.create({
            jobId,
            applicantId: req.user._id,
            resumeUrl
        });
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getApplicationsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ jobId }).populate('applicantId', 'name email profileDetails');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('jobId');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        if (application.jobId.employerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        application.status = status;
        await application.save();
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicantId: req.user._id }).populate('jobId', 'title location salary');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { applyForJob, getApplicationsByJob, updateApplicationStatus, getMyApplications };