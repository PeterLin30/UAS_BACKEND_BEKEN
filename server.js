const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Sesuaikan dengan port React Anda
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server berjalan di port ${PORT}`);
    });
}

// Pastikan ini ada di server.js
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
      console.error("❌ MONGODB CONNECTION ERROR:", err); // Ini akan memberitahu kenapa dia mati!
      process.exit(1); 
  });

app.get('/', (req, res) => {
    res.status(200).json({ message: "API Smart Economy Berjalan Sempurna di Vercel! 🚀" });
});

  module.exports = app;