import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            alert('Login berhasil!');
            navigate('/');
        } catch (error) {
            alert('Gagal login: ' + error.response.data.message);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Masuk</button>
            </form>
        </div>
    );
}

export default Login;