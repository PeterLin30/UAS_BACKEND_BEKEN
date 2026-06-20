const express = require('express');
const router = express.Router();

// Baris ini mutlak: Harus ada createAdmin di dalam kurung kurawal
const { registerUser, loginUser, createAdmin } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Rute pendaftaran admin
router.post('/register-admin-first', createAdmin);

module.exports = router;