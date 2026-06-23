const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.get('/:id', getJobById);

router.post('/', protect, authorize('employer', 'admin'), createJob);
router.put('/:id', protect, authorize('employer', 'admin'), updateJob);
router.delete('/:id', protect, authorize('employer', 'admin'), deleteJob);
router.put('/:id', protect, updateJob);

module.exports = router;