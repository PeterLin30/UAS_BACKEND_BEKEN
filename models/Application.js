const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String, required: true },
    status: { type: String, enum: ['Review', 'Interview', 'Accepted', 'Rejected'], default: 'Review' }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);