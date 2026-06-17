import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function CreateJob() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: 'full-time'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requirementsArray = formData.requirements.split(',').map(item => item.trim());
            const payload = { ...formData, requirements: requirementsArray };
            
            await API.post('/jobs', payload);
            alert('Lowongan berhasil dibuat!');
            navigate('/');
        } catch (error) {
            alert('Gagal membuat lowongan, pastikan Anda login sebagai Perusahaan.');
        }
    };

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9f9f9', margin: 0 }}>
            <h2>Buat Lowongan Baru</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '600px' }}>
                <input type="text" name="title" placeholder="Posisi Pekerjaan (Misal: Full Stack Developer)" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }} />
                <textarea name="description" placeholder="Deskripsi Pekerjaan" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc', minHeight: '120px' }} />
                <input type="text" name="requirements" placeholder="Persyaratan (Pisahkan dengan koma)" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input type="number" name="salary" placeholder="Gaji (Hanya Angka)" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input type="text" name="location" placeholder="Lokasi (Misal: Jakarta)" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }} />
                <select name="jobType" onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="remote">Remote</option>
                </select>
                <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Simpan Lowongan
                </button>
            </form>
        </div>
    );
}

export default CreateJob;