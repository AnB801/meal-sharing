const express = require('express')
const router = express.Router()
const knex = require('../database')
const { reset } = require('nodemon')
const mealRouter = express.Router()

//all
mealRouter.get('/', async (req, res) => {
  try {
    const allMeals = await knex('Meal').select('*')
    if (!allMeals.length) {
      response.status(404)
    }
    res.json(allMeals)
  } catch (error) {
    throw error
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
