const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({ message: 'ID Pekerjaan tidak valid atau kosong dalam permintaan.' });
        }

        const existingApplication = await Application.findOne({
            jobId: jobId,
            applicantId: req.user._id
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'Anda sudah melamar pekerjaan ini sebelumnya.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'File CV berformat PDF wajib diunggah' });
        }

        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ message: 'Dokumen ditolak server! Format mutlak harus PDF.' });
        }

        const base64Data = req.file.buffer.toString('base64');
        const resumeUrl = `data:${req.file.mimetype};base64,${base64Data}`;

        const application = await Application.create({
            jobId,
            applicantId: req.user._id,
            resumeUrl
        });
        
        res.status(201).json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

const getApplicationsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ jobId }).populate('applicantId', 'name email profileDetails');
        res.json(applications);
    } catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicantId: req.user._id }).populate('jobId', 'title location salary');
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { applyForJob, getApplicationsByJob, updateApplicationStatus, getMyApplications };