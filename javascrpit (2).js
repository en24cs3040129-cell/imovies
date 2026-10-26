import React, { useState } from 'react';
import ReviewSection from '../components/ReviewSection';

export default function MovieDetailsPage({ movie, onSelectShow, onAddReview }) {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="container py-4">
      {/* Hero Banner with Trailer Trigger */}
      <div
        className="card-imovies position-relative p-4 p-md-5 mb-4 d-flex flex-column justify-content-end"
        style={{
          minHeight: '380px',
          backgroundImage: `linear-gradient(180deg, rgba(10,15,29,0.3) 0%, rgba(10,15,29,0.95) 100%), url(${movie.bannerUrl || movie.posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-white display-5 fw-bold">{movie.title}</h1>
        <p className="text-muted small mb-2">Release Date: {movie.releaseDate} | Runtime: {movie.runtime}</p>
        <p className="text-light col-12 col-md-8 mb-4">{movie.description}</p>
        
        <div className="d-flex gap-3">
          <button className="btn btn-crimson px-4" onClick={() => setShowTrailer(true)}>
            <i className="bi bi-play-circle-fill me-2"></i> Watch Trailer
          </button>
        </div>
      </div>

      {/* Trailer Modal Popup */}
      {showTrailer && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title text-light">{movie.title} - Official Trailer</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowTrailer(false)}></button>
              </div>
              <div className="modal-body p-0 ratio ratio-16x9">
                <iframe
                  src={`${movie.trailerUrl}?autoplay=1`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cast & Crew Section */}
      <h4 className="text-light mb-3">Cast & Crew</h4>
      <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
        {movie.cast && movie.cast.map((c, i) => (
          <div key={i} className="col">
            <div className="card-imovies p-3 text-center">
              <img
                src={c.photoUrl || 'https://via.placeholder.com/100'}
                alt={c.name}
                className="rounded-circle mx-auto mb-2"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <h6 className="text-light mb-0">{c.name}</h6>
              <small className="text-muted">{c.role}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Available Shows */}
      <h4 className="text-light mb-3">Available Shows</h4>
      <div className="d-flex gap-3 flex-wrap mb-4">
        {movie.shows && movie.shows.map((show) => (
          <div key={show._id} className="card-imovies p-3 text-center" style={{ minWidth: '180px' }}>
            <h6 className="text-light mb-1">{show.theatre}</h6>
            <span className="badge bg-danger mb-2">{show.showTime}</span>
            <br />
            <button className="btn btn-sm btn-outline-danger w-100" onClick={() => onSelectShow(show)}>
              Book Tickets
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Review Section */}
      <ReviewSection reviews={movie.reviews || []} onAddReview={onAddReview} />
    </div>
  );
}