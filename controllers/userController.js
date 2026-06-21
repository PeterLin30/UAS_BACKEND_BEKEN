const User = require('../models/User');

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Perbarui atribut profil jika ada dalam permintaan
        user.profileDetails = {
            ...user.profileDetails,
            ...req.body
        };

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            profileDetails: updatedUser.profileDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { updateProfile };