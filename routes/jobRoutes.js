const express = require('express');
const router = express.Router();
const { createJob, getJobs, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, authorize('employer', 'admin'), createJob);
router.route('/:id').put(protect, authorize('employer', 'admin'), updateJob).delete(protect, authorize('employer', 'admin'), deleteJob);
router.post('/', protect, authorize('employer'), createJob);
module.exports = router;