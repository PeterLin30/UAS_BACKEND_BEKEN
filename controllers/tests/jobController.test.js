const { createJob } = require('../jobController');
const Job = require('../../models/Job');

jest.mock('../../models/Job');

describe('Pengujian Mutlak: jobController - createJob', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {},
            user: { _id: 'employer_id_absolut_123' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('Skenario 1: Menolak mutlak pembuatan lowongan jika kategori kosong', async () => {
        req.body = {
            title: 'Senior React Developer',
            description: 'Menguasai MERN Stack',
            location: 'Jakarta',
            salary: 15000000,
            minEducation: 'Sarjana (S1)',
            requiresExperience: true
        };

        await createJob(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Kategori mutlak harus diisi!' });
        expect(Job.create).not.toHaveBeenCalled();
    });

    it('Skenario 2: Berhasil mengamankan dan menyimpan lowongan baru', async () => {
        req.body = {
            title: 'Senior React Developer',
            description: 'Menguasai MERN Stack',
            location: 'Jakarta',
            salary: 15000000,
            category: 'Teknologi Informasi',
            minEducation: 'Sarjana (S1)',
            requiresExperience: true
        };

        const mockJobData = { ...req.body, employerId: req.user._id, _id: 'job_id_absolut_999' };
        Job.create.mockResolvedValue(mockJobData);

        await createJob(req, res);

        expect(Job.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockJobData);
    });
});