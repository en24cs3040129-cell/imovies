import React from 'react';

export default function Navbar({ user, onNavigate, onLogout, theme, onToggleTheme, searchQuery, setSearchQuery }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-imovies-dark border-bottom border-secondary px-3 py-2 sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand brand-title" href="#home" onClick={() => onNavigate('home')}>
          <span>i</span>Movies
        </a>

        {/* Global Search Bar */}
        <div className="d-flex mx-auto col-12 col-md-5 my-2 my-lg-0">
          <div className="input-group">
            <span className="input-group-text bg-dark border-secondary text-secondary">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              placeholder="Search movies by title, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="d-flex align-items-center gap-3">
          {/* Theme Switcher */}
          <button className="btn btn-outline-secondary border-0 text-light" onClick={onToggleTheme} title="Toggle Dark/Light">
            <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-fill'}`}></i>
          </button>

          {user ? (
            <>
              {user.role === 'admin' && (
                <button className="btn btn-sm btn-outline-danger" onClick={() => onNavigate('admin')}>
                  Admin Dashboard
                </button>
              )}
              <button className="btn btn-outline-light border-0" onClick={() => onNavigate('profile')} title="My Profile">
                <i className="bi bi-person-circle fs-5"></i>
              </button>
              <button className="btn btn-sm btn-danger" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-crimson btn-sm px-3" onClick={() => onNavigate('login')}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}