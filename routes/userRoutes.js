const express = require('express');
const router = express.Router();
const { updateProfile, getAllSeekers, getUserProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.put('/profile', protect, updateProfile);
router.get('/seekers', protect, authorize('employer', 'admin'), getAllSeekers);
router.get('/:id', protect, getUserProfile);

module.exports = router;