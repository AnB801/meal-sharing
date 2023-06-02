import React from 'react'
import ReservationForm from './reservationForm'
import Reviews from './Reviews'

function Meal({ meal }) {
  return (
    <div>
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <p>Price: ${meal.price}</p>
      <ReservationForm mealId={meal.id} />
      {/* <Reviews reviews={meal.reviews} /> */}
    </div>
  )
}

export default Meal
