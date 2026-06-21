const User = require('../models/User');

const toggleBookmark = async (req, res) => {
    try {
        const { jobId } = req.body;
        const user = await User.findById(req.user._id);
        const index = user.bookmarks.indexOf(jobId);

        if (index === -1) {
            user.bookmarks.push(jobId);
        } else {
            user.bookmarks.splice(index, 1);
        }

        await user.save();
        res.json({ bookmarks: user.bookmarks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'bookmarks',
            populate: { path: 'employerId', select: 'name' }
        });
        res.json(user.bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { toggleBookmark, getBookmarks };