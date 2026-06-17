import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function ManageApplicants() {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await API.get(`/applications/job/${jobId}`);
                setApplicants(response.data);
            } catch (error) {
                alert('Gagal mengambil data pelamar. Pastikan Anda login sebagai Perusahaan.');
            }
        };
        fetchApplicants();
    }, [jobId]);

    const handleUpdateStatus = async (applicationId, newStatus) => {
        try {
            await API.put(`/applications/${applicationId}/status`, { status: newStatus });
            setApplicants(applicants.map(app => 
                app._id === applicationId ? { ...app, status: newStatus } : app
            ));
            alert(`Status berhasil diubah menjadi ${newStatus}`);
        } catch (error) {
            alert('Gagal mengubah status pelamar');
        }
    };

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9f9f9', margin: 0 }}>
            <h2>Daftar Kandidat Pelamar</h2>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '900px' }}>
                {applicants.length === 0 ? (
                    <p style={{ color: '#666' }}>Belum ada pelamar untuk lowongan ini.</p>
                ) : (
                    applicants.map((app) => (
                        <div key={app._id} style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{app.applicantId?.name || 'Nama tidak tersedia'}</h3>
                                <p style={{ margin: '0 0 0.2rem 0', color: '#555' }}><strong>Email:</strong> {app.applicantId?.email || '-'}</p>
                                <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>
                                    <strong>Status Saat Ini:</strong> <span style={{ fontWeight: 'bold', color: '#007BFF' }}>{app.status}</span>
                                </p>
                                <a href={`http://localhost:5000/${app.resumeUrl}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', textDecoration: 'none', color: '#28a745', fontWeight: 'bold' }}>
                                    📄 Unduh CV Kandidat
                                </a>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                                <button onClick={() => handleUpdateStatus(app._id, 'Interview')} style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Panggil Interview</button>
                                <button onClick={() => handleUpdateStatus(app._id, 'Accepted')} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Terima (Accepted)</button>
                                <button onClick={() => handleUpdateStatus(app._id, 'Rejected')} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Tolak (Rejected)</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ManageApplicants;