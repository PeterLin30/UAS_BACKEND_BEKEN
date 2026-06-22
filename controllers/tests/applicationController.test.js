const { applyForJob } = require('../applicationController');
const Application = require('../../models/Application');
const Job = require('../../models/Job');

jest.mock('../../models/Application');
jest.mock('../../models/Job');

describe('Pengujian Mutlak: applicationController - applyForJob', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: { jobId: 'job_absolut_1', resume: 'base64_string_cv', coverLetter: 'Surat Pengantar' },
            user: { _id: 'seeker_absolut_1' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('Skenario 1: Menolak otomatis jika dokumen CV tidak dilampirkan', async () => {
        req.body.resume = '';
        
        await applyForJob(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(Application.create).not.toHaveBeenCalled();
    });

    it('Skenario 2: Menolak transmisi ganda dari pelamar di posisi yang sama', async () => {
        Job.findById.mockResolvedValue({ _id: 'job_absolut_1' });
        Application.findOne.mockResolvedValue({ _id: 'existing_app_1' });

        await applyForJob(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Anda sudah melamar pekerjaan ini sebelumnya.' });
        expect(Application.create).not.toHaveBeenCalled();
    });

    it('Skenario 3: Berhasil menyimpan transmisi lamaran baru secara presisi', async () => {
        Job.findById.mockResolvedValue({ _id: 'job_absolut_1' });
        Application.findOne.mockResolvedValue(null);
        
        const mockApplication = { 
            jobId: req.body.jobId, 
            applicantId: req.user._id, 
            resumeUrl: req.body.resume,
            coverLetter: req.body.coverLetter,
            status: 'Review' 
        };
        Application.create.mockResolvedValue(mockApplication);

        await applyForJob(req, res);

        expect(Application.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
    });
});