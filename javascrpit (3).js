import React, { useState } from 'react';

export default function LoginPage({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister ? { username, email, password, role } : { email, password };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Authentication failed');

      localStorage.setItem('imovies_token', data.token);
      localStorage.setItem('imovies_user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="card-imovies p-4 p-md-5 col-12 col-md-6 col-lg-4">
        <h3 className="brand-title text-center mb-1">
          <span>i</span>Movies
        </h3>
        <h6 className="text-center text-muted mb-4">
          {role === 'admin' ? 'Admin ' : ''}{isRegister ? 'Register' : 'Login'}
        </h6>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <label className="text-muted small">Username</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="text-muted small">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-secondary"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="text-muted small">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control bg-dark text-light border-secondary"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPass"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label className="form-check-label text-muted small" htmlFor="showPass">
              Show Password
            </label>
          </div>

          <button type="submit" className="btn btn-crimson w-100 py-2">
            Submit
          </button>
        </form>

        <div className="text-center mt-3 small">
          <span className="text-muted">
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          </span>
          <a
            href="#toggle"
            className="text-danger fw-semibold text-decoration-none"
            onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); }}
          >
            {isRegister ? 'Login' : 'Register'}
          </a>
        </div>

        <div className="text-center mt-2 small">
          <a
            href="#admin"
            className="text-secondary text-decoration-none"
            onClick={(e) => { e.preventDefault(); setRole(role === 'user' ? 'admin' : 'user'); }}
          >
            Switch to {role === 'user' ? 'Admin Portal' : 'User Portal'}
          </a>
        </div>
      </div>
    </div>
  );
}