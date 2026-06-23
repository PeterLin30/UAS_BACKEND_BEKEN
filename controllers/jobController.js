const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        const { title, description, location, salary, category, minEducation, requiresExperience } = req.body;

        if (!category) {
            return res.status(400).json({ message: 'Kategori mutlak harus diisi!' });
        }

        const job = await Job.create({
            employerId: req.user._id,
            title,
            description,
            location,
            salary: salary ? Number(salary) : 0,
            category,
            minEducation,
            requiresExperience
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

        const jobs = await Job.find(query).populate('employerId', 'name profileDetails');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employerId', 'name profileDetails');
        if (!job) {
            return res.status(404).json({ message: 'Lowongan tidak ditemukan' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: 'Lowongan tidak ditemukan' });
        }
        
        if (job.employerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Akses ditolak. Anda hanya boleh mengedit lowongan milik perusahaan Anda sendiri.' });
        }
        
        job.title = req.body.title || job.title;
        job.description = req.body.description || job.description;
        job.location = req.body.location || job.location;
        job.salary = req.body.salary !== undefined ? Number(req.body.salary) : job.salary;
        job.category = req.body.category || job.category;
        job.minEducation = req.body.minEducation || job.minEducation;
        job.requiresExperience = req.body.requiresExperience !== undefined ? req.body.requiresExperience : job.requiresExperience;
        
        const updatedJob = await job.save();
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: 'Lowongan tidak ditemukan' });
        }
        
        if (job.employerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Akses ditolak. Anda hanya boleh menghapus lowongan milik perusahaan Anda sendiri.' });
        }
        
        await job.deleteOne();
        res.json({ message: 'Lowongan berhasil dihapus secara permanen.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };