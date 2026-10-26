import React, { useState } from 'react';

export default function ReviewSection({ reviews, onAddReview }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAddReview({ rating: Number(rating), comment });
    setComment('');
  };

  return (
    <div className="card-imovies p-4 mt-4">
      <h4 className="text-light mb-3">Audience Reviews</h4>

      {/* Review Writing Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-2">
          <label className="text-muted small">Your Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`bi bi-star${star <= rating ? '-fill text-warning' : ' text-secondary'} fs-5`}
              role="button"
              onClick={() => setRating(star)}
            ></i>
          ))}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Write a constructive review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn btn-crimson px-4" type="submit">Send</button>
        </div>
      </form>

      {/* Review List */}
      <div className="d-flex flex-column gap-3">
        {reviews.length === 0 ? (
          <p className="text-muted small">No reviews yet. Be the first to review this movie!</p>
        ) : (
          reviews.map((rev, idx) => (
            <div key={idx} className="border-bottom border-secondary pb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-light fw-semibold">{rev.username}</span>
                <span className="text-warning small">
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </span>
              </div>
              <p className="text-light mb-0 small">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}