import React, { useState } from 'react'
import axios from 'axios'

function ReservationForm({ mealId }) {
  const [contact_name, setName] = useState('')
  const [contact_phonenumber, setPhone] = useState('')
  const [number_of_guests, setGuests] = useState('')

  const submitReservation = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/reservations', {
        meal_id: mealId,
        contact_name: contact_name,
        contact_phonenumber: contact_phonenumber,
        number_of_guests: number_of_guests,
      })

      if (response.status === 200) {
        alert('Reservation successfully created!')
      } else {
        alert('There was a problem creating your reservation.')
      }
    } catch (error) {
      console.error(error)
      alert('There was an error creating your reservation.')
    }

    // Clear the form
    setName('')
    setPhone('')
    setGuests('')
  }

  return (
    <form onSubmit={submitReservation}>
      <input
        type="text"
        placeholder="Your Name"
        value={contact_name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Your Phone Number"
        value={contact_phonenumber}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Guests"
        value={number_of_guests}
        onChange={(e) => setGuests(e.target.value)}
      />
      <button type="submit">Make a Reservation</button>
    </form>
  )
}

export default ReservationForm
