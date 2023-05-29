const express = require('express')
const router = express.Router()
const knex = require('../database')
const { reset } = require('nodemon')
const mealRouter = express.Router()

//all
mealRouter.get('/', async (req, res) => {
  try {
    let query = knex('Meal').select('*')
    const maxPrice = req.query.maxPrice
    const title = req.query.title
    const dateAfter = req.query.dateAfter
    const dateBefore = req.query.dateBefore
    const limit = req.query.limit
    const sortKey = req.query.sortKey
    const sortDir = req.query.sortDir

    // Check for max Price
    if (maxPrice) {
      if (!isNaN(parseInt(maxPrice))) {
        query = query.where('price', '<=', maxPrice)
      } else {
        return res
          .status(400)
          .json({ error: 'Invalid maxPrice query parameter, enter a number' })
      }
    }

    // Check for dateAfter
    if (dateAfter) {
      if (!isNaN(Date.parse(dateAfter))) {
        query = query.where('created_date', '>', dateAfter)
      } else {
        return res.status(400).json({
          error: 'Invalid dateAfter query parameter, enter a valid date',
        })
      }
    }

    // Check for dateBefore
    if (dateBefore) {
      if (!isNaN(Date.parse(dateBefore))) {
        query = query.where('created_date', '<', dateBefore)
      } else {
        return res.status(400).json({
          error: 'Invalid dateBefore query parameter, enter a valid date',
        })
      }
    }

    // Check for limit
    if (limit) {
      if (!isNaN(parseInt(limit))) {
        query = query.limit(limit)
      } else {
        return res
          .status(400)
          .json({ error: 'Invalid limit query parameter, enter a number' })
      }
    }

    // sort keys
    const validSortKeys = ['when', 'max_reservations', 'price']
    const validSortDirs = ['asc', 'desc']

    if (sortKey) {
      if (validSortKeys.includes(sortKey)) {
        if (sortDir && validSortDirs.includes(sortDir)) {
          query = query.orderBy(sortKey, sortDir)
        } else {
          query = query.orderBy(sortKey, 'asc')
        }
      } else {
        return res.status(400).json({
          error:
            'Invalid sortKey query parameter, use one of the following: when, max_reservations, price',
        })
      }
    }

    let allMeals = await query

    // Check for title query
    if (title) {
      allMeals = allMeals.filter((meal) =>
        meal.title.toLowerCase().includes(title.toLowerCase())
      )
    }

    if (!allMeals.length) {
      console.log(req.body)
      return res.status(404).send('No meals found')
    }
    res.json(allMeals)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET
mealRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const mealId = await knex('Meal').select('*').where({ id: id })
    if (!mealId.length) {
      response.status(404)
    }
    res.json(mealId)
  } catch (error) {
    res.status(500).send('Error: ' + error)
  }
})

//POST
mealRouter.post('/', async (req, res) => {
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
    const id = parseInt(req.params.id)
    const meal = await knex('Meal').select('*').where({ id: id }).first()

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
    const id = parseInt(req.params.id)
    const updatedMeal = req.body
    await knex('Meal').where({ id: id }).update(updatedMeal)
    res.json({ message: 'Meal updated' })
  } catch (error) {
    res.status(500).send('Error: ' + error)
  }
})

// delete by id
mealRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await knex('Meal').where({ id: id }).del()
    res.status(200).json({ message: 'Meal deleted' })
  } catch (error) {
    res.status(500).send('Error: ' + error)
  }
})

module.exports = router
module.exports = mealRouter
