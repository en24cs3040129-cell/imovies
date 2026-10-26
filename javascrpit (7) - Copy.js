import React, { useState } from 'react';

const TIERS = [
  { name: 'Balcony Seats', rows: ['A', 'B', 'C'], price: 250 },
  { name: 'Middle Class Seats', rows: ['D', 'E', 'F', 'G'], price: 180 },
  { name: 'Lower Class Seats', rows: ['H', 'I', 'J'], price: 100 }
];

export default function SeatMatrix({ show, onConfirmBooking }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSeat = (seatId) => {
    if (show.occupiedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        alert("Maximum 8 seats allowed per booking.");
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Price Calculation Engine
  const calculateTotal = () => {
    return selectedSeats.reduce((sum, seatId) => {
      const rowLetter = seatId.charAt(0);
      const tier = TIERS.find(t => t.rows.includes(rowLetter));
      return sum + (tier ? tier.price : 150);
    }, 0);
  };

  const handlePay = async () => {
    if (selectedSeats.length === 0) return;
    setIsProcessing(true);
    await onConfirmBooking(selectedSeats, calculateTotal());
    setIsProcessing(false);
  };

  return (
    <div className="card-imovies p-4 text-center my-4">
      <h4 className="text-light mb-1">{show.theatre}</h4>
      <p className="text-muted small mb-4">{show.showDate} | {show.showTime}</p>

      {/* Screen Direction Indicator */}
      <div className="w-75 mx-auto mb-4">
        <div className="screen-curve mb-2"></div>
        <small className="text-secondary text-uppercase tracking-wider">Screen This Way</small>
      </div>

      {/* Seats Matrix Generation */}
      {TIERS.map((tier) => (
        <div key={tier.name} className="mb-4">
          <div className="d-flex justify-content-between text-muted small px-3 mb-2 border-bottom border-secondary pb-1">
            <span>{tier.name}</span>
            <span>₹{tier.price} /-</span>
          </div>

          <div className="d-flex flex-column gap-2 align-items-center">
            {tier.rows.map((row) => (
              <div key={row} className="d-flex gap-2 align-items-center">
                <span className="text-secondary small fw-bold" style={{ width: '18px' }}>{row}</span>
                {Array.from({ length: 14 }, (_, i) => {
                  const seatNumber = `${row}${i + 1}`;
                  const isOccupied = show.occupiedSeats.includes(seatNumber);
                  const isSelected = selectedSeats.includes(seatNumber);

                  return (
                    <div
                      key={seatNumber}
                      onClick={() => toggleSeat(seatNumber)}
                      className={`seat-box ${isOccupied ? 'occupied' : isSelected ? 'selected' : 'available'}`}
                      title={seatNumber}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Legend & Checkout Footer */}
      <div className="d-flex justify-content-center gap-4 text-muted small mt-4">
        <div><span className="seat-box available me-1" style={{ width: 14, height: 14 }}></span> Available</div>
        <div><span className="seat-box selected me-1" style={{ width: 14, height: 14 }}></span> Selected</div>
        <div><span className="seat-box occupied me-1" style={{ width: 14, height: 14 }}></span> Booked</div>
      </div>

      <div className="mt-4 pt-3 border-top border-secondary">
        <h5 className="text-light">
          Selected Seats ({selectedSeats.length}): <span className="text-danger">{selectedSeats.join(', ') || 'None'}</span>
        </h5>
        <button
          className="btn btn-crimson btn-lg px-5 mt-2"
          disabled={selectedSeats.length === 0 || isProcessing}
          onClick={handlePay}
        >
          {isProcessing ? 'Confirming...' : `Pay ₹${calculateTotal()} /-`}
        </button>
      </div>
    </div>
  );
}