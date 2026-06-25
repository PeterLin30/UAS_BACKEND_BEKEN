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
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    profileDetails: {
        phoneNumber: { type: String, default: '' },
        education: { type: String, default: '' },
        hasExperience: { type: Boolean, default: false },
        experienceText: { type: String, default: '' },
        companyName: { type: String, default: '' },
        companyIndustry: { type: String, default: '' },
        companyDescription: { type: String, default: '' }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);