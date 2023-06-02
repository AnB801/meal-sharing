const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const mealsRouter = require('./api/meals')
const reservationRouter = require('./api/reservations')

const buildPath = path.join(__dirname, '../../dist')
const port = process.env.PORT || 3000
const cors = require('cors')

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))
// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.use(cors())

//localhost:5000/api/meals
router.use('/meals', mealsRouter)
router.use('/Reservations', reservationRouter)
// router.use('/Reviews', reviewsRouter)

//--Homework week1--

// like Ahmed say ))
const knex = require('./database')

app.get('/all-meals', async (req, res) => {
  try {
    const allMeals = await knex('Meal').orderBy('id', 'desc')
    res.json(allMeals)
  } catch (error) {
    throw error
  }
})

app.get('/future-meals', async (req, res) => {
  try {
    const futureMeals = await knex('Meal').where(
      'created_date',
      '>',
      '2023-02-02'
    )
    res.json(futureMeals)
  } catch (error) {
    throw error
  }
})

app.get('/past-meals', async (req, res) => {
  try {
    const futureMeals = await knex('Meal').where(
      'created_date',
      '<',
      '2023-02-02'
    )
    res.json(futureMeals)
  } catch (error) {
    throw error
  }
})

app.get('/first-meal', async (req, res) => {
  try {
    const firstMeal = await knex('Meal').orderBy('id').first()
    if (!firstMeal) {
      res.status(404)
    } else {
      res.json(firstMeal)
    }
  } catch (error) {
    throw error
  }
})

app.get('/last-meal', async (req, res) => {
  try {
    const lastMeal = await knex('Meal').orderBy('id', 'desc').first()
    if (!lastMeal) {
      res.status(404)
    } else {
      res.json(lastMeal)
    }
  } catch (error) {
    throw error
  }
})

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router)
} else {
  throw 'API_PATH is not set. Remember to set it in your .env file'
}

// for the frontend. Will first be covered in the react class
app.use('*', (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`))
})

module.exports = app
