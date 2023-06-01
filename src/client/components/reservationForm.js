import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = ({ mealId }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('');

  const submitReservation = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/reservations', {
        meal_id: mealId,
        name,
        phone,
        number_of_guests: guests,
      });

      if (response.status === 200) {
        alert('Reservation successfully created!');
      } else {
        alert('There was a problem creating your reservation.');
      }
    } catch (error) {
      console.error(error);
      alert('There was an error creating your reservation.');
    }

    // Clear the form
    setName('');
    setPhone('');
    setGuests('');
  };

  return (
    <form onSubmit={submitReservation}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Your Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />
      <button type="submit">Make a Reservation</button>
    </form>
  );
};

export default ReservationForm;
