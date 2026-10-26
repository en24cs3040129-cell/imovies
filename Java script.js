import React, { useState, useEffect } from 'react';

export default function ProfilePage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'edit'
  const [bookings, setBookings] = useState([]);
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('imovies_token');
    try {
      const res = await fetch('http://localhost:5000/api/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const token = localStorage.getItem('imovies_token');
    try {
      const res = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.message || 'Update failed');
      }
    } catch (err) {
      setMessage('Network error updating profile');
    }
  };

  return (
    <div className="container py-4">
      {/* Top Profile Action Bar */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className={`btn ${activeTab === 'bookings' ? 'btn-crimson' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('bookings')}
        >
          My Bookings
        </button>
        <button
          className={`btn ${activeTab === 'edit' ? 'btn-crimson' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Profile
        </button>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Bookings View */}
      {activeTab === 'bookings' && (
        <div>
          <h4 className="text-light mb-3">Your Bookings</h4>
          {bookings.length === 0 ? (
            <p className="text-muted">No ticket reservations found.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {bookings.map((b) => (
                <div key={b._id} className="col">
                  <div className="card-imovies p-3">
                    <h5 className="text-white mb-1">{b.movieTitle}</h5>
                    <p className="text-muted small mb-1">{b.theatre}</p>
                    <div className="d-flex justify-content-between text-secondary small mb-2">
                      <span>Date: {b.showDate}</span>
                      <span>Time: {b.showTime}</span>
                    </div>
                    <div className="border-top border-secondary pt-2 d-flex justify-content-between align-items-center">
                      <span className="text-light">Seats: <b>{b.seats.join(', ')}</b></span>
                      <span className="text-danger fw-bold">₹{b.totalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Profile Form */}
      {activeTab === 'edit' && (
        <div className="card-imovies p-4 col-12 col-md-6 mx-auto">
          <h4 className="text-light text-center mb-3">Edit Profile</h4>
          {message && <div className="alert alert-info py-2 small">{message}</div>}

          <form onSubmit={handleUpdateProfile}>
            <div className="mb-3">
              <label className="text-muted small">Username</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="text-muted small">Email Address</label>
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="text-muted small">New Password (leave blank to keep current)</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="text-muted small">Confirm New Password</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-crimson w-100 py-2">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}