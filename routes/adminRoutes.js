const express = require('express');
const router = express.Router();

const { 
    verifyCompany, 
    toggleUserStatus, 
    getAdminStats, 
    deleteJobByAdmin, 
    addCategory, 
    getCategories,
    getAllUsers 
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/authMiddleware');

router.put('/verify-company/:id', protect, authorize('admin'), verifyCompany);
router.put('/toggle-user/:id', protect, authorize('admin'), toggleUserStatus);
router.get('/stats', protect, authorize('admin'), getAdminStats);
router.post('/categories', protect, authorize('admin'), addCategory);
router.delete('/job/:id', protect, authorize('admin'), deleteJobByAdmin);
router.get('/categories', getCategories);

router.get('/users', protect, authorize('admin'), getAllUsers);

module.exports = router;