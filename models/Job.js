const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String],
    salary: { type: Number },
    location: { type: String },
    jobType: { type: String, enum: ['remote', 'full-time', 'part-time'] },
    status: { type: String, enum: ['active', 'closed'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);