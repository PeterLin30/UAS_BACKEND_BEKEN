import { useState, useEffect } from 'react';
import API from '../services/api';

function MyApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchMyApplications = async () => {
            try {
                const response = await API.get('/applications/my-applications');
                setApplications(response.data);
            } catch (error) {
                alert('Gagal mengambil data riwayat lamaran. Pastikan Anda login sebagai Pencari Kerja.');
            }
        };
        fetchMyApplications();
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Accepted': return { bg: '#28a745', text: 'white' };
            case 'Rejected': return { bg: '#dc3545', text: 'white' };
            case 'Interview': return { bg: '#17a2b8', text: 'white' };
            default: return { bg: '#ffc107', text: 'black' };
        }
    };

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9f9f9', margin: 0 }}>
            <h2>Riwayat Lamaran Saya</h2>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
                {applications.length === 0 ? (
                    <p style={{ color: '#666' }}>Belum ada pekerjaan yang dilamar.</p>
                ) : (
                    applications.map((app) => (
                        <div key={app._id} style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{app.jobId?.title || 'Posisi tidak tersedia'}</h3>
                                <p style={{ margin: '0 0 0.2rem 0', color: '#555' }}><strong>Lokasi:</strong> {app.jobId?.location || '-'}</p>
                                <p style={{ margin: '0', color: '#555' }}><strong>Gaji:</strong> Rp {app.jobId?.salary?.toLocaleString('id-ID') || '-'}</p>
                            </div>
                            <div style={{ padding: '0.5rem 1rem', borderRadius: '20px', backgroundColor: getStatusColor(app.status).bg, color: getStatusColor(app.status).text, fontWeight: 'bold', fontSize: '0.9rem' }}>
                                Status: {app.status}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyApplications;