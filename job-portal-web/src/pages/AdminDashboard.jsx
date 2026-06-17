import { useState, useEffect } from 'react';
import API from '../services/api';

function AdminDashboard() {
    const [stats, setStats] = useState({
        seekers: 0,
        employers: 0,
        jobs: 0,
        applications: 0
    });
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get('/admin/stats');
                setStats(response.data);
            } catch (error) {
                alert('Gagal mengambil statistik platform.');
            }
        };
        fetchStats();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await API.post('/admin/categories', { name: categoryName });
            alert('Kategori berhasil ditambahkan ke Master Data!');
            setCategoryName('');
        } catch (error) {
            alert('Gagal menambahkan kategori.');
        }
    };

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9f9f9', margin: 0 }}>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>Dashboard Super Admin</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ backgroundColor: '#007bff', color: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3>Total Pencari Kerja</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{stats.seekers}</p>
                </div>
                <div style={{ backgroundColor: '#28a745', color: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3>Total Perusahaan</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{stats.employers}</p>
                </div>
                <div style={{ backgroundColor: '#ffc107', color: 'black', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3>Total Lowongan</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{stats.jobs}</p>
                </div>
                <div style={{ backgroundColor: '#17a2b8', color: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3>Total Lamaran</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{stats.applications}</p>
                </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '500px' }}>
                <h3 style={{ marginTop: 0 }}>Tambah Kategori Master</h3>
                <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <input 
                        type="text" 
                        placeholder="Nama Kategori (Misal: IT, Finance)" 
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)} 
                        required 
                        style={{ flex: 1, padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc' }} 
                    />
                    <button type="submit" style={{ backgroundColor: '#343a40', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminDashboard;