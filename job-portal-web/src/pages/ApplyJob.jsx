import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function ApplyJob() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Pilih file CV terlebih dahulu!');
            return;
        }

        const formData = new FormData();
        formData.append('jobId', jobId);
        formData.append('resume', file);

        try {
            await API.post('/applications/apply', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Berhasil melamar pekerjaan!');
            navigate('/');
        } catch (error) {
            alert('Gagal melamar. Pastikan Anda login sebagai Pencari Kerja.');
        }
    };

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9f9f9', margin: 0 }}>
            <h2>Kirim Lamaran (Upload CV)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '400px' }}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white' }} />
                <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Kirim CV
                </button>
            </form>
        </div>
    );
}

export default ApplyJob;