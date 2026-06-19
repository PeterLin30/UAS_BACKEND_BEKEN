const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
// HANYA UNTUK SEKALI PAKAI
router.post('/register-admin-first', createAdmin);
module.exports = router;