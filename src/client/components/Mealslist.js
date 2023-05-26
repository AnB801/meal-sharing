import { useState } from 'react'
import axios from 'axios'

const MealsList = () => {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    const fetchMeals = async () => {
      const result = await axios('/api/meals')
      setMeals(result.data)
    }

    fetchMeals()
  }, [])

  return (
    <div>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h2>{meal.title}</h2>
          <p>{meal.description}</p>
          <p>Price: ${meal.price}</p>
        </div>
      ))}
    </div>
  )
}

export default MealsList
