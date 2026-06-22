const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications, getJobApplicants, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

// === Rute Khusus Pencari Kerja (Seeker) ===
// Rute POST inilah yang sebelumnya hilang (menyebabkan 404 Not Found)
router.post('/', protect, authorize('seeker'), applyForJob);
router.get('/my-applications', protect, authorize('seeker'), getMyApplications);

// === Rute Khusus Perusahaan (Employer) & Admin ===
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplicants);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);

module.exports = router;