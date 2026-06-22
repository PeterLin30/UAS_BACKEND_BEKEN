const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

// === Rute Publik (Bisa diakses Pelamar tanpa perlu login khusus perusahaan) ===
router.get('/', getJobs);
router.get('/:id', getJobById); // Rute penarik detail & profil perusahaan yang sebelumnya hilang

// === Rute Terlindungi (Hanya Perekrut & Admin yang punya akses) ===
router.post('/', protect, authorize('employer', 'admin'), createJob);
router.put('/:id', protect, authorize('employer', 'admin'), updateJob);
router.delete('/:id', protect, authorize('employer', 'admin'), deleteJob);

module.exports = router;