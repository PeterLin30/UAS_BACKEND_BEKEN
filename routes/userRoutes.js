const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile, getAllSeekers, getUserProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/profile', protect, getMyProfile);
router.put('/profile', protect, updateProfile);

router.get('/seekers', protect, authorize('employer', 'admin'), getAllSeekers);
router.get('/:id', protect, getUserProfile);

module.exports = router;