import React from 'react';
import './style.css';
import { Seat } from '../Seat/seat';

export const SeatRow = ({ row }) => {
  return (
    <div className="seat-row">
      {row.map((seat) => (
        <Seat
          key={seat.number}
          number={seat.number}
          isOccupied={seat.isOccupied}
        />
      ))}
    </div>
  );
};
