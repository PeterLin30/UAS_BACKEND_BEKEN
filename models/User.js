const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['seeker', 'employer', 'admin'], 
        default: 'seeker' 
    },
    // FONDASI FITUR PROFIL BARU
    profileDetails: {
        // Untuk Pelamar (Seeker)
        education: { type: String, default: '' }, // Contoh: 'S1 Teknik Informatika'
        hasExperience: { type: Boolean, default: false }, // true jika punya pengalaman
        experienceText: { type: String, default: '' }, // Detail pengalamannya
        
        // Untuk Perekrut (Employer)
        companyName: { type: String, default: '' },
        companyIndustry: { type: String, default: '' }, // Contoh: 'Perbankan & Layanan Finansial'
        companyDescription: { type: String, default: '' }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);