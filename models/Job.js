const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    
    // ATRIBUT BARU UNTUK LOWONGAN
    category: { type: String, required: true }, // Kategori bidang (cth: 'Akuntansi')
    minEducation: { type: String, default: 'Tidak Ada Syarat Minimal' },
    requiresExperience: { type: Boolean, default: false }, // true: butuh pengalaman, false: fresh graduate bisa melamar
    
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);