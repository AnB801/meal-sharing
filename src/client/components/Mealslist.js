import React, { useState, useEffect } from 'react'
import './MealsList.css'
import { Link } from 'react-router-dom'
// import axios from 'axios'

const MealsList = () => {
  const [meals, setMeals] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [searchPrice, setSearchPrice] = useState('')

  useEffect(() => {
    fetch('/api/meals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.log('Error:', error))
  }, [])

  const filteredMeals = meals.filter(
    (meal) =>
      meal.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      (searchPrice === '' || meal.price <= searchPrice)
  )

  return (
    <div className="main-div">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Search by price..."
        value={searchPrice}
        onChange={(e) => setSearchPrice(e.target.value)}
      />
      {filteredMeals.map((meal) => (
        <div className="meals" key={meal.id}>
          <h2>{meal.title}</h2>
          <p>{meal.description}</p>
          <p>{meal.price}</p>
        </div>
      ))}
    </div>
  )
}

export default MealsList
