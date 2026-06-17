const express = require('express');
const router = express.Router();
const { applyForJob, getApplicationsByJob, updateApplicationStatus, getMyApplications } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/apply', protect, authorize('seeker'), upload.single('resume'), applyForJob);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getApplicationsByJob);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);
router.get('/my-applications', protect, authorize('seeker'), getMyApplications);

module.exports = router;