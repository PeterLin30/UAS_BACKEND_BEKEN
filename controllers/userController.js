const User = require('../models/User');

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });

        if (req.body.name) user.name = req.body.name;
        
        user.profileDetails.education = req.body.education ?? user.profileDetails.education;
        user.profileDetails.hasExperience = req.body.hasExperience ?? user.profileDetails.hasExperience;
        user.profileDetails.experienceText = req.body.experienceText ?? user.profileDetails.experienceText;
        user.profileDetails.companyName = req.body.companyName ?? user.profileDetails.companyName;
        user.profileDetails.companyIndustry = req.body.companyIndustry ?? user.profileDetails.companyIndustry;
        user.profileDetails.companyDescription = req.body.companyDescription ?? user.profileDetails.companyDescription;

        const updatedUser = await user.save();
        res.json({ _id: updatedUser._id, name: updatedUser.name, profileDetails: updatedUser.profileDetails });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAllSeekers = async (req, res) => {
    try {
        const seekers = await User.find({ role: 'seeker' }).select('-password');
        res.json(seekers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMyProfile, updateProfile, getAllSeekers, getUserProfile };