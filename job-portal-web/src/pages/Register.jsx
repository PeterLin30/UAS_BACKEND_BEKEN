import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'seeker'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert('Registrasi berhasil! Silakan login.');
            navigate('/login');
        } catch (error) {
            alert('Gagal registrasi: ' + error.response.data.message);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Registrasi Akun</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                <input type="text" name="name" placeholder="Nama Lengkap" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <select name="role" onChange={handleChange}>
                    <option value="seeker">Pencari Kerja</option>
                    <option value="employer">Perusahaan (HRD)</option>
                </select>
                <button type="submit">Daftar</button>
            </form>
        </div>
    );
}

export default Register;