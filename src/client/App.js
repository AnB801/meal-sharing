import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TestComponent from './components/TestComponent/TestComponent'
import MealsList from './components/Mealslist'

function App() {
  return (
    <Router>
      <Route exact path="/">
        <p>test</p>
      </Route>
      <Route exact path="/lol">
        <h1>lololo</h1>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
      <Route exact path="/meal-list">
        <div>
          <h1>Meal Sharing</h1>
          <MealsList />
        </div>
      </Route>
    </Router>
  )
}

export default App
