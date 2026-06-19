const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // 1. Memeriksa keberadaan header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // 2. Verifikasi Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'KunciRahasiaPeterLin2026');

            // 3. Mengambil user dari database tanpa password
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User tidak ditemukan' });
            }

            next();
        } catch (error) {
            console.error('Auth Error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token gagal' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, tidak ada token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        // 4. Memastikan req.user sudah di-set oleh middleware 'protect'
        if (!req.user) {
            return res.status(401).json({ message: 'Sesi tidak valid' });
        }

        // 5. Cek apakah role user ada dalam daftar roles yang diizinkan
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role ${req.user.role} tidak memiliki akses` });
        }
        next();
    };
};

module.exports = { protect, authorize };