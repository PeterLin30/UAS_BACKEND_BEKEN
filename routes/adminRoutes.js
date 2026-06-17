const express = require('express');
const router = express.Router();
const { verifyCompany, toggleUserStatus, createCategory, getPlatformStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('admin'));

router.put('/verify-company/:id', verifyCompany);
router.put('/toggle-user/:id', toggleUserStatus);
router.post('/categories', createCategory);
router.get('/stats', getPlatformStats);

module.exports = router;