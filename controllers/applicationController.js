const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
    try {
        const { jobId, resume, coverLetter } = req.body;

        if (!jobId) {
            return res.status(400).json({ message: 'ID Pekerjaan tidak valid.' });
        }

        if (!resume) {
            return res.status(400).json({ message: 'Dokumen CV wajib diunggah.' });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Lowongan tidak ditemukan.' });
        }

        const existingApplication = await Application.findOne({
            jobId: jobId,
            applicantId: req.user._id
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'Anda sudah melamar pekerjaan ini sebelumnya.' });
        }

        // PERBAIKAN MUTLAK: Sesuaikan nama field dan enum status dengan database
        const application = await Application.create({
            jobId,
            applicantId: req.user._id,
            resumeUrl: resume, // Petakan 'resume' dari Front-End ke 'resumeUrl'
            coverLetter,
            status: 'Review'   // Gunakan 'Review' bukan 'pending'
        });
        
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

const getJobApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ jobId })
            .populate('applicantId', 'name email profileDetails') 
            .sort({ createdAt: -1 });
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
        const applications = await Application.find({ applicantId: req.user._id })
            .populate({
                path: 'jobId',
                populate: { path: 'employerId', select: 'name profileDetails' }
            })
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { applyForJob, getJobApplicants, updateApplicationStatus, getMyApplications };