const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Category = require('../models/Category');

const verifyCompany = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || user.role !== 'employer') {
            return res.status(404).json({ message: 'Company not found' });
        }
        user.isVerified = true;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isVerified = !user.isVerified;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPlatformStats = async (req, res) => {
    try {
        const totalSeekers = await User.countDocuments({ role: 'seeker' });
        const totalEmployers = await User.countDocuments({ role: 'employer' });
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();

        res.json({
            seekers: totalSeekers,
            employers: totalEmployers,
            jobs: totalJobs,
            applications: totalApplications
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAdminStats = async (req, res) => {
    try {
        const totalSeekers = await User.countDocuments({ role: 'seeker' });
        const totalEmployers = await User.countDocuments({ role: 'employer' });
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        res.json({ seekers: totalSeekers, employers: totalEmployers, jobs: totalJobs, applications: totalApplications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteJobByAdmin = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lowongan berhasil dimoderasi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categoryExists = await Category.findOne({ name });
        
        if (categoryExists) {
            return res.status(400).json({ message: 'Kategori sudah ada' });
        }
        
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data pengguna' });
    }
};

module.exports = { verifyCompany, toggleUserStatus, createCategory, getPlatformStats ,getAdminStats, deleteJobByAdmin, addCategory, getCategories, getAllUsers};