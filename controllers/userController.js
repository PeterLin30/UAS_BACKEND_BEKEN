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
        
        if (!user) {
            return res.status(404).json({ message: 'Identitas pengguna tidak ditemukan.' });
        }

        user.name = req.body.name || user.name;
        
        const pd = req.body.profileDetails || req.body;

        if (pd.education !== undefined) user.profileDetails.education = pd.education;
        if (pd.hasExperience !== undefined) user.profileDetails.hasExperience = pd.hasExperience;
        if (pd.experienceText !== undefined) user.profileDetails.experienceText = pd.experienceText;
        
        if (pd.companyName !== undefined) user.profileDetails.companyName = pd.companyName;
        if (pd.companyIndustry !== undefined) user.profileDetails.companyIndustry = pd.companyIndustry;
        
        if (pd.companyDescription !== undefined) user.profileDetails.companyDescription = pd.companyDescription;
        else if (pd.description !== undefined) user.profileDetails.companyDescription = pd.description;
        else if (pd.about !== undefined) user.profileDetails.companyDescription = pd.about;

        user.markModified('profileDetails');
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileDetails: user.profileDetails
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui pangkalan data: ' + error.message });
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