import React, { useState, useEffect } from 'react'
import './MealsList.css'
import { Link } from 'react-router-dom'
// import axios from 'axios'

const MealsList = () => {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    fetch('/api/meals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.log('Error:', error))
  }, [])

  return (
    <div className="main-div">
      <div>
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  )
}

export default MealsList
