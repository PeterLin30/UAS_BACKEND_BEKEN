import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateJob from './pages/CreateJob';
import ApplyJob from './pages/ApplyJob';
import MyApplications from './pages/MyApplications';
import ManageApplicants from './pages/ManageApplicants';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
        <nav style={{ padding: '1rem 2rem', background: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: '#007BFF' }}>Smart Economy</h2>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Beranda</Link>
            
            {userRole === 'admin' && (
                <Link to="/admin" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Dashboard Admin</Link>
            )}

            {userRole === 'employer' && (
                <Link to="/create-job" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Buat Lowongan</Link>
            )}
            
            {userRole === 'seeker' && (
                <Link to="/my-applications" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Lamaran Saya</Link>
            )}

            {!token ? (
                <>
                    <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Login</Link>
                    <Link to="/register" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Daftar</Link>
                </>
            ) : (
                <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
            )}
          </div>
        </nav>
        
        <div style={{ flex: 1, backgroundColor: '#f9f9f9', margin: 0, padding: 0 }}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/apply/:jobId" element={<ApplyJob />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/manage-applicants/:jobId" element={<ManageApplicants />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;