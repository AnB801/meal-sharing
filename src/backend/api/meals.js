const express = require('express')
const router = express.Router()
const knex = require('../database')

//all
router.get('/', async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex('Meals').select('title')
    response.json(titles)
  } catch (error) {
    throw error
  }
})

// GET
router.get('/api/meal', async (req, res) => {
  try {
    const newMeals = await knex('Meal').select('*')
    res.json(newMeals)
  } catch (error) {
    res.status(500).send('Error: ' + error)
  }
})

//POST
router.post('/api/meals', async (req, res) => {
  try {
    const newMeal = req.body
    await knex('Meal').insert(newMeal)
    res.status(201).json({ message: 'Meal added' })
  } catch (error) {
    res.status(500).send('Error: ' + error)
  }
})

// GET by id
router.get('/api/meals/:id', async (req, res) => {
  try {
    const mealId = parseInt(req.params.id)
    const meal = await knex('Meal').select('*').where({ id: mealId }).first()

    if (meal) {
      res.json(meal)
    } else {
      res.status(404).send('Meal not found')
    }
  } catch (error) {
    res.status(500).send('Error: ' + error)
  }
})

// update by id
router.put('/:id', async (req, res) => {
  try {
    const mealId = parseInt(req.params.id)
    const updatedMeal = req.body
    await knex('Meal').where({ id: mealId }).update(updatedMeal)
    res.json({ message: 'Meal updated' })
  } catch (error) {
    res.status(500).send('Error: ' + error)
  }
})

// delete by id
router.delete('/:id', async (req, res) => {
  try {
    const mealId = parseInt(req.params.id)
    await knex('Meal').where({ id: mealId }).del()
    res.json({ message: 'Meal deleted' })
  } catch (error) {
    res.status(500).send('Error: ' + error)
  }
})

router.get('/api/meals', async (req, res) => {
  let meals = knex('meals').select('*')

  if (req.query.maxPrice) {
    meals.where('price', '<', req.query.maxPrice)
  }

  if (req.query.title) {
    meals.where('title', 'like', `${req.query.title}`)
  }

  if (req.query.dateAfter) {
    meals.where('when', '>', req.query.dateAfter)
  }

  if (req.query.dateBefore) {
    meals.where('when', '<', req.query.dateBefore)
  }

  if (req.query.limit) {
    meals.limit(req.query.limit)
  }

  if (req.query.sortKey) {
    meals.orderBy(req.query.sortKey, req.query.sortDir || 'asc')
  }

  if (req.query.availableReservations) {
    meals = meals
      .leftJoin('reservations', 'meals.id', 'reservations.meal_id')
      .select('meals.*')
      .count({ reservations: 'reservations.id' })
      .groupBy('meals.id')
      .having(
        knex.raw(
          'max_reservations > coalesce(sum(reservations.number_of_guests), 0)'
        ),
        '=',
        req.query.availableReservations === 'true'
      )
  }

  meals = await meals

  res.json(meals)
})

module.exports = router
