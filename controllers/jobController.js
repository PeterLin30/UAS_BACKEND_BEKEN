const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, validityDays } = req.body;
        
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + parseInt(validityDays));

        const job = await Job.create({
            employerId: req.user._id,
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            expiresAt
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getJobs = async (req, res) => {
    try {
        const { keyword, location, jobType } = req.query;
        let query = {
            expiresAt: { $gte: new Date() }
        };
        
        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (jobType) {
            query.jobType = jobType;
        }
        
        const jobs = await Job.find(query).populate('employerId', 'name companyDetails');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.employerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.employerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createJob, getJobs, updateJob, deleteJob };