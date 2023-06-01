import React from 'react'
import ReservationForm from './reservationForm'

const Meal = ({ meal }) => (
  <div>
    <h2>{meal.title}</h2>
    <p>{meal.description}</p>
    <p>Price: ${meal.price}</p>
    <ReservationForm mealId={meal.id} />
  </div>
)

export default Meal
