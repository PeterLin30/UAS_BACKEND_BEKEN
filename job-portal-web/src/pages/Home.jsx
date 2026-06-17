import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Home() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await API.get('/jobs');
                setJobs(response.data);
            } catch (error) {
                alert('Gagal mengambil data lowongan');
            }
        };
        fetchJobs();
    }, []);

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9f9f9', margin: 0 }}>
            <h2>Lowongan Pekerjaan Terbaru</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                {jobs.map((job) => (
                    <div key={job._id} style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{job.title}</h3>
                        <p style={{ margin: '0 0 0.2rem 0', color: '#666' }}><strong>Perusahaan:</strong> {job.employerId?.name || 'Tidak diketahui'}</p>
                        <p style={{ margin: '0 0 0.2rem 0', color: '#666' }}><strong>Lokasi:</strong> {job.location}</p>
                        <p style={{ margin: '0 0 0.2rem 0', color: '#666' }}><strong>Gaji:</strong> Rp {job.salary?.toLocaleString('id-ID')}</p>
                        <p style={{ margin: '0 0 1rem 0', color: '#666' }}><strong>Tipe:</strong> {job.jobType}</p>
                        
                        {userRole === 'employer' ? (
                            <button onClick={() => navigate(`/manage-applicants/${job._id}`)} style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
                                Lihat Pelamar
                            </button>
                        ) : (
                            <button onClick={() => navigate(`/apply/${job._id}`)} style={{ backgroundColor: '#007BFF', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
                                Lamar Pekerjaan
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;