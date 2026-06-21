const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        // Tangkap data baru dari Front-End
        const { title, description, location, salary, category, minEducation, requiresExperience } = req.body;

        const job = await Job.create({
            employerId: req.user._id,
            title,
            description,
            location,
            salary,
            category,             // Simpan kategori
            minEducation,         // Simpan minimal pendidikan
            requiresExperience    // Simpan syarat pengalaman
        });

        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getJobs = async (req, res) => {
    try {
        const { keyword, location, category, minEducation, requiresExperience } = req.query;
        let query = {};

        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (minEducation) {
            query.minEducation = minEducation;
        }
        if (requiresExperience) {
            query.requiresExperience = requiresExperience === 'true';
        }

        const jobs = await Job.find(query).populate('employerId', 'name');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
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