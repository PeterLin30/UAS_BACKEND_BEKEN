const express = require('express');
const router = express.Router();
const { verifyCompany, toggleUserStatus, createCategory, getPlatformStats, getAdminStats, deleteJobByAdmin, addCategory, getCategories } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('admin'));

router.put('/verify-company/:id', verifyCompany);
router.put('/toggle-user/:id', toggleUserStatus);
router.post('/categories', createCategory);
router.get('/stats', getPlatformStats);
router.get('/stats', protect, authorize('admin'), getAdminStats);
router.delete('/job/:id', protect, authorize('admin'), deleteJobByAdmin);
router.post('/categories', protect, authorize('admin'), addCategory);
router.get('/categories', getCategories);

module.exports = router;