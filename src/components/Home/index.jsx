import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JourneyPicker } from '../JourneyPicker';
import { JourneyDetail } from '../JourneyDetail/journeydetail';
import { SelectedSeat } from '../SelectedSeat/selectedseat';

export const Home = () => {
  const [journey, setJourney] = useState(null);
  const navigate = useNavigate();

  const handleJourneyChange = (journey) => {
    console.log('Vypisuji parametr:', journey);
    setJourney(journey);
  };

  const handleBuy = () => {
    console.log('Funguju');
    navigate('/reservation');

    fetch('https://apps.kodim.cz/daweb/leviexpress/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        seat: journey.autoSeat,
        journeyId: journey.journeyId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const reservationId = data.results.reservationId;
        console.log('Reservation ID:', reservationId);
        navigate(`/reservation/${reservationId}`);
      });
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey && <JourneyDetail journey={journey} />}
      {journey && <SelectedSeat number={journey.autoSeat} />}
      {journey && (
        <div className="controls container">
          <button className="btn btn--big" type="button" onClick={handleBuy}>
            Rezervovat
          </button>
        </div>
      )}
    </main>
  );
};
