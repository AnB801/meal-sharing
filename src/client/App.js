import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TestComponent from './components/TestComponent/TestComponent'
import MealsList from './components/Mealslist'

function App() {
  return (
    <div>
      <h1>Meal Sharing App</h1>
      <MealsList />
    </div>
  )
}

export default App
